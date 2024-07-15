import {
  AbiEventName,
  Address,
  Contract,
  DecodedEventWithTransaction,
  FullContractState,
  WalletTypes,
} from 'locklift';

import {
  BatchExecutorAbi,
  CustomTokenRootAbi,
  DexPairAbi,
  DexRootAbi,
} from '../build/factorySource';

import {
  OWNER_TOKEN_WALLET_DEPLOYMENT_TAG,
  PAIR_DEPLOYMENT_TAG,
  TOKEN_ROOT_DEPLOYMENT_TAG,
  USER_EVER_WALLET_DEPLOYMENT_TAG,
  USER_SIGNER_ID,
} from './constants.utils';

export const saveEverWallet = async (event: EverWalletDeployedEvent) => {
  const deploymentName = `${USER_EVER_WALLET_DEPLOYMENT_TAG}${event.data.nonce}`;

  await locklift.deployments.saveAccount({
    deploymentName: deploymentName,
    address: event.data.wallet.toString(),
    signerId: USER_SIGNER_ID,
    accountSettings: { type: WalletTypes.EverWallet },
  });

  return locklift.deployments.getAccount(deploymentName);
};

export const saveTokenRoot = async (
  event: TokenRootDeployedEvent,
  owner: Address,
) => {
  const deploymentName = `${TOKEN_ROOT_DEPLOYMENT_TAG}${event.data.symbol}`;

  await locklift.deployments.saveContract({
    contractName: 'CustomTokenRoot',
    address: event.data.tokenRoot,
    deploymentName: deploymentName,
  });

  const wallet = await locklift.factory
    .getDeployedContract('CustomTokenRoot', event.data.tokenRoot)
    .methods.walletOf({ answerId: 0, walletOwner: owner })
    .call()
    .then((res) => res.value0);

  await locklift.deployments.saveContract({
    contractName: 'TokenWalletUpgradeable',
    address: wallet,
    deploymentName: `${OWNER_TOKEN_WALLET_DEPLOYMENT_TAG}${event.data.symbol}`,
  });

  return locklift.deployments.getContract<CustomTokenRootAbi>(deploymentName);
};

export const savePair = async (
  event: PairDeployedEvent & { leftRootName: string; rightRootName: string },
) => {
  const deploymentName = `${PAIR_DEPLOYMENT_TAG}${event.leftRootName}${event.rightRootName}`;

  await locklift.deployments.saveContract({
    contractName: 'DexPair',
    address: event.data.pair,
    deploymentName: deploymentName,
  });

  return locklift.deployments.getContract<DexPairAbi>(deploymentName);
};

export const getTokenVault = (
  root: Contract<DexRootAbi>,
  token: Address,
  state?: FullContractState,
) =>
  root.methods
    .getExpectedTokenVaultAddress({ answerId: 0, _tokenRoot: token })
    .call({ cachedState: state })
    .then((v) => v.value0);

export const getState = (address: Address) =>
  locklift.provider
    .getFullContractState({ address })
    .then((s) => ({ ...s, address }));

export const getTokenWallet = (
  token: { contract: Contract<CustomTokenRootAbi>; state?: FullContractState },
  walletOwner: Address,
) =>
  token.contract.methods
    .walletOf({ answerId: 0, walletOwner: walletOwner })
    .call({ cachedState: token.state })
    .then(async (res) => {
      const contract = locklift.factory.getDeployedContract(
        'TokenWalletUpgradeable',
        res.value0,
      );
      const state = await contract.getFullState().then((res) => res.state);

      return { contract, state };
    });

type EventsNames<T> = DecodedEventWithTransaction<T, AbiEventName<T>>['event'];

export const waitForNEvents = async <T, N extends EventsNames<T>>(
  contract: Contract<T>,
  eventName: N,
  filter: (item: DecodedEventWithTransaction<T, typeof eventName>) => boolean,
  eventsCount: number,
): Promise<DecodedEventWithTransaction<T, typeof eventName>[]> => {
  const subscriber = new locklift.provider.Subscriber();

  return contract
    .events(subscriber)
    .filter((item) => item.event === eventName)
    .filter(filter)
    .take(eventsCount)
    .fold([] as DecodedEventWithTransaction<T, N>[], (acc, item) => {
      acc.push(item);
      return acc;
    })
    .finally(() => subscriber.unsubscribe());
};

export type Token = {
  name: string;
  symbol: string;
  decimals: number;
};

export type EverWalletDeployedEvent = DecodedEventWithTransaction<
  BatchExecutorAbi,
  'EverWalletDeployed'
>;

export type TokenRootDeployedEvent = DecodedEventWithTransaction<
  BatchExecutorAbi,
  'TokenRootDeployed'
>;

export type BatchMintEvent = DecodedEventWithTransaction<
  BatchExecutorAbi,
  'BatchMint'
>;

export type PairDeployedEvent = DecodedEventWithTransaction<
  BatchExecutorAbi,
  'PairDeployed'
>;
