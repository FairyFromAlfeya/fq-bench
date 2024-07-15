import {
  catchError,
  concatMap,
  filter,
  finalize,
  from,
  generate,
  lastValueFrom,
  map,
  mergeMap,
  of,
  range,
  reduce,
  tap,
  toArray,
} from 'rxjs';
import { BigNumber } from 'bignumber.js';
import { Presets, SingleBar } from 'cli-progress';

import {
  CustomTokenRootAbi,
  DexPairAbi,
  DexRootAbi,
} from '../build/factorySource';

import {
  EVER_WALLET_AMOUNT,
  DEX_ROOT_DEPLOYMENT_TAG,
  EVER_WALLETS_CHECK_PROGRESS_BAR_FORMAT,
  EVER_WALLETS_COUNT,
  EVER_WALLETS_DEPLOY_BATCH_SIZE,
  TOKEN_MINT_AMOUNT,
  PAIR_DEPLOYMENT_TAG,
  PAIRS_CHECK_PROGRESS_BAR_FORMAT,
  TEST_TOKENS_COUNT,
  TOKEN_NAME_SUFFIX,
  TOKEN_ROOT_DEPLOYMENT_TAG,
  TOKEN_WALLETS_CHECK_PROGRESS_BAR_FORMAT,
  TOKEN_WALLETS_DEPLOY_BATCH_SIZE,
  USER_EVER_WALLET_DEPLOYMENT_TAG,
  TOKEN_VAULTS_CHECK_PROGRESS_BAR_FORMAT,
} from '../utils/constants.utils';
import { getChainedPairs } from '../utils/operators.utils';
import {
  getState,
  getTokenVault,
  getTokenWallet,
} from '../utils/locklift.utils';

