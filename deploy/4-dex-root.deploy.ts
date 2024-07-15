import { toNano } from 'locklift';

import { BatchExecutorAbi } from '../build/factorySource';

import {
  BATCH_EXECUTOR_DEPLOYMENT_TAG,
  DEX_DEPLOY_VALUE,
  DEX_ROOT_DEPLOYMENT_TAG,
  OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  TOKEN_FACTORY_DEPLOYMENT_TAG,
} from '../utils/constants.utils';
import { waitForNEvents } from '../utils/locklift.utils';

export default async (): Promise<void> => {
  const owner = locklift.deployments.getAccount(
    OWNER_EVER_WALLET_DEPLOYMENT_TAG,
  ).account.address;
  const executor = locklift.deployments.getContract<BatchExecutorAbi>(
    BATCH_EXECUTOR_DEPLOYMENT_TAG,
  );

  const eventProm = waitForNEvents(
    executor,
    'DexDeployed' as const,
    (item) => !!item.data,
    1,
  );

  await executor.methods
    .deployDex({ _remainingGasTo: owner })
    .send({ from: owner, amount: toNano(DEX_DEPLOY_VALUE), bounce: true });

  const event = (await eventProm)[0];

  await locklift.deployments.saveContract({
    contractName: 'TokenFactory',
    address: event.data.tokenFactory,
    deploymentName: TOKEN_FACTORY_DEPLOYMENT_TAG,
  });

  console.log(`Token factory deployed: ${event.data.tokenFactory}`);

  await locklift.deployments.saveContract({
    contractName: 'DexRoot',
    address: event.data.dexRoot,
    deploymentName: DEX_ROOT_DEPLOYMENT_TAG,
  });

  console.log(`DEX root deployed: ${event.data.dexRoot}`);
};

export const tag = 'dex-root';
export const dependencies = ['batch-executor'];
