import { toNano, WalletTypes } from 'locklift';

export default async (): Promise<void> => {
  await locklift.deployments.deployAccounts(
    [
      {
        deploymentName: 'OwnerEverWallet',
        signerId: '0',
        accountSettings: {
          type: WalletTypes.EverWallet,
          value: toNano(10),
        },
      },
    ],
    true,
  );
};

export const tag = 'owner-ever-wallet';
