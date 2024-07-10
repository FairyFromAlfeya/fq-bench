import { BigNumber } from 'bignumber.js';
import { DecodedEventWithTransaction, Transaction } from 'locklift';
import { BatchExecutorAbi, DexRootAbi } from '../build/factorySource';

export const getTotalFees = async (tx: Transaction): Promise<BigNumber> => {
  const subscriber = new locklift.provider.Subscriber();

  return await subscriber
    .trace(tx)
    .fold(new BigNumber(0), (total, tx) => total.plus(tx.totalFees))
    .finally(() => subscriber.unsubscribe());
};

export type EverWalletDeployedEvent = DecodedEventWithTransaction<
  BatchExecutorAbi,
  'EverWalletDeployed'
>;

export type Token = {
  name: string;
  symbol: string;
  decimals: number;
};

export type TokenRootDeployedEvent = DecodedEventWithTransaction<
  BatchExecutorAbi,
  'TokenRootDeployed'
>;

export type PairDeployedEvent = DecodedEventWithTransaction<
  DexRootAbi,
  'PairDeployed'
>;
