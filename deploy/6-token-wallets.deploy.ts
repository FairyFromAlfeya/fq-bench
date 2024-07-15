import { Presets, SingleBar } from 'cli-progress';
import {
  bufferCount,
  concatMap,
  finalize,
  lastValueFrom,
  map,
  mergeMap,
  range,
  tap,
} from 'rxjs';

import {
  BatchExecutorAbi,
  CustomTokenRootAbi,
  DexRootAbi,
} from '../build/factorySource';

import {
  BATCH_EXECUTOR_DEPLOYMENT_TAG,
  DEPLOY_TOKEN_WALLETS_BATCH_RETRY_DELAY,
  DEPLOY_TOKEN_WALLETS_BATCH_TIMEOUT,
  DEX_ROOT_DEPLOYMENT_TAG,
  EVER_WALLETS_COUNT,
  HELPER_WALLET_EXTRA_VALUE,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  TEST_TOKENS_COUNT,
  TOKEN_NAME_SUFFIX,
  TOKEN_ROOT_DEPLOYMENT_TAG,
  TOKEN_WALLET_DEPLOY_BATCH_CONCURRENCY,
  TOKEN_WALLETS_DEPLOY_BATCH_VALUE,
  TOKEN_WALLET_DEPLOY_VALUE,
  TOKEN_WALLETS_DEPLOY_BATCH_SIZE,
  TOKEN_WALLETS_DEPLOY_PROGRESS_BAR_FORMAT,
  USER_EVER_WALLET_DEPLOYMENT_TAG,
  USER_SIGNER_ID,
} from '../utils/constants.utils';
import { retryIfTimeout } from '../utils/operators.utils';
import { deployHelpers, deployTokenWalletBatch } from '../utils/batch.utils';
import { getTokenVault } from '../utils/locklift.utils';

export default async (): Promise<void> => {
  const owner = locklift.deployments.getAccount(
    OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  ).account.address;
  const executor = locklift.deployments.getContract<BatchExecutorAbi>(
    BATCH_EXECUTOR_DEPLOYMENT_TAG,
  );
  const root = locklift.deployments.getContract<DexRootAbi>(
    DEX_ROOT_DEPLOYMENT_TAG,
  );
  const rootState = await root.getFullState().then((s) => s.state!);
  const publicKey = await locklift.keystore
    .getSigner(USER_SIGNER_ID)
    .then((s) => s!.publicKey);

  // Progress

  const progress = new SingleBar(
    { format: TOKEN_WALLETS_DEPLOY_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress.start(TEST_TOKENS_COUNT * (EVER_WALLETS_COUNT + 1), 0);

  // Helpers

  const batchesCount = Math.ceil(
    EVER_WALLETS_COUNT / TOKEN_WALLETS_DEPLOY_BATCH_SIZE,
  );
  const helperValue =
    (TOKEN_WALLET_DEPLOY_VALUE *
      (Math.min(TOKEN_WALLETS_DEPLOY_BATCH_SIZE, EVER_WALLETS_COUNT) + 1) +
      TOKEN_WALLETS_DEPLOY_BATCH_VALUE +
      HELPER_WALLET_EXTRA_VALUE) *
    batchesCount;

  const helpers = await deployHelpers(
    TEST_TOKENS_COUNT,
    helperValue,
    executor,
    publicKey,
    owner,
  );

  // Mint

  const tokens = range(TEST_TOKENS_COUNT).pipe(
    map((index) =>
      locklift.deployments.getContract<CustomTokenRootAbi>(
        `${TOKEN_ROOT_DEPLOYMENT_TAG}${TOKEN_NAME_SUFFIX}${index}`,
      ),
    ),
  );

  const wallets = range(EVER_WALLETS_COUNT).pipe(
    map(
      (i) =>
        locklift.deployments.getAccount(
          `${USER_EVER_WALLET_DEPLOYMENT_TAG}${i}`,
        ).account.address,
    ),
  );

  await lastValueFrom(
    tokens.pipe(
      mergeMap(
        (token, index) =>
          wallets.pipe(
            bufferCount(TOKEN_WALLETS_DEPLOY_BATCH_SIZE),
            concatMap((batch) =>
              retryIfTimeout(
                () =>
                  getTokenVault(root, token.address, rootState).then((vault) =>
                    deployTokenWalletBatch(
                      executor,
                      token.address,
                      [...batch, vault],
                      helpers[index].account.address,
                    ),
                  ),
                DEPLOY_TOKEN_WALLETS_BATCH_TIMEOUT,
                DEPLOY_TOKEN_WALLETS_BATCH_RETRY_DELAY,
              ),
            ),
          ),
        TOKEN_WALLET_DEPLOY_BATCH_CONCURRENCY,
      ),
      tap((event) => progress.increment(+event.data.recipientsCount)),
      finalize(() => progress.stop()),
    ),
    { defaultValue: null },
  );
};

export const tag = 'token-wallets';
export const dependencies = ['dex-pairs'];
