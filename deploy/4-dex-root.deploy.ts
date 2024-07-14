import { toNano } from 'locklift';

import {
  BATCH_EXECUTOR_DEPLOYMENT_TAG,
  DEX_ROOT_DEPLOYMENT_TAG,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  TOKEN_FACTORY_DEPLOYMENT_TAG,
} from '../utils/constants.utils';
import { BatchExecutorAbi } from '../build/factorySource';

export default async (): Promise<void> => {
  const owner = locklift.deployments.getAccount(
    OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  ).account.address;
  const executor = locklift.deployments.getContract<BatchExecutorAbi>(
    BATCH_EXECUTOR_DEPLOYMENT_TAG,
  );

  const { traceTree } = await locklift.tracing.trace(
    executor.methods
      .deployDex({ _remainingGasTo: owner })
      .send({ from: owner, amount: toNano(12), bounce: true }),
  );

  const event = traceTree!.findEventsForContract({
    contract: executor,
    name: 'DexDeployed' as const,
  })[0];

  await locklift.deployments.saveContract({
    contractName: 'TokenFactory',
    address: event.tokenFactory,
    deploymentName: TOKEN_FACTORY_DEPLOYMENT_TAG,
  });

  await locklift.deployments.saveContract({
    contractName: 'DexRoot',
    address: event.dexRoot,
    deploymentName: DEX_ROOT_DEPLOYMENT_TAG,
  });
};

export const tag = 'dex-root';
export const dependencies = ['owner-ever-wallet'];
