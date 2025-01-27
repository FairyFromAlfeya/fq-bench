import { toNano, getRandomNonce } from 'locklift';

import {
  BATCH_EXECUTOR_DEPLOY_VALUE,
  BATCH_EXECUTOR_DEPLOYMENT_TAG,
  DexAccountCode,
  DexPlatformCode,
  DexTokenVaultCode,
  EverWalletCode,
  LpTokenPendingCode,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
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
  const TokenWalletCode = locklift.factory.getContractArtifacts(
    'TokenWalletUpgradeable',
  ).code;
  const DexPairCode = locklift.factory.getContractArtifacts('DexPair').code;

  const { contract } = await locklift.deployments.deploy({
    deployConfig: {
      contract: 'BatchExecutor',
      publicKey: owner.signer.publicKey,
      initParams: { _nonce: getRandomNonce() },
      constructorParams: { _remainingGasTo: owner.account.address },
      value: toNano(BATCH_EXECUTOR_DEPLOY_VALUE),
    },
    deploymentName: BATCH_EXECUTOR_DEPLOYMENT_TAG,
    enableLogs: true,
  });

  await locklift.transactions.waitFinalized(
    contract.methods
      .setTokenFactoryCode({
        _tokenFactoryCode: TokenFactoryCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setDexPairCode({
        _dexPairCode: DexPairCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setDexRootCode({
        _dexRootCode: DexRootCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setTokenWalletCode({
        _tokenWalletCode: TokenWalletCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setTokenRootCode({
        _tokenRootCode: TokenRootCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setDexAccountCode({
        _dexAccountCode: DexAccountCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setDexPlatformCode({
        _dexPlatformCode: DexPlatformCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setDexTokenVaultCode({
        _dexTokenVaultCode: DexTokenVaultCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setEverWalletCode({
        _everWalletCode: EverWalletCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setDexLpTokenPendingCode({
        _dexLpTokenPendingCode: LpTokenPendingCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    contract.methods
      .setTokenWalletPlatformCode({
        _tokenWalletPlatformCode: TokenWalletPlatformCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(1), bounce: true }),
  );
};

export const tag = 'batch-executor';
export const dependencies = ['owner-ever-wallet'];
