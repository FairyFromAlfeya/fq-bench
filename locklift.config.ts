import '@broxus/locklift-deploy';

import { Deployments } from '@broxus/locklift-deploy';

import { LockliftConfig } from 'locklift';
import { BigNumber } from 'bignumber.js';
import * as dotenv from 'dotenv';

import { FactorySource } from './build/factorySource';

dotenv.config();
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

declare global {
  const locklift: import('locklift').Locklift<FactorySource>;
}

declare module 'locklift' {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  export interface Locklift {
    deployments: Deployments<FactorySource>;
  }
}

const config: LockliftConfig = {
  compiler: { version: '0.62.0' },
  linker: { version: '0.15.48' },
  networks: {
    locklift: {
      connection: {
        id: 1,
        group: 'local',
        type: 'proxy',
        data: {} as never,
      },
      giver: {
        address: process.env.LOCKLIFT_GIVER_ADDRESS!,
        key: process.env.LOCKLIFT_GIVER_KEY!,
      },
      keys: {
        phrase: process.env.LOCKLIFT_PHRASE,
        amount: 20,
      },
    },
    broxus_testnet: {
      connection: {
        id: 2,
        type: 'jrpc',
        group: 'dev',
        data: {
          endpoint: process.env.BROXUS_NETWORK_ENDPOINT!,
        },
      },
      giver: {
        address: process.env.BROXUS_GIVER_ADDRESS!,
        key: process.env.BROXUS_GIVER_KEY!,
      },
      keys: {
        phrase: process.env.BROXUS_PHRASE!,
        amount: 20,
      },
    },
  },
  mocha: {},
};

export default config;
