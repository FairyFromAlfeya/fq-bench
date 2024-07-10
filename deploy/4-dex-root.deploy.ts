import { getRandomNonce, toNano } from 'locklift';

import {
  DEX_ROOT_DEPLOY_VALUE,
  DexAccountCode,
  DexPairCode,
  DexPlatformCode,
  DexTokenVaultCode,
  LpTokenPendingCode,
  TOKEN_FACTORY_DEPLOY_VALUE,
  TokenRootCode,
  TokenWalletCode,
  TokenWalletPlatformCode,
} from '../utils/constants.utils';

export default async (): Promise<void> => {
  const owner = locklift.deployments.getAccount('OwnerEverWallet');

  const { contract: factory } = await locklift.deployments.deploy({
    deployConfig: {
      contract: 'TokenFactory',
      publicKey: owner.signer.publicKey,
      initParams: { randomNonce_: getRandomNonce() },
      constructorParams: { _owner: owner.account.address },
      value: toNano(TOKEN_FACTORY_DEPLOY_VALUE),
    },
    deploymentName: 'TokenFactory',
    enableLogs: true,
  });

  await locklift.transactions.waitFinalized(
    factory.methods
      .setRootCode({ _rootCode: TokenRootCode })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    factory.methods
      .setWalletCode({ _walletCode: TokenWalletCode })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    factory.methods
      .setWalletPlatformCode({ _walletPlatformCode: TokenWalletPlatformCode })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );

  const { contract: root } = await locklift.deployments.deploy({
    deployConfig: {
      contract: 'DexRoot',
      publicKey: owner.signer.publicKey,
      initParams: { _nonce: getRandomNonce() },
      constructorParams: {
        initial_owner: owner.account.address,
        initial_vault: owner.account.address,
      },
      value: toNano(DEX_ROOT_DEPLOY_VALUE),
    },
    deploymentName: 'DexRoot',
    enableLogs: true,
  });

  await locklift.transactions.waitFinalized(
    root.methods
      .installPlatformOnce({ code: DexPlatformCode })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    root.methods
      .installOrUpdatePairCode({ code: DexPairCode, pool_type: 1 })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    root.methods
      .installOrUpdateLpTokenPendingCode({
        _newCode: LpTokenPendingCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    root.methods
      .installOrUpdateAccountCode({ code: DexAccountCode })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    root.methods
      .installOrUpdateTokenVaultCode({
        _newCode: DexTokenVaultCode,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    root.methods
      .setTokenFactory({
        _newTokenFactory: factory.address,
        _remainingGasTo: owner.account.address,
      })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );

  await locklift.transactions.waitFinalized(
    root.methods
      .setActive({ new_active: true })
      .send({ from: owner.account.address, amount: toNano(0.5), bounce: true }),
  );
};

export const tag = 'dex-root';
export const dependencies = ['owner-ever-wallet'];
