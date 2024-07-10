import { toNano, Contract, Address } from 'locklift';
import { SingleBar, Presets } from 'cli-progress';
import {
  bufferCount,
  concatMap,
  map,
  range,
  tap,
  finalize,
  lastValueFrom,
  from,
  mergeMap,
} from 'rxjs';

import { BatchExecutorAbi } from '../build/factorySource';

import {
  TEST_TOKENS_COUNT,
  TOKEN_DEPLOY_VALUE,
  TOKENS_DEPLOY_BATCH_SIZE,
  TOKENS_DEPLOY_PROGRESS_BAR_FORMAT,
} from '../utils/constants.utils';
import { Token, TokenRootDeployedEvent } from '../utils/locklift.utils';
import { retryIfTimeout } from '../utils/operators.utils';

const deployTokensBatch = async (
  batchIndex: number,
  tokens: Token[],
  executor: Contract<BatchExecutorAbi>,
  owner: Address,
): Promise<TokenRootDeployedEvent[]> => {
  const value = TOKEN_DEPLOY_VALUE * tokens.length + 40;

  const subscriber = new locklift.provider.Subscriber();

  const eventsProm = executor
    .events(subscriber)
    .filter(
      (e) => e.event === 'TokenRootDeployed' && +e.data._iter === batchIndex,
    )
    .take(tokens.length)
    .fold<TokenRootDeployedEvent[]>([], (acc, item) => {
      acc.push(item as TokenRootDeployedEvent);
      return acc;
    })
    .finally(() => subscriber.unsubscribe());

  await executor.methods
    .batchTokenRootDeploy({
      _iter: batchIndex,
      _infos: tokens,
      _offset: 0,
      _remainingGasTo: owner,
    })
    .send({ from: owner, amount: toNano(value), bounce: true });

  return eventsProm;
};

const saveTokenRoot = async (
  event: TokenRootDeployedEvent,
  owner: Address,
): Promise<boolean> => {
  await locklift.deployments.saveContract({
    contractName: 'CustomTokenRoot',
    address: event.data.tokenRoot,
    deploymentName: `TokenRoot-${event.data.symbol}`,
  });

  const wallet = await locklift.factory
    .getDeployedContract('CustomTokenRoot', event.data.tokenRoot)
    .methods.walletOf({ answerId: 0, walletOwner: owner })
    .call()
    .then((res) => res.value0);

  await locklift.deployments.saveContract({
    contractName: 'TokenWalletUpgradeable',
    address: wallet,
    deploymentName: `OwnerTokenWallet-${event.data.symbol}`,
  });

  return true;
};

export default async (): Promise<void> => {
  const owner =
    locklift.deployments.getAccount('OwnerEverWallet').account.address;
  const executor =
    locklift.deployments.getContract<BatchExecutorAbi>('BatchExecutor');

  const progress = new SingleBar(
    { format: TOKENS_DEPLOY_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress.start(TEST_TOKENS_COUNT, 0);

  const tokens = range(TEST_TOKENS_COUNT).pipe(
    map<number, Token>((index) => ({
      name: 'TEST',
      symbol: `TEST-${index}`,
      decimals: 9,
    })),
  );

  await lastValueFrom(
    tokens.pipe(
      bufferCount(TOKENS_DEPLOY_BATCH_SIZE),
      concatMap((batch, index) =>
        retryIfTimeout(
          () => deployTokensBatch(index, batch, executor, owner),
          60_000,
          1_500,
        ),
      ),
      concatMap((batch) => from(batch)),
      mergeMap((event) => saveTokenRoot(event, owner)),
      tap(() => progress.increment()),
      finalize(() => progress.stop()),
    ),
  );
};

export const tag = 'token-roots';
export const dependencies = ['batch-executor'];
