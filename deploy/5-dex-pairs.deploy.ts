import { Presets, SingleBar } from 'cli-progress';
import {
  bufferCount,
  concatMap,
  finalize,
  from,
  lastValueFrom,
  mergeMap,
  tap,
} from 'rxjs';

import { BatchExecutorAbi, DexRootAbi } from '../build/factorySource';

import {
  BATCH_EXECUTOR_DEPLOYMENT_TAG,
  DEPLOY_PAIRS_BATCH_RETRY_DELAY,
  DEPLOY_PAIRS_BATCH_TIMEOUT,
  DEX_ROOT_DEPLOYMENT_TAG,
  HELPER_WALLET_EXTRA_VALUE,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  PAIR_DEPLOY_VALUE,
  PAIRS_DEPLOY_BATCH_CONCURRENCY,
  PAIRS_DEPLOY_BATCH_SIZE,
  PAIRS_DEPLOY_BATCH_VALUE,
  PAIRS_DEPLOY_PROGRESS_BAR_FORMAT,
  TEST_TOKENS_COUNT,
  USER_SIGNER_ID,
} from '../utils/constants.utils';
import { getChainedPairs, retryIfTimeout } from '../utils/operators.utils';
import { savePair } from '../utils/locklift.utils';
import { deployHelpers, deployPairsBatch } from '../utils/batch.utils';

export default async (): Promise<void> => {
  const owner = locklift.deployments.getAccount(
    OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  ).account.address;
  const root = locklift.deployments.getContract<DexRootAbi>(
    DEX_ROOT_DEPLOYMENT_TAG,
  );
  const executor = locklift.deployments.getContract<BatchExecutorAbi>(
    BATCH_EXECUTOR_DEPLOYMENT_TAG,
  );
  const publicKey = await locklift.keystore
    .getSigner(USER_SIGNER_ID)
    .then((s) => s!.publicKey);

  // Progress

  const progress = new SingleBar(
    { format: PAIRS_DEPLOY_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress.start(TEST_TOKENS_COUNT, 0);

  // Helpers

  const helpersCount = Math.ceil(TEST_TOKENS_COUNT / PAIRS_DEPLOY_BATCH_SIZE);
  const helperValue =
    PAIR_DEPLOY_VALUE * Math.min(PAIRS_DEPLOY_BATCH_SIZE, TEST_TOKENS_COUNT) +
    PAIRS_DEPLOY_BATCH_VALUE +
    HELPER_WALLET_EXTRA_VALUE;

  const helpers = await deployHelpers(
    helpersCount,
    helperValue,
    executor,
    publicKey,
    owner,
  );

  // Pairs deploy

  await lastValueFrom(
    getChainedPairs(TEST_TOKENS_COUNT).pipe(
      bufferCount(PAIRS_DEPLOY_BATCH_SIZE),
      mergeMap(
        (batch, index) =>
          retryIfTimeout(
            () =>
              deployPairsBatch(
                index,
                batch,
                executor,
                root,
                helpers[index].account.address,
              ),
            DEPLOY_PAIRS_BATCH_TIMEOUT,
            DEPLOY_PAIRS_BATCH_RETRY_DELAY,
          ),
        PAIRS_DEPLOY_BATCH_CONCURRENCY,
      ),
      concatMap((batch) => from(batch)),
      mergeMap((event) => savePair(event)),
      tap(() => progress.increment()),
      finalize(() => progress.stop()),
    ),
    { defaultValue: null },
  );
};

export const tag = 'dex-pairs';
export const dependencies = ['dex-root'];
