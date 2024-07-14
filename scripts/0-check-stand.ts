import {
  concatMap,
  filter,
  finalize,
  from,
  generate,
  lastValueFrom,
  map,
  mergeMap,
  range,
  reduce,
  tap,
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
} from '../utils/constants.utils';
import { getChainedPairs } from '../utils/operators.utils';
import {
  getState,
  getTokenVault,
  getTokenWallet,
} from '../utils/locklift.utils';

const main = async (): Promise<void> => {
  await locklift.deployments.fixture();

  const EVER_WALLETS_STEP = Math.min(
    EVER_WALLETS_COUNT,
    EVER_WALLETS_DEPLOY_BATCH_SIZE,
  );

  const everWalletsForCheck = generate({
    initialState: [0, EVER_WALLETS_STEP - 1],
    condition: (pair) => pair[1] < EVER_WALLETS_COUNT,
    iterate: (pair) => [
      pair[0] + EVER_WALLETS_STEP,
      pair[1] + EVER_WALLETS_STEP,
    ],
  }).pipe(
    concatMap((x) => from(x)),
    map((x) => ({
      address: locklift.deployments.getAccount(
        `${USER_EVER_WALLET_DEPLOYMENT_TAG}${x}`,
      ).account.address,
      name: `${USER_EVER_WALLET_DEPLOYMENT_TAG}${x}`,
    })),
  );
  const everWalletsCount = await lastValueFrom(
    everWalletsForCheck.pipe(reduce((acc) => ++acc, 0)),
  );

  const progress = new SingleBar(
    { format: EVER_WALLETS_CHECK_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress.start(everWalletsCount, 0);

  await lastValueFrom(
    everWalletsForCheck.pipe(
      mergeMap(
        (wallet) =>
          from(getState(wallet.address)).pipe(
            tap((state) => {
              progress.increment();

              if (!state.state?.isDeployed) {
                return console.error(
                  `${wallet.name} ${state.address} is not deployed`,
                );
              }

              if (new BigNumber(state.state!.balance).lt(EVER_WALLET_AMOUNT)) {
                return console.warn(
                  `${wallet.name} ${state.address} balance is lower than ${EVER_WALLET_AMOUNT}`,
                );
              }
            }),
          ),
        50,
      ),
      finalize(() => progress.stop()),
    ),
  );

  const TOKEN_WALLETS_STEP = Math.min(
    EVER_WALLETS_COUNT,
    TOKEN_WALLETS_DEPLOY_BATCH_SIZE,
  );

  const everWalletsForCheck2 = generate({
    initialState: [0, TOKEN_WALLETS_STEP - 1],
    condition: (pair) => pair[1] < EVER_WALLETS_COUNT,
    iterate: (pair) => [
      pair[0] + TOKEN_WALLETS_STEP,
      pair[1] + TOKEN_WALLETS_STEP,
    ],
  }).pipe(
    concatMap((x) => from(x)),
    map((x) => ({
      address: locklift.deployments.getAccount(
        `${USER_EVER_WALLET_DEPLOYMENT_TAG}${x}`,
      ).account.address,
      name: `${USER_EVER_WALLET_DEPLOYMENT_TAG}${x}`,
    })),
  );

  const tokens = range(TEST_TOKENS_COUNT).pipe(
    mergeMap(async (x) => {
      const contract = locklift.deployments.getContract<CustomTokenRootAbi>(
        `${TOKEN_ROOT_DEPLOYMENT_TAG}${TOKEN_NAME_SUFFIX}${x}`,
      );

      return {
        contract,
        state: await contract.getFullState().then((s) => s.state),
        name: `${TOKEN_ROOT_DEPLOYMENT_TAG}${TOKEN_NAME_SUFFIX}${x}`,
      };
    }),
  );

  const tokenWalletsCount = await lastValueFrom(
    everWalletsForCheck2.pipe(reduce((acc) => ++acc, 0)),
  );

  const progress2 = new SingleBar(
    { format: TOKEN_WALLETS_CHECK_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress2.start(tokenWalletsCount * TEST_TOKENS_COUNT, 0);

  await lastValueFrom(
    everWalletsForCheck2.pipe(
      concatMap((wallet) =>
        tokens.pipe(
          mergeMap((token) =>
            from(getTokenWallet(token, wallet.address)).pipe(
              tap(() => progress2.increment()),
              filter((tokenWallet) => {
                if (!tokenWallet.state?.isDeployed) {
                  console.error(`${wallet.name} ${token.name} is not deployed`);
                }

                return !!tokenWallet.state;
              }),
              mergeMap((tokenWallet) =>
                tokenWallet.contract.methods
                  .balance({ answerId: 0 })
                  .call()
                  .then((res) => res.value0),
              ),
              tap((balance) => {
                if (new BigNumber(balance).lt(TOKEN_MINT_AMOUNT)) {
                  return console.warn(
                    `${wallet.name} ${token.name} balance is lower than ${TOKEN_MINT_AMOUNT}`,
                  );
                }
              }),
            ),
          ),
        ),
      ),
      finalize(() => progress2.stop()),
    ),
    { defaultValue: null },
  );

  const pairs = getChainedPairs(TEST_TOKENS_COUNT).pipe(
    map((pair) =>
      locklift.deployments.getContract<DexPairAbi>(
        `${PAIR_DEPLOYMENT_TAG}${TOKEN_NAME_SUFFIX}${pair[0]}${TOKEN_NAME_SUFFIX}${pair[1]}`,
      ),
    ),
  );

  const progress3 = new SingleBar(
    { format: PAIRS_CHECK_PROGRESS_BAR_FORMAT },
    Presets.shades_classic,
  );
  progress3.start(TEST_TOKENS_COUNT, 0);

  await lastValueFrom(
    pairs.pipe(
      mergeMap((pair) =>
        from(pair.getFields()).pipe(
          tap(() => progress3.increment()),
          filter((fields) => {
            if (!fields.state?.isDeployed) {
              console.error(`Pair ${pair.address} is not deployed`);
            }

            return !!fields.state;
          }),
          tap((fields) => {
            if (!fields.fields!._active) {
              return console.error(`Pair ${pair.address} is not active`);
            }

            if (
              new BigNumber(fields.fields!._typeToReserves[0][1][0]).lt(
                TOKEN_MINT_AMOUNT,
              ) ||
              new BigNumber(fields.fields!._typeToReserves[0][1][1]).lt(
                TOKEN_MINT_AMOUNT,
              )
            ) {
              return console.error(
                `Pair ${pair.address} reserves is lower than ${TOKEN_MINT_AMOUNT}`,
              );
            }
          }),
        ),
      ),
      finalize(() => progress3.stop()),
    ),
  );

  const root = locklift.deployments.getContract<DexRootAbi>(
    DEX_ROOT_DEPLOYMENT_TAG,
  );
  const rootState = await root.getFullState().then((s) => s.state!);

  await lastValueFrom(
    tokens.pipe(
      mergeMap((token) =>
        from(
          getTokenVault(root, token.contract.address, rootState).then((vault) =>
            getTokenWallet(token, vault),
          ),
        ).pipe(
          filter((tokenWallet) => {
            if (!tokenWallet.state?.isDeployed) {
              console.error(`DEX vault ${token.name} wallet is not deployed`);
            }

            return !!tokenWallet.state;
          }),
          mergeMap((tokenWallet) =>
            tokenWallet.contract.methods
              .balance({ answerId: 0 })
              .call()
              .then((res) => res.value0),
          ),
          tap((balance) => {
            if (new BigNumber(balance).lt(TOKEN_MINT_AMOUNT)) {
              return console.warn(
                `DEX vault ${token.name} wallet balance is lower than ${TOKEN_MINT_AMOUNT}`,
              );
            }
          }),
        ),
      ),
    ),
  );
};

main().then(() => console.log('Success'));
