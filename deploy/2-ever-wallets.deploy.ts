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
  EVER_WALLET_AMOUNT,
  BATCH_EXECUTOR_DEPLOYMENT_TAG,
  DEPLOY_EVER_WALLETS_BATCH_RETRY_DELAY,
  DEPLOY_EVER_WALLETS_BATCH_TIMEOUT,
  EVER_WALLET_DEPLOY_BATCH_CONCURRENCY,
  EVER_WALLETS_COUNT,
  EVER_WALLETS_DEPLOY_BATCH_SIZE,
  EVER_WALLETS_DEPLOY_BATCH_VALUE,
  EVER_WALLETS_DEPLOY_PROGRESS_BAR_FORMAT,
  HELPER_WALLET_EXTRA_VALUE,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  USER_SIGNER_ID,
} from '../utils/constants.utils';
import { saveEverWallet } from '../utils/locklift.utils';
import { retryIfTimeout } from '../utils/operators.utils';
import { deployEverWalletsBatch, deployHelpers } from '../utils/batch.utils';

export default async (): Promise<void> => {
  const owner = locklift.deployments.getAccount(
    OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  ).account.address;
  const executor = locklift.deployments.getContract<BatchExecutorAbi>(
    BATCH_EXECUTOR_DEPLOYMENT_TAG,
  );
  const publicKey = await locklift.keystore
    .getSigner(USER_SIGNER_ID)
    .then((s) => s!.publicKey);

  // Progress

  const progress = new SingleBar(
    { format: EVER_WALLETS_DEPLOY_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress.start(EVER_WALLETS_COUNT, 0);

  // Helpers

  const helpersCount = Math.ceil(
    EVER_WALLETS_COUNT / EVER_WALLETS_DEPLOY_BATCH_SIZE,
  );
  const helperValue =
    EVER_WALLET_AMOUNT *
      Math.min(EVER_WALLETS_DEPLOY_BATCH_SIZE, EVER_WALLETS_COUNT) +
    EVER_WALLETS_DEPLOY_BATCH_VALUE +
    HELPER_WALLET_EXTRA_VALUE;
  const helpers = await deployHelpers(
    helpersCount,
    helperValue,
    executor,
    publicKey,
    owner,
  );
  progress.increment(helpers.length);

  // Wallets deploy

  const wallets = range(helpersCount, EVER_WALLETS_COUNT - helpersCount);

  await lastValueFrom(
    wallets.pipe(
      bufferCount(EVER_WALLETS_DEPLOY_BATCH_SIZE),
      mergeMap(
        (batch, index) =>
          retryIfTimeout(
            () =>
              deployEverWalletsBatch(
                index,
                batch,
                EVER_WALLET_AMOUNT,
                publicKey,
                executor,
                helpers[index].account.address,
              ),
            DEPLOY_EVER_WALLETS_BATCH_TIMEOUT,
            DEPLOY_EVER_WALLETS_BATCH_RETRY_DELAY,
          ),
        EVER_WALLET_DEPLOY_BATCH_CONCURRENCY,
      ),
      concatMap((batch) => from(batch)),
      mergeMap((event) => saveEverWallet(event)),
      tap(() => progress.increment()),
      finalize(() => progress.stop()),
    ),
    { defaultValue: null },
  );
};

export const tag = 'ever-wallets';
export const dependencies = ['batch-executor'];
