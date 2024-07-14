import { toNano, WalletTypes } from 'locklift';

import {
  AMOUNT,
  BATCH_EXECUTOR_DEPLOY_VALUE,
  DEX_ROOT_DEPLOY_VALUE,
  EVER_WALLETS_COUNT,
  EVER_WALLETS_DEPLOY_BATCH_SIZE,
  EVER_WALLETS_DEPLOY_BATCH_VALUE,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  OWNER_SIGNER_ID,
  PAIR_DEPLOY_VALUE,
  PAIRS_DEPLOY_BATCH_SIZE,
  PAIRS_DEPLOY_BATCH_VALUE,
  TEST_TOKENS_COUNT,
  TOKEN_DEPLOY_VALUE,
  TOKEN_FACTORY_DEPLOY_VALUE,
  TOKEN_WALLET_DEPLOY_VALUE,
  TOKENS_DEPLOY_BATCH_SIZE,
  TOKENS_DEPLOY_BATCH_VALUE,
} from '../utils/constants.utils';

export default async (): Promise<void> => {
  const everWalletsDeploy =
    EVER_WALLETS_COUNT * +AMOUNT +
    Math.ceil(EVER_WALLETS_COUNT / EVER_WALLETS_DEPLOY_BATCH_SIZE) *
      EVER_WALLETS_DEPLOY_BATCH_VALUE;

  const tokensDeploy =
    TEST_TOKENS_COUNT * TOKEN_DEPLOY_VALUE +
    Math.ceil(TEST_TOKENS_COUNT / TOKENS_DEPLOY_BATCH_SIZE) *
      TOKENS_DEPLOY_BATCH_VALUE;

  const dexRootDeploy = DEX_ROOT_DEPLOY_VALUE + TOKEN_FACTORY_DEPLOY_VALUE;

  const pairsDeploy =
    TEST_TOKENS_COUNT * PAIR_DEPLOY_VALUE +
    Math.ceil(TEST_TOKENS_COUNT / PAIRS_DEPLOY_BATCH_SIZE) *
      PAIRS_DEPLOY_BATCH_VALUE;

  const tokenWalletsDeploy =
    (TOKEN_WALLET_DEPLOY_VALUE * EVER_WALLETS_COUNT + 5000) * TEST_TOKENS_COUNT;

  const value =
    everWalletsDeploy +
    BATCH_EXECUTOR_DEPLOY_VALUE +
    tokensDeploy +
    dexRootDeploy +
    pairsDeploy +
    tokenWalletsDeploy * 2;

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
