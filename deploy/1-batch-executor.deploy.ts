import { toNano, getRandomNonce } from 'locklift';

import {
  BATCH_EXECUTOR_DEPLOY_VALUE,
  BATCH_EXECUTOR_DEPLOYMENT_TAG,
  DexAccountCode,
  DexPairCode,
  DexPlatformCode,
  DexTokenVaultCode,
  EverWalletCode,
  LpTokenPendingCode,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  TokenWalletCode,
  TokenWalletPlatformCode,
} from '../utils/constants.utils';

export default async (): Promise<void> => {
  const owner = locklift.deployments.getAccount(
    OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  );

  const TokenRootCode =
    locklift.factory.getContractArtifacts('CustomTokenRoot').code;
  const TokenFactoryCode =
    locklift.factory.getContractArtifacts('TokenFactory').code;
  const DexRootCode = locklift.factory.getContractArtifacts('DexRoot').code;

  await locklift.deployments.deploy({
    deployConfig: {
      contract: 'BatchExecutor',
      publicKey: owner.signer.publicKey,
      initParams: { _nonce: getRandomNonce() },
      constructorParams: {
        _platformCode: TokenWalletPlatformCode,
        _rootCode: TokenRootCode,
        _walletCode: TokenWalletCode,
        _everWalletCode: EverWalletCode,
        _tokenFactoryCode: TokenFactoryCode,
        _dexRootCode: DexRootCode,
        _dexPlatformCode: DexPlatformCode,
        _dexPairCode: DexPairCode,
        _dexAccountCode: DexAccountCode,
        _dexLpPendingCode: LpTokenPendingCode,
        _dexTokenVaultCode: DexTokenVaultCode,
        _remainingGasTo: owner.account.address,
      },
      value: toNano(BATCH_EXECUTOR_DEPLOY_VALUE),
    },
    deploymentName: BATCH_EXECUTOR_DEPLOYMENT_TAG,
    enableLogs: true,
  });
};

export const tag = 'batch-executor';
export const dependencies = ['owner-ever-wallet'];
