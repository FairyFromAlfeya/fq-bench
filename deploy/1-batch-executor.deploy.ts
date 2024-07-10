import { toNano, getRandomNonce } from 'locklift';
import {
  BATCH_EXECUTOR_DEPLOY_VALUE,
  EverWalletCode,
  TokenRootCode,
  TokenWalletCode,
  TokenWalletPlatformCode,
} from '../utils/constants.utils';

export default async (): Promise<void> => {
  const owner = locklift.deployments.getAccount('OwnerEverWallet');

  await locklift.deployments.deploy({
    deployConfig: {
      contract: 'BatchExecutor',
      publicKey: owner.signer.publicKey,
      initParams: { _nonce: getRandomNonce() },
      constructorParams: {
        _owners: [owner.account.address],
        _platformCode: TokenWalletPlatformCode,
        _rootCode: TokenRootCode,
        _walletCode: TokenWalletCode,
        _everWalletCode: EverWalletCode,
        _remainingGasTo: owner.account.address,
      },
      value: toNano(BATCH_EXECUTOR_DEPLOY_VALUE),
    },
    deploymentName: 'BatchExecutor',
    enableLogs: true,
  });
};

export const tag = 'batch-executor';
export const dependencies = ['owner-ever-wallet'];
