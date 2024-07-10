import { Presets, SingleBar } from 'cli-progress';
import { Address, Contract, toNano } from 'locklift';
import {
  bufferCount,
  concat,
  concatMap,
  finalize,
  from,
  lastValueFrom,
  mergeMap,
  of,
  pairwise,
  range,
  reduce,
  tap,
} from 'rxjs';

import { DexRootAbi } from '../build/factorySource';

import {
  PAIR_DEPLOY_VALUE,
  PAIRS_DEPLOY_BATCH_SIZE,
  PAIRS_DEPLOY_PROGRESS_BAR_FORMAT,
  TEST_TOKENS_COUNT,
} from '../utils/constants.utils';
import { retryIfTimeout } from '../utils/operators.utils';
import { PairDeployedEvent } from '../utils/locklift.utils';

export const deployPairsBatch = async (
  batchIndex: number,
  pairs: [number, number][],
  root: Contract<DexRootAbi>,
  owner: Address,
): Promise<PairDeployedEvent[]> => {
  const value = PAIR_DEPLOY_VALUE * pairs.length + 40;

  const tokenAddressToName = await lastValueFrom(
    from(pairs).pipe(
      concatMap((pair) => from(pair)),
      reduce(
        (acc, val) => {
          const address = locklift.deployments.getContract(
            `TokenRoot-TEST-${val}`,
          ).address;
          acc[address.toString()] = `TEST-${val}`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    ),
  );

  const subscriber = new locklift.provider.Subscriber();

  const eventsProm = root
    .events(subscriber)
    .filter((e) => e.event === 'PairDeployed' && +e.data.iter === batchIndex)
    .take(pairs.length)
    .map((event) => {
      const e = event as PairDeployedEvent;

      return {
        ...event,
        leftRootName: tokenAddressToName[e.data.leftRoot.toString()],
        rightRootName: tokenAddressToName[e.data.rightRoot.toString()],
      };
    })
    .fold<PairDeployedEvent[]>([], (acc, item) => {
      acc.push(item as PairDeployedEvent);
      return acc;
    })
    .finally(() => subscriber.unsubscribe());

  await root.methods
    .batchPairDeploy({
      _iter: batchIndex,
      _infos: pairs.map(([a, b]) => ({
        left_root: locklift.deployments.getContract(`TokenRoot-TEST-${a}`)
          .address,
        right_root: locklift.deployments.getContract(`TokenRoot-TEST-${b}`)
          .address,
      })),
      _offset: 0,
      _remainingGasTo: owner,
    })
    .sendDelayed({ from: owner, amount: toNano(value), bounce: true });

  return eventsProm;
};

const savePair = async (event: PairDeployedEvent): Promise<boolean> => {
  await locklift.deployments.saveContract({
    contractName: 'DexPair',
    address: event.data.pair,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    deploymentName: `Pair-${event.leftRootName}-${event.rightRootName}`,
  });

  return true;
};

export default async (): Promise<void> => {
  const owner =
    locklift.deployments.getAccount('OwnerEverWallet').account.address;
  const root = locklift.deployments.getContract<DexRootAbi>('DexRoot');

  const progress = new SingleBar(
    { format: PAIRS_DEPLOY_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress.start(TEST_TOKENS_COUNT, 0);

  const pairs = concat(range(TEST_TOKENS_COUNT), of(0)).pipe(pairwise());

  await lastValueFrom(
    pairs.pipe(
      bufferCount(PAIRS_DEPLOY_BATCH_SIZE),
      concatMap((batch, index) =>
        retryIfTimeout(
          () => deployPairsBatch(index, batch, root, owner),
          60_000,
          1_500,
        ),
      ),
      concatMap((batch) => from(batch)),
      mergeMap((event) => savePair(event)),
      tap(() => progress.increment()),
      finalize(() => progress.stop()),
    ),
  );
};

export const tag = 'dex-pairs';
export const dependencies = ['dex-root'];
