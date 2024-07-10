import { toNano, Contract, Address, WalletTypes } from 'locklift';
import { SingleBar, Presets } from 'cli-progress';
import {
  bufferCount,
  concatMap,
  range,
  tap,
  finalize,
  lastValueFrom,
  from,
  mergeMap,
} from 'rxjs';

import { BatchExecutorAbi } from '../build/factorySource';

import {
  AMOUNT,
  EVER_WALLETS_COUNT,
  EVER_WALLETS_DEPLOY_BATCH_SIZE,
  EVER_WALLETS_DEPLOY_PROGRESS_BAR_FORMAT,
} from '../utils/constants.utils';
import { EverWalletDeployedEvent } from '../utils/locklift.utils';
import { retryIfTimeout } from '../utils/operators.utils';

const deployEverWalletsBatch = async (
  batchIndex: number,
  wallets: number[],
  publicKey: string,
  executor: Contract<BatchExecutorAbi>,
  owner: Address,
): Promise<EverWalletDeployedEvent[]> => {
  const value = +AMOUNT * wallets.length + 40;

  const subscriber = new locklift.provider.Subscriber();

  const eventsProm = executor
    .events(subscriber)
    .filter(
      (e) => e.event === 'EverWalletDeployed' && +e.data.iter === batchIndex,
    )
    .take(wallets.length)
    .fold<EverWalletDeployedEvent[]>([], (acc, item) => {
      acc.push(item as EverWalletDeployedEvent);
      return acc;
    })
    .finally(() => subscriber.unsubscribe());

  await executor.methods
    .batchEverWalletDeploy({
      _iter: batchIndex,
      _publicKey: `0x${publicKey}`,
      _infos: wallets.map((nonce) => ({
        nonce: nonce,
        amount: toNano(AMOUNT),
      })),
      _offset: 0,
      _remainingGasTo: owner,
    })
    .send({ from: owner, amount: toNano(value), bounce: true });

  return eventsProm;
};

const saveEverWallet = async (
  event: EverWalletDeployedEvent,
): Promise<boolean> => {
  await locklift.deployments.saveAccount({
    deploymentName: `EverWallet-${event.data.nonce}`,
    address: event.data.wallet.toString(),
    signerId: '1',
    accountSettings: { type: WalletTypes.EverWallet },
  });

  return true;
};

export default async (): Promise<void> => {
  const owner =
    locklift.deployments.getAccount('OwnerEverWallet').account.address;
  const executor =
    locklift.deployments.getContract<BatchExecutorAbi>('BatchExecutor');

  const progress = new SingleBar(
    { format: EVER_WALLETS_DEPLOY_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress.start(EVER_WALLETS_COUNT, 0);

  const wallets = range(EVER_WALLETS_COUNT);

  const publicKey = await locklift.keystore
    .getSigner('1')
    .then((s) => s!.publicKey);

  await lastValueFrom(
    wallets.pipe(
      bufferCount(EVER_WALLETS_DEPLOY_BATCH_SIZE),
      concatMap((batch, index) =>
        retryIfTimeout(
          () =>
            deployEverWalletsBatch(index, batch, publicKey, executor, owner),
          60_000,
          1_500,
        ),
      ),
      concatMap((batch) => from(batch)),
      mergeMap((event) => saveEverWallet(event)),
      tap(() => progress.increment()),
      finalize(() => progress.stop()),
    ),
  );
};

export const tag = 'ever-wallets';
export const dependencies = ['owner-ever-wallet'];
