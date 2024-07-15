import { Address, Contract, toNano } from 'locklift';
import { concatMap, from, lastValueFrom, range, reduce, toArray } from 'rxjs';
import { AccountWithSigner } from '@broxus/locklift-deploy/dist/types';

import { BatchExecutorAbi, DexRootAbi } from '../build/factorySource';

import {
  BatchMintEvent,
  EverWalletDeployedEvent,
  PairDeployedEvent,
  saveEverWallet,
  Token,
  TokenRootDeployedEvent,
  waitForNEvents,
} from './locklift.utils';
import {
  EVER_WALLETS_DEPLOY_BATCH_VALUE,
  TOKEN_MINT_AMOUNT,
  PAIR_DEPLOY_VALUE,
  PAIRS_DEPLOY_BATCH_VALUE,
  TOKEN_DEPLOY_VALUE,
  TOKEN_NAME_SUFFIX,
  TOKEN_ROOT_DEPLOYMENT_TAG,
  TOKEN_WALLETS_DEPLOY_BATCH_VALUE,
  TOKEN_WALLET_DEPLOY_VALUE,
  TOKENS_DEPLOY_BATCH_VALUE,
  HELPERS_DEPLOY_BATCH_INDEX,
} from './constants.utils';

export const deployHelpers = async (
  helpersCount: number,
  helperValue: number,
  executor: Contract<BatchExecutorAbi>,
  publicKey: string,
  owner: Address,
): Promise<AccountWithSigner[]> => {
  const helperWallets = await lastValueFrom(
    range(helpersCount).pipe(toArray()),
  );

  return deployEverWalletsBatch(
    HELPERS_DEPLOY_BATCH_INDEX,
    helperWallets,
    helperValue,
    publicKey,
    executor,
    owner,
  ).then((events) => Promise.all(events.map((event) => saveEverWallet(event))));
};

export const deployEverWalletsBatch = async (
  batchIndex: number,
  wallets: number[],
  amount: number,
  publicKey: string,
  executor: Contract<BatchExecutorAbi>,
  owner: Address,
): Promise<EverWalletDeployedEvent[]> => {
  const value = amount * wallets.length + EVER_WALLETS_DEPLOY_BATCH_VALUE;

  const eventsProm = waitForNEvents(
    executor,
    'EverWalletDeployed' as const,
    (e) => +e.data.batchIndex === batchIndex,
    wallets.length,
  );

  await executor.methods
    .batchEverWalletDeploy({
      _batchIndex: batchIndex,
      _publicKey: `0x${publicKey}`,
      _infos: wallets.map((nonce) => ({
        nonce: nonce,
        amount: toNano(amount),
      })),
      _offset: 0,
      _remainingGasTo: owner,
    })
    .send({ from: owner, amount: toNano(value), bounce: true });

  return eventsProm;
};

export const deployTokensBatch = async (
  batchIndex: number,
  tokens: Token[],
  executor: Contract<BatchExecutorAbi>,
  owner: Address,
): Promise<TokenRootDeployedEvent[]> => {
  const value = TOKEN_DEPLOY_VALUE * tokens.length + TOKENS_DEPLOY_BATCH_VALUE;

  const eventsProm = waitForNEvents(
    executor,
    'TokenRootDeployed' as const,
    (item) => +item.data.batchIndex === batchIndex,
    tokens.length,
  );

  await executor.methods
    .batchTokenRootDeploy({
      _batchIndex: batchIndex,
      _infos: tokens,
      _offset: 0,
      _remainingGasTo: owner,
    })
    .send({ from: owner, amount: toNano(value), bounce: true });

  return eventsProm;
};

export const deployPairsBatch = async (
  batchIndex: number,
  pairs: [number, number][],
  executor: Contract<BatchExecutorAbi>,
  root: Contract<DexRootAbi>,
  owner: Address,
): Promise<
  (PairDeployedEvent & { leftRootName: string; rightRootName: string })[]
> => {
  const value = PAIR_DEPLOY_VALUE * pairs.length + PAIRS_DEPLOY_BATCH_VALUE;

  const tokenAddressToName = await lastValueFrom(
    from(pairs).pipe(
      concatMap((pair) => from(pair)),
      reduce(
        (acc, val) => {
          const deploymentName = `${TOKEN_ROOT_DEPLOYMENT_TAG}${TOKEN_NAME_SUFFIX}${val}`;
          const address = locklift.deployments
            .getContract(deploymentName)
            .address.toString();
          const tokenName = `${TOKEN_NAME_SUFFIX}${val}`;

          acc[tokenName] = address;
          acc[address] = tokenName;

          return acc;
        },
        {} as Record<string, string>,
      ),
    ),
  );

  const eventsProm = waitForNEvents(
    executor,
    'PairDeployed' as const,
    (item) => +item.data.batchIndex === batchIndex,
    pairs.length,
  );

  await executor.methods
    .batchPairDeploy({
      _batchIndex: batchIndex,
      _dexRoot: root.address,
      _infos: pairs.map(([a, b]) => ({
        leftRoot: new Address(tokenAddressToName[`${TOKEN_NAME_SUFFIX}${a}`]),
        rightRoot: new Address(tokenAddressToName[`${TOKEN_NAME_SUFFIX}${b}`]),
      })),
      _offset: 0,
      _remainingGasTo: owner,
    })
    .sendDelayed({ from: owner, amount: toNano(value), bounce: true });

  return eventsProm.then((events) =>
    events.map((e) => ({
      ...e,
      leftRootName: tokenAddressToName[e.data.leftRoot.toString()],
      rightRootName: tokenAddressToName[e.data.rightRoot.toString()],
    })),
  );
};

export const deployTokenWalletBatch = async (
  executor: Contract<BatchExecutorAbi>,
  token: Address,
  recipients: Address[],
  owner: Address,
): Promise<BatchMintEvent> => {
  const value =
    TOKEN_WALLET_DEPLOY_VALUE * recipients.length +
    TOKEN_WALLETS_DEPLOY_BATCH_VALUE;

  const eventsProm = waitForNEvents(
    executor,
    'BatchMint' as const,
    (item) => item.data.tokenRoot.equals(token),
    1,
  );

  await executor.methods
    .batchMint({
      _tokenRoot: token,
      _amount: TOKEN_MINT_AMOUNT,
      _offset: 0,
      _recipients: recipients,
      _remainingGasTo: owner,
    })
    .send({ from: owner, amount: toNano(value), bounce: true });

  return eventsProm.then((r) => r[0]);
};
