import { toNano, WalletTypes } from 'locklift';

import {
  AMOUNT,
  BATCH_EXECUTOR_DEPLOY_VALUE,
  DEX_ROOT_DEPLOY_VALUE,
  EVER_WALLETS_COUNT,
  EVER_WALLETS_DEPLOY_BATCH_SIZE,
  PAIR_DEPLOY_VALUE,
  PAIRS_DEPLOY_BATCH_SIZE,
  TEST_TOKENS_COUNT,
  TOKEN_DEPLOY_VALUE,
  TOKEN_FACTORY_DEPLOY_VALUE,
  TOKENS_DEPLOY_BATCH_SIZE,
} from '../utils/constants.utils';

export default async (): Promise<void> => {
  const everWalletsDeploy =
    EVER_WALLETS_COUNT * +AMOUNT +
    Math.ceil(EVER_WALLETS_COUNT / EVER_WALLETS_DEPLOY_BATCH_SIZE) * 50;

  const tokensDeploy =
    TEST_TOKENS_COUNT * TOKEN_DEPLOY_VALUE +
    Math.ceil(TEST_TOKENS_COUNT / TOKENS_DEPLOY_BATCH_SIZE) * 50;

  const dexRootDeploy = DEX_ROOT_DEPLOY_VALUE + TOKEN_FACTORY_DEPLOY_VALUE;

  const pairsDeploy =
    TEST_TOKENS_COUNT * PAIR_DEPLOY_VALUE +
    Math.ceil(TEST_TOKENS_COUNT / PAIRS_DEPLOY_BATCH_SIZE) * 50;

  const value =
    everWalletsDeploy +
    BATCH_EXECUTOR_DEPLOY_VALUE +
    tokensDeploy +
    dexRootDeploy +
    pairsDeploy;

  await locklift.deployments.deployAccounts(
    [
      {
        deploymentName: 'OwnerEverWallet',
        signerId: '0',
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
