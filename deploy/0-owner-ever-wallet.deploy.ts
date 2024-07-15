import { toNano, WalletTypes } from 'locklift';

import {
  EVER_WALLET_AMOUNT,
  BATCH_EXECUTOR_DEPLOY_VALUE,
  DEX_DEPLOY_VALUE,
  EVER_WALLETS_COUNT,
  EVER_WALLETS_DEPLOY_BATCH_SIZE,
  EVER_WALLETS_DEPLOY_BATCH_VALUE,
  HELPER_WALLET_EXTRA_VALUE,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  OWNER_SIGNER_ID,
  OWNER_WALLET_EXTRA_VALUE,
  PAIR_DEPLOY_VALUE,
  PAIRS_DEPLOY_BATCH_SIZE,
  PAIRS_DEPLOY_BATCH_VALUE,
  TEST_TOKENS_COUNT,
  TOKEN_DEPLOY_VALUE,
  TOKEN_WALLETS_DEPLOY_BATCH_VALUE,
  TOKEN_WALLET_DEPLOY_VALUE,
  TOKEN_WALLETS_DEPLOY_BATCH_SIZE,
  TOKENS_DEPLOY_BATCH_SIZE,
  TOKENS_DEPLOY_BATCH_VALUE,
} from '../utils/constants.utils';

export default async (): Promise<void> => {
  // Wallets
  const everWalletsDeployHelpersCount = Math.ceil(
    EVER_WALLETS_COUNT / EVER_WALLETS_DEPLOY_BATCH_SIZE,
  );
  const everWalletsDeployHelperValue =
    EVER_WALLET_AMOUNT *
      Math.min(EVER_WALLETS_DEPLOY_BATCH_SIZE, EVER_WALLETS_COUNT) +
    EVER_WALLETS_DEPLOY_BATCH_VALUE +
    HELPER_WALLET_EXTRA_VALUE;
  const everWalletsDeployValue =
    EVER_WALLETS_DEPLOY_BATCH_VALUE +
    everWalletsDeployHelperValue * everWalletsDeployHelpersCount;

  // Tokens
  const tokensDeployBatchesCount = Math.ceil(
    TEST_TOKENS_COUNT / TOKENS_DEPLOY_BATCH_SIZE,
  );
  const tokensDeployBatchValue =
    TOKEN_DEPLOY_VALUE * Math.min(TOKENS_DEPLOY_BATCH_SIZE, TEST_TOKENS_COUNT) +
    TOKENS_DEPLOY_BATCH_VALUE;
  const tokensDeployValue = tokensDeployBatchValue * tokensDeployBatchesCount;

  // Pairs
  const pairsDeployHelpersCount = Math.ceil(
    TEST_TOKENS_COUNT / PAIRS_DEPLOY_BATCH_SIZE,
  );
  const pairsDeployHelperValue =
    PAIR_DEPLOY_VALUE * Math.min(PAIRS_DEPLOY_BATCH_SIZE, TEST_TOKENS_COUNT) +
    PAIRS_DEPLOY_BATCH_VALUE +
    HELPER_WALLET_EXTRA_VALUE;
  const pairsDeployValue =
    EVER_WALLETS_DEPLOY_BATCH_VALUE +
    pairsDeployHelperValue * pairsDeployHelpersCount;

  // Token wallets
  const tokenWalletsDeployHelpersCount = TEST_TOKENS_COUNT;
  const tokenWalletsDeployBatchesCount = Math.ceil(
    EVER_WALLETS_COUNT / TOKEN_WALLETS_DEPLOY_BATCH_SIZE,
  );
  const tokenWalletsDeployHelperValue =
    (TOKEN_WALLET_DEPLOY_VALUE *
      (Math.min(TOKEN_WALLETS_DEPLOY_BATCH_SIZE, EVER_WALLETS_COUNT) + 1) +
      TOKEN_WALLETS_DEPLOY_BATCH_VALUE +
      HELPER_WALLET_EXTRA_VALUE) *
    tokenWalletsDeployBatchesCount *
    2;
  const tokenWalletsDeployValue =
    EVER_WALLETS_DEPLOY_BATCH_VALUE +
    tokenWalletsDeployHelperValue * tokenWalletsDeployHelpersCount;

  const value =
    BATCH_EXECUTOR_DEPLOY_VALUE +
    everWalletsDeployValue +
    tokensDeployValue +
    DEX_DEPLOY_VALUE +
    pairsDeployValue +
    tokenWalletsDeployValue +
    OWNER_WALLET_EXTRA_VALUE;

  console.log(`OWNER REQUESTED BALANCE: ${value}\n`);

  await locklift.deployments.deployAccounts(
    [
      {
        deploymentName: OWNER_EVER_WALLET_DEPLOYMENT_TAG,
        signerId: OWNER_SIGNER_ID,
        accountSettings: {
          type: WalletTypes.EverWallet,
          value: toNano(value),
        },
      },
    ],
    true,
  );
};

export const tag = 'owner-ever-wallet';