const main = async (): Promise<void> => {
  await locklift.deployments.load();

  // Ever wallets

  const everWalletsStep = Math.min(
    EVER_WALLETS_COUNT,
    EVER_WALLETS_DEPLOY_BATCH_SIZE,
  );
  const everWalletsForCheck = generate({
    initialState: [0, everWalletsStep - 1],
    condition: (pair) => pair[1] < EVER_WALLETS_COUNT,
    iterate: (pair) => [pair[0] + everWalletsStep, pair[1] + everWalletsStep],
  }).pipe(
    concatMap((pair) => from(pair)),
    map((walletIndex) => ({
      address: locklift.deployments.getAccount(
        `${USER_EVER_WALLET_DEPLOYMENT_TAG}${walletIndex}`,
      ).account.address,
      name: `${USER_EVER_WALLET_DEPLOYMENT_TAG}${walletIndex}`,
    })),
  );
  const everWalletsCount = await lastValueFrom(
    everWalletsForCheck.pipe(reduce((acc) => ++acc, 0)),
  );

  // Ever wallets progress

  const progress = new SingleBar(
    { format: EVER_WALLETS_CHECK_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress.start(everWalletsCount, 0);

  // Ever wallets balance and state check

  const everWalletsErrors = await lastValueFrom(
    everWalletsForCheck.pipe(
      mergeMap(
        (wallet) =>
          from(getState(wallet.address)).pipe(
            map((state) => {
              if (!state.state?.isDeployed) {
                return `${wallet.name} ${state.address} is not deployed`;
              }

              if (new BigNumber(state.state!.balance).lt(EVER_WALLET_AMOUNT)) {
                return `${wallet.name} ${state.address} balance is lower than ${EVER_WALLET_AMOUNT}`;
              }
            }),
          ),
        50,
      ),
      tap(() => progress.increment()),
      filter((item) => !!item),
      toArray(),
      finalize(() => progress.stop()),
    ),
    { defaultValue: [] },
  );

  // Token wallets

  const tokenWalletsStep = Math.min(
    EVER_WALLETS_COUNT,
    TOKEN_WALLETS_DEPLOY_BATCH_SIZE,
  );
  const tokenWalletsForCheck = generate({
    initialState: [0, tokenWalletsStep - 1],
    condition: (pair) => pair[1] < EVER_WALLETS_COUNT,
    iterate: (pair) => [pair[0] + tokenWalletsStep, pair[1] + tokenWalletsStep],
  }).pipe(
    concatMap((pair) => from(pair)),
    map((walletIndex) => ({
      address: locklift.deployments.getAccount(
        `${USER_EVER_WALLET_DEPLOYMENT_TAG}${walletIndex}`,
      ).account.address,
      name: `${USER_EVER_WALLET_DEPLOYMENT_TAG}${walletIndex}`,
    })),
  );
  const tokens = range(TEST_TOKENS_COUNT).pipe(
    mergeMap(async (tokenIndex) => {
      const deploymentName = `${TOKEN_ROOT_DEPLOYMENT_TAG}${TOKEN_NAME_SUFFIX}${tokenIndex}`;
      const contract =
        locklift.deployments.getContract<CustomTokenRootAbi>(deploymentName);
      const state = await contract.getFullState().then((s) => s.state);

      return {
        contract,
        state,
        name: deploymentName,
      };
    }, 50),
  );
  const tokenWalletsCount = await lastValueFrom(
    tokenWalletsForCheck.pipe(reduce((acc) => ++acc, 0)),
  );

  // Token wallets progress

  const progress2 = new SingleBar(
    { format: TOKEN_WALLETS_CHECK_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress2.start(tokenWalletsCount * TEST_TOKENS_COUNT, 0);

  // Token wallets balance and state check

  const tokenWalletsErrors = await lastValueFrom(
    tokenWalletsForCheck.pipe(
      concatMap((wallet) =>
        tokens.pipe(
          mergeMap(
            (token) =>
              from(getTokenWallet(token, wallet.address)).pipe(
                mergeMap(async (tokenWallet) => {
                  if (!tokenWallet.state?.isDeployed) {
                    return `${wallet.name} ${token.name} is not deployed`;
                  }

                  const balance = await tokenWallet.contract.methods
                    .balance({ answerId: 0 })
                    .call()
                    .then((res) => res.value0);

                  if (new BigNumber(balance).lt(TOKEN_MINT_AMOUNT)) {
                    return `${wallet.name} ${token.name} balance is lower than ${TOKEN_MINT_AMOUNT}`;
                  }
                }),
                catchError((err) =>
                  of(`${wallet.name} ${token.name}: ${err.message}`),
                ),
              ),
            50,
          ),
        ),
      ),
      tap(() => progress2.increment()),
      filter((item) => !!item),
      toArray(),
      finalize(() => progress2.stop()),
    ),
    { defaultValue: [] },
  );

  // DEX pairs

  const pairs = getChainedPairs(TEST_TOKENS_COUNT).pipe(
    map((pair) =>
      locklift.deployments.getContract<DexPairAbi>(
        `${PAIR_DEPLOYMENT_TAG}${TOKEN_NAME_SUFFIX}${pair[0]}${TOKEN_NAME_SUFFIX}${pair[1]}`,
      ),
    ),
  );

  // DEX pairs progress

  const progress3 = new SingleBar(
    { format: PAIRS_CHECK_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress3.start(TEST_TOKENS_COUNT, 0);

  // DEX pairs state and reserves check

  const pairsErrors = await lastValueFrom(
    pairs.pipe(
      mergeMap(
        (pair) =>
          from(pair.getFields()).pipe(
            map((fields) => {
              if (!fields.state?.isDeployed) {
                return `Pair ${pair.address} is not deployed`;
              }

              if (!fields.fields!._active) {
                return `Pair ${pair.address} is not active`;
              }

              const [leftReserve, rightReserve] =
                fields.fields!._typeToReserves[0][1];

              if (
                new BigNumber(leftReserve).lt(TOKEN_MINT_AMOUNT) ||
                new BigNumber(rightReserve).lt(TOKEN_MINT_AMOUNT)
              ) {
                return `Pair ${pair.address} reserves is lower than ${TOKEN_MINT_AMOUNT}`;
              }
            }),
          ),
        50,
      ),
      tap(() => progress3.increment()),
      filter((item) => !!item),
      toArray(),
      finalize(() => progress3.stop()),
    ),
    { defaultValue: [] },
  );

  // DEX token vaults

  const root = locklift.deployments.getContract<DexRootAbi>(
    DEX_ROOT_DEPLOYMENT_TAG,
  );
  const rootState = await root.getFullState().then((s) => s.state!);

  // DEX token vaults progress

  const progress4 = new SingleBar(
    { format: TOKEN_VAULTS_CHECK_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress4.start(TEST_TOKENS_COUNT, 0);

  // DEX token vaults state and balance check

  const tokenVaultsErrors = await lastValueFrom(
    tokens.pipe(
      mergeMap(
        (token) =>
          from(
            getTokenVault(root, token.contract.address, rootState).then(
              (vault) => getTokenWallet(token, vault),
            ),
          ).pipe(
            mergeMap(async (tokenWallet) => {
              if (!tokenWallet.state?.isDeployed) {
                return `DEX vault ${token.name} wallet is not deployed`;
              }

              const balance = await tokenWallet.contract.methods
                .balance({ answerId: 0 })
                .call()
                .then((res) => res.value0);

              if (new BigNumber(balance).lt(TOKEN_MINT_AMOUNT)) {
                return `DEX vault ${token.name} wallet balance is lower than ${TOKEN_MINT_AMOUNT}`;
              }
            }),
            catchError((err) => of(`Vault ${token.name}: ${err.message}`)),
          ),
        50,
      ),
      tap(() => progress4.increment()),
      filter((item) => !!item),
      toArray(),
      finalize(() => progress4.stop()),
    ),
    { defaultValue: [] },
  );

  // Logs

  if (everWalletsErrors.length) {
    console.error(
      'Ever wallets errors:',
      JSON.stringify(everWalletsErrors, null, 2),
    );
  }

  if (tokenWalletsErrors.length) {
    console.error(
      'Token wallets errors:',
      JSON.stringify(tokenWalletsErrors, null, 2),
    );
  }

  if (pairsErrors.length) {
    console.error('Pairs errors:', JSON.stringify(pairsErrors, null, 2));
  }

  if (tokenVaultsErrors.length) {
    console.error(
      'Token vaults errors',
      JSON.stringify(tokenVaultsErrors, null, 2),
    );
  }
};

main().then(() => console.log('Success'));
