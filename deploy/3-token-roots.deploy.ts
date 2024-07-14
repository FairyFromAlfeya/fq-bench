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
  BATCH_EXECUTOR_DEPLOYMENT_TAG,
  DEPLOY_TOKENS_BATCH_RETRY_DELAY,
  DEPLOY_TOKENS_BATCH_TIMEOUT,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  TEST_TOKENS_COUNT,
  TOKEN_NAME_SUFFIX,
  TOKENS_DEPLOY_BATCH_SIZE,
  TOKENS_DEPLOY_PROGRESS_BAR_FORMAT,
} from '../utils/constants.utils';
import { saveTokenRoot, Token } from '../utils/locklift.utils';
import { retryIfTimeout } from '../utils/operators.utils';
import { deployTokensBatch } from '../utils/batch.utils';

export default async (): Promise<void> => {
  const owner = locklift.deployments.getAccount(
    OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  ).account.address;
  const executor = locklift.deployments.getContract<BatchExecutorAbi>(
    BATCH_EXECUTOR_DEPLOYMENT_TAG,
  );

  const progress = new SingleBar(
    { format: TOKENS_DEPLOY_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress.start(TEST_TOKENS_COUNT, 0);

  const tokens = range(TEST_TOKENS_COUNT).pipe(
    map<number, Token>((index) => ({
      name: 'TEST',
      symbol: `${TOKEN_NAME_SUFFIX}${index}`,
      decimals: 7,
    })),
  );

  await lastValueFrom(
    tokens.pipe(
      bufferCount(TOKENS_DEPLOY_BATCH_SIZE),
      concatMap((batch, index) =>
        retryIfTimeout(
          () => deployTokensBatch(index, batch, executor, owner),
          DEPLOY_TOKENS_BATCH_TIMEOUT,
          DEPLOY_TOKENS_BATCH_RETRY_DELAY,
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
