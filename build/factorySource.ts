const batchExecutorAbi = {
  ABIversion: 2,
  version: '2.2',
  header: ['time'],
  functions: [
    {
      name: 'constructor',
      inputs: [
        { name: '_owners', type: 'address[]' },
        { name: '_platformCode', type: 'cell' },
        { name: '_rootCode', type: 'cell' },
        { name: '_walletCode', type: 'cell' },
        { name: '_everWalletCode', type: 'cell' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'batchTokenRootDeploy',
      inputs: [
        { name: '_iter', type: 'uint8' },
        {
          components: [
            { name: 'name', type: 'string' },
            { name: 'symbol', type: 'string' },
            { name: 'decimals', type: 'uint8' },
          ],
          name: '_infos',
          type: 'tuple[]',
        },
        { name: '_offset', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'batchEverWalletDeploy',
      inputs: [
        { name: '_iter', type: 'uint8' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'nonce', type: 'uint64' },
          ],
          name: '_infos',
          type: 'tuple[]',
        },
        { name: '_publicKey', type: 'uint256' },
        { name: '_offset', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'batchMint',
      inputs: [
        { name: '_tokenRoot', type: 'address' },
        { name: '_amount', type: 'uint128' },
        { name: '_recipients', type: 'address[]' },
        { name: '_offset', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'addOwners',
      inputs: [{ name: '_owners', type: 'address[]' }],
      outputs: [],
    },
  ],
  data: [{ key: 1, name: '_nonce', type: 'uint64' }],
  events: [
    {
      name: 'TokenRootDeployed',
      inputs: [
        { name: '_iter', type: 'uint8' },
        { name: 'tokenRoot', type: 'address' },
        { name: 'symbol', type: 'string' },
      ],
      outputs: [],
    },
    {
      name: 'EverWalletDeployed',
      inputs: [
        { name: 'wallet', type: 'address' },
        { name: 'publicKey', type: 'uint256' },
        { name: 'nonce', type: 'uint64' },
        { name: 'iter', type: 'uint8' },
      ],
      outputs: [],
    },
    {
      name: 'BatchMint',
      inputs: [
        { name: 'tokenRoot', type: 'address' },
        { name: 'recipientsCount', type: 'uint32' },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: '_nonce', type: 'uint64' },
    { name: 'owners', type: 'address[]' },
    { name: 'nonce', type: 'uint256' },
    { name: 'platformCode', type: 'cell' },
    { name: 'rootCode', type: 'cell' },
    { name: 'walletCode', type: 'cell' },
    { name: 'everWalletCode', type: 'cell' },
  ],
} as const;
const customTokenRootAbi = {
  ABIversion: 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [
        { name: 'initialSupplyTo', type: 'address' },
        { name: 'initialSupply', type: 'uint128' },
        { name: 'deployWalletValue', type: 'uint128' },
        { name: 'mintDisabled', type: 'bool' },
        { name: 'burnByRootDisabled', type: 'bool' },
        { name: 'burnPaused', type: 'bool' },
        { name: 'remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'batchMint',
      inputs: [
        { name: '_recipients', type: 'address[]' },
        { name: '_amount', type: 'uint128' },
        { name: '_offset', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'supportsInterface',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'interfaceID', type: 'uint32' },
      ],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'walletVersion',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint32' }],
    },
    {
      name: 'platformCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'requestUpgradeWallet',
      inputs: [
        { name: 'currentVersion', type: 'uint32' },
        { name: 'walletOwner', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'setWalletCode',
      inputs: [{ name: 'code', type: 'cell' }],
      outputs: [],
    },
    { name: 'upgrade', inputs: [{ name: 'code', type: 'cell' }], outputs: [] },
    {
      name: 'disableMint',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'mintDisabled',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'burnTokens',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'walletOwner', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'callbackTo', type: 'address' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'disableBurnByRoot',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'burnByRootDisabled',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'burnPaused',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'setBurnPaused',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'paused', type: 'bool' },
      ],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'transferOwnership',
      inputs: [
        { name: 'newOwner', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
        {
          components: [
            { name: 'value', type: 'uint128' },
            { name: 'payload', type: 'cell' },
          ],
          name: 'callbacks',
          type: 'map(address,tuple)',
        },
      ],
      outputs: [],
    },
    {
      name: 'name',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'string' }],
    },
    {
      name: 'symbol',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'string' }],
    },
    {
      name: 'decimals',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint8' }],
    },
    {
      name: 'totalSupply',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint128' }],
    },
    {
      name: 'walletCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'rootOwner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'walletOf',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'walletOwner', type: 'address' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'deployWallet',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'walletOwner', type: 'address' },
        { name: 'deployWalletValue', type: 'uint128' },
      ],
      outputs: [{ name: 'tokenWallet', type: 'address' }],
    },
    {
      name: 'mint',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'recipient', type: 'address' },
        { name: 'deployWalletValue', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'acceptBurn',
      id: '0x192B51B1',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'walletOwner', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'callbackTo', type: 'address' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'sendSurplusGas',
      inputs: [{ name: 'to', type: 'address' }],
      outputs: [],
    },
  ],
  data: [
    { key: 1, name: 'name_', type: 'string' },
    { key: 2, name: 'symbol_', type: 'string' },
    { key: 3, name: 'decimals_', type: 'uint8' },
    { key: 4, name: 'rootOwner_', type: 'address' },
    { key: 5, name: 'walletCode_', type: 'cell' },
    { key: 6, name: 'randomNonce_', type: 'uint256' },
    { key: 7, name: 'deployer_', type: 'address' },
    { key: 8, name: 'platformCode_', type: 'cell' },
  ],
  events: [],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'name_', type: 'string' },
    { name: 'symbol_', type: 'string' },
    { name: 'decimals_', type: 'uint8' },
    { name: 'rootOwner_', type: 'address' },
    { name: 'walletCode_', type: 'cell' },
    { name: 'totalSupply_', type: 'uint128' },
    { name: 'burnPaused_', type: 'bool' },
    { name: 'burnByRootDisabled_', type: 'bool' },
    { name: 'mintDisabled_', type: 'bool' },
    { name: 'randomNonce_', type: 'uint256' },
    { name: 'deployer_', type: 'address' },
    { name: 'platformCode_', type: 'cell' },
    { name: 'walletVersion_', type: 'uint32' },
  ],
} as const;
const tokenWalletUpgradeableAbi = {
  ABIversion: 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    { name: 'constructor', inputs: [], outputs: [] },
    {
      name: 'supportsInterface',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'interfaceID', type: 'uint32' },
      ],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'platformCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'onDeployRetry',
      id: '0x15A038FB',
      inputs: [
        { name: 'value0', type: 'cell' },
        { name: 'value1', type: 'uint32' },
        { name: 'sender', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'version',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint32' }],
    },
    {
      name: 'upgrade',
      inputs: [{ name: 'remainingGasTo', type: 'address' }],
      outputs: [],
    },
    {
      name: 'acceptUpgrade',
      inputs: [
        { name: 'newCode', type: 'cell' },
        { name: 'newVersion', type: 'uint32' },
        { name: 'remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'burnByRoot',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'callbackTo', type: 'address' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'destroy',
      inputs: [{ name: 'remainingGasTo', type: 'address' }],
      outputs: [],
    },
    {
      name: 'burn',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'callbackTo', type: 'address' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'balance',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint128' }],
    },
    {
      name: 'owner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'root',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'walletCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'transfer',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'recipient', type: 'address' },
        { name: 'deployWalletValue', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'transferToWallet',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'recipientTokenWallet', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'acceptTransfer',
      id: '0x67A0B95F',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'sender', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'acceptMint',
      id: '0x4384F298',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'sendSurplusGas',
      inputs: [{ name: 'to', type: 'address' }],
      outputs: [],
    },
  ],
  data: [
    { key: 1, name: 'root_', type: 'address' },
    { key: 2, name: 'owner_', type: 'address' },
  ],
  events: [],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'root_', type: 'address' },
    { name: 'owner_', type: 'address' },
    { name: 'balance_', type: 'uint128' },
    { name: 'version_', type: 'uint32' },
    { name: 'platformCode_', type: 'cell' },
  ],
} as const;
const dexRootAbi = {
  ABIversion: 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [
        { name: 'initial_owner', type: 'address' },
        { name: 'initial_vault', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'getAccountVersion',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint32' }],
    },
    {
      name: 'getAccountCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'getPairVersion',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'pool_type', type: 'uint8' },
      ],
      outputs: [{ name: 'value0', type: 'uint32' }],
    },
    {
      name: 'getPoolVersion',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'pool_type', type: 'uint8' },
      ],
      outputs: [{ name: 'value0', type: 'uint32' }],
    },
    {
      name: 'getPairCode',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'pool_type', type: 'uint8' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'getPoolCode',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'pool_type', type: 'uint8' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'getVault',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'getTokenVaultCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'getTokenVaultVersion',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint32' }],
    },
    {
      name: 'getLpTokenPendingCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'getLpTokenPendingVersion',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint32' }],
    },
    {
      name: 'getTokenFactory',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'isActive',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'getOwner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'dex_owner', type: 'address' }],
    },
    {
      name: 'getPendingOwner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'dex_pending_owner', type: 'address' }],
    },
    {
      name: 'getExpectedAccountAddress',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'account_owner', type: 'address' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'getExpectedPairAddress',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'left_root', type: 'address' },
        { name: 'right_root', type: 'address' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'getExpectedPoolAddress',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: '_roots', type: 'address[]' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'getExpectedTokenVaultAddress',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: '_tokenRoot', type: 'address' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'getManager',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'setVaultOnce',
      inputs: [{ name: 'new_vault', type: 'address' }],
      outputs: [],
    },
    {
      name: 'setActive',
      inputs: [{ name: 'new_active', type: 'bool' }],
      outputs: [],
    },
    {
      name: 'setManager',
      inputs: [{ name: '_newManager', type: 'address' }],
      outputs: [],
    },
    { name: 'revokeManager', inputs: [], outputs: [] },
    {
      name: 'transferOwner',
      inputs: [{ name: 'new_owner', type: 'address' }],
      outputs: [],
    },
    { name: 'acceptOwner', inputs: [], outputs: [] },
    {
      name: 'setTokenFactory',
      inputs: [
        { name: '_newTokenFactory', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'installPlatformOnce',
      inputs: [{ name: 'code', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'installOrUpdateAccountCode',
      inputs: [{ name: 'code', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'installOrUpdatePairCode',
      inputs: [
        { name: 'code', type: 'cell' },
        { name: 'pool_type', type: 'uint8' },
      ],
      outputs: [],
    },
    {
      name: 'installOrUpdatePoolCode',
      inputs: [
        { name: 'code', type: 'cell' },
        { name: 'pool_type', type: 'uint8' },
      ],
      outputs: [],
    },
    {
      name: 'installOrUpdateTokenVaultCode',
      inputs: [
        { name: '_newCode', type: 'cell' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'installOrUpdateLpTokenPendingCode',
      inputs: [
        { name: '_newCode', type: 'cell' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    { name: 'upgrade', inputs: [{ name: 'code', type: 'cell' }], outputs: [] },
    {
      name: 'resetGas',
      inputs: [{ name: 'receiver', type: 'address' }],
      outputs: [],
    },
    {
      name: 'deployTokenVault',
      inputs: [
        { name: '_tokenRoot', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'onTokenVaultDeployed',
      inputs: [
        { name: '_version', type: 'uint32' },
        { name: '_tokenRoot', type: 'address' },
        { name: '_tokenWallet', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'deployLpToken',
      inputs: [
        { name: '_tokenRoots', type: 'address[]' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'onLiquidityTokenDeployed',
      inputs: [
        { name: '_lpPendingNonce', type: 'uint32' },
        { name: '_pool', type: 'address' },
        { name: '_roots', type: 'address[]' },
        { name: '_lpRoot', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'onLiquidityTokenNotDeployed',
      inputs: [
        { name: '_lpPendingNonce', type: 'uint32' },
        { name: '_pool', type: 'address' },
        { name: '_roots', type: 'address[]' },
        { name: '_lpRoot', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'upgradeTokenVault',
      inputs: [
        { name: '_tokenRoot', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'upgradeTokenVaults',
      inputs: [
        { name: '_tokenRoots', type: 'address[]' },
        { name: '_offset', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'deployAccount',
      inputs: [
        { name: 'account_owner', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'requestUpgradeAccount',
      inputs: [
        { name: 'current_version', type: 'uint32' },
        { name: 'send_gas_to', type: 'address' },
        { name: 'account_owner', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'forceUpgradeAccount',
      inputs: [
        { name: 'account_owner', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'upgradeAccounts',
      inputs: [
        { name: '_accountsOwners', type: 'address[]' },
        { name: '_offset', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'upgradePair',
      inputs: [
        { name: 'left_root', type: 'address' },
        { name: 'right_root', type: 'address' },
        { name: 'pool_type', type: 'uint8' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'upgradePool',
      inputs: [
        { name: 'roots', type: 'address[]' },
        { name: 'pool_type', type: 'uint8' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'upgradePools',
      inputs: [
        {
          components: [
            { name: 'tokenRoots', type: 'address[]' },
            { name: 'poolType', type: 'uint8' },
          ],
          name: '_params',
          type: 'tuple[]',
        },
        { name: '_offset', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'setPoolActive',
      inputs: [
        {
          components: [
            { name: 'tokenRoots', type: 'address[]' },
            { name: 'newActive', type: 'bool' },
          ],
          name: '_param',
          type: 'tuple',
        },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'setPoolsActive',
      inputs: [
        {
          components: [
            { name: 'tokenRoots', type: 'address[]' },
            { name: 'newActive', type: 'bool' },
          ],
          name: '_params',
          type: 'tuple[]',
        },
        { name: '_offset', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'deployPair',
      inputs: [
        { name: 'left_root', type: 'address' },
        { name: 'right_root', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'batchPairDeploy',
      inputs: [
        { name: '_iter', type: 'uint8' },
        {
          components: [
            { name: 'left_root', type: 'address' },
            { name: 'right_root', type: 'address' },
          ],
          name: '_infos',
          type: 'tuple[]',
        },
        { name: '_offset', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'deployStablePool',
      inputs: [
        { name: 'roots', type: 'address[]' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'setPairFeeParams',
      inputs: [
        { name: '_roots', type: 'address[]' },
        {
          components: [
            { name: 'denominator', type: 'uint128' },
            { name: 'pool_numerator', type: 'uint128' },
            { name: 'beneficiary_numerator', type: 'uint128' },
            { name: 'referrer_numerator', type: 'uint128' },
            { name: 'beneficiary', type: 'address' },
            { name: 'threshold', type: 'map(address,uint128)' },
            { name: 'referrer_threshold', type: 'map(address,uint128)' },
          ],
          name: '_params',
          type: 'tuple',
        },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'setPairAmplificationCoefficient',
      inputs: [
        { name: '_roots', type: 'address[]' },
        {
          components: [
            { name: 'value', type: 'uint128' },
            { name: 'precision', type: 'uint128' },
          ],
          name: '_A',
          type: 'tuple',
        },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'resetTargetGas',
      inputs: [
        { name: 'target', type: 'address' },
        { name: 'receiver', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'onPoolCreated',
      inputs: [
        { name: '_roots', type: 'address[]' },
        { name: '_poolType', type: 'uint8' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'setOracleOptions',
      inputs: [
        { name: '_leftRoot', type: 'address' },
        { name: '_rightRoot', type: 'address' },
        {
          components: [
            { name: 'minInterval', type: 'uint8' },
            { name: 'minRateDeltaNumerator', type: 'uint128' },
            { name: 'minRateDeltaDenominator', type: 'uint128' },
            { name: 'cardinality', type: 'uint16' },
          ],
          name: '_options',
          type: 'tuple',
        },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'removeLastNPoints',
      inputs: [
        { name: '_leftRoot', type: 'address' },
        { name: '_rightRoot', type: 'address' },
        { name: '_count', type: 'uint16' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'platform_code',
      inputs: [],
      outputs: [{ name: 'platform_code', type: 'cell' }],
    },
  ],
  data: [{ key: 1, name: '_nonce', type: 'uint32' }],
  events: [
    {
      name: 'PairDeployed',
      inputs: [
        { name: 'pair', type: 'address' },
        { name: 'leftRoot', type: 'address' },
        { name: 'rightRoot', type: 'address' },
        { name: 'iter', type: 'uint8' },
      ],
      outputs: [],
    },
    {
      name: 'AccountCodeUpgraded',
      inputs: [{ name: 'version', type: 'uint32' }],
      outputs: [],
    },
    {
      name: 'PairCodeUpgraded',
      inputs: [
        { name: 'version', type: 'uint32' },
        { name: 'poolType', type: 'uint8' },
      ],
      outputs: [],
    },
    {
      name: 'PoolCodeUpgraded',
      inputs: [
        { name: 'version', type: 'uint32' },
        { name: 'poolType', type: 'uint8' },
      ],
      outputs: [],
    },
    {
      name: 'TokenVaultCodeUpgraded',
      inputs: [
        { name: 'version', type: 'uint32' },
        { name: 'codeHash', type: 'uint256' },
      ],
      outputs: [],
    },
    {
      name: 'LpTokenPendingCodeUpgraded',
      inputs: [
        { name: 'version', type: 'uint32' },
        { name: 'codeHash', type: 'uint256' },
      ],
      outputs: [],
    },
    {
      name: 'TokenFactoryUpdated',
      inputs: [
        { name: 'current', type: 'address' },
        { name: 'previous', type: 'address' },
      ],
      outputs: [],
    },
    { name: 'RootCodeUpgraded', inputs: [], outputs: [] },
    {
      name: 'ActiveUpdated',
      inputs: [{ name: 'newActive', type: 'bool' }],
      outputs: [],
    },
    {
      name: 'RequestedPoolUpgrade',
      inputs: [{ name: 'roots', type: 'address[]' }],
      outputs: [],
    },
    {
      name: 'RequestedForceAccountUpgrade',
      inputs: [{ name: 'accountOwner', type: 'address' }],
      outputs: [],
    },
    {
      name: 'RequestedOwnerTransfer',
      inputs: [
        { name: 'oldOwner', type: 'address' },
        { name: 'newOwner', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'OwnerTransferAccepted',
      inputs: [
        { name: 'oldOwner', type: 'address' },
        { name: 'newOwner', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'NewPoolCreated',
      inputs: [
        { name: 'roots', type: 'address[]' },
        { name: 'poolType', type: 'uint8' },
      ],
      outputs: [],
    },
    {
      name: 'NewTokenVaultCreated',
      inputs: [
        { name: 'vault', type: 'address' },
        { name: 'tokenRoot', type: 'address' },
        { name: 'tokenWallet', type: 'address' },
        { name: 'version', type: 'uint32' },
      ],
      outputs: [],
    },
    {
      name: 'NewLpTokenRootCreated',
      inputs: [
        { name: 'pool', type: 'address' },
        { name: 'poolTokenRoots', type: 'address[]' },
        { name: 'lpTokenRoot', type: 'address' },
        { name: 'lpPendingNonce', type: 'uint32' },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'platform_code', type: 'cell' },
    { name: '_nonce', type: 'uint32' },
    { name: '_accountCode', type: 'cell' },
    { name: '_accountVersion', type: 'uint32' },
    { name: '_pairCodes', type: 'map(uint8,cell)' },
    { name: '_pairVersions', type: 'map(uint8,uint32)' },
    { name: '_poolCodes', type: 'map(uint8,cell)' },
    { name: '_poolVersions', type: 'map(uint8,uint32)' },
    { name: '_vaultCode', type: 'cell' },
    { name: '_vaultVersion', type: 'uint32' },
    { name: '_lpTokenPendingCode', type: 'cell' },
    { name: '_lpTokenPendingVersion', type: 'uint32' },
    { name: '_tokenFactory', type: 'address' },
    { name: '_active', type: 'bool' },
    { name: '_owner', type: 'address' },
    { name: '_vault', type: 'address' },
    { name: '_pendingOwner', type: 'address' },
    { name: '_manager', type: 'address' },
  ],
} as const;
const tokenFactoryAbi = {
  ABIversion: 2,
  version: '2.2',
  header: ['time'],
  functions: [
    {
      name: 'constructor',
      inputs: [{ name: '_owner', type: 'address' }],
      outputs: [],
    },
    {
      name: 'owner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'pendingOwner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'rootCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'walletCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'walletPlatformCode',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'createToken',
      inputs: [
        { name: 'callId', type: 'uint32' },
        { name: 'name', type: 'string' },
        { name: 'symbol', type: 'string' },
        { name: 'decimals', type: 'uint8' },
        { name: 'initialSupplyTo', type: 'address' },
        { name: 'initialSupply', type: 'uint128' },
        { name: 'deployWalletValue', type: 'uint128' },
        { name: 'mintDisabled', type: 'bool' },
        { name: 'burnByRootDisabled', type: 'bool' },
        { name: 'burnPaused', type: 'bool' },
        { name: 'remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'transferOwner',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'newOwner', type: 'address' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'acceptOwner',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'setRootCode',
      inputs: [{ name: '_rootCode', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'setWalletCode',
      inputs: [{ name: '_walletCode', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'setWalletPlatformCode',
      inputs: [{ name: '_walletPlatformCode', type: 'cell' }],
      outputs: [],
    },
    { name: 'upgrade', inputs: [{ name: 'code', type: 'cell' }], outputs: [] },
  ],
  data: [{ key: 1, name: 'randomNonce_', type: 'uint32' }],
  events: [
    {
      name: 'TokenCreated',
      inputs: [{ name: 'tokenRoot', type: 'address' }],
      outputs: [],
    },
  ],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'randomNonce_', type: 'uint32' },
    { name: 'owner_', type: 'address' },
    { name: 'pendingOwner_', type: 'address' },
    { name: 'rootCode_', type: 'cell' },
    { name: 'walletCode_', type: 'cell' },
    { name: 'walletPlatformCode_', type: 'cell' },
  ],
} as const;
const dexPairAbi = {
  ABIversion: 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    { name: 'constructor', inputs: [], outputs: [] },
    {
      name: 'buildExchangePayload',
      inputs: [
        { name: 'id', type: 'uint64' },
        { name: 'deploy_wallet_grams', type: 'uint128' },
        { name: 'expected_amount', type: 'uint128' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildExchangePayloadV2',
      inputs: [
        { name: '_id', type: 'uint64' },
        { name: '_deployWalletGrams', type: 'uint128' },
        { name: '_expectedAmount', type: 'uint128' },
        { name: '_recipient', type: 'address' },
        { name: '_referrer', type: 'address' },
        { name: '_successPayload', type: 'optional(cell)' },
        { name: '_cancelPayload', type: 'optional(cell)' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildDepositLiquidityPayload',
      inputs: [
        { name: 'id', type: 'uint64' },
        { name: 'deploy_wallet_grams', type: 'uint128' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildDepositLiquidityPayloadV2',
      inputs: [
        { name: '_id', type: 'uint64' },
        { name: '_deployWalletGrams', type: 'uint128' },
        { name: '_expectedAmount', type: 'uint128' },
        { name: '_recipient', type: 'address' },
        { name: '_referrer', type: 'address' },
        { name: '_successPayload', type: 'optional(cell)' },
        { name: '_cancelPayload', type: 'optional(cell)' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildWithdrawLiquidityPayload',
      inputs: [
        { name: 'id', type: 'uint64' },
        { name: 'deploy_wallet_grams', type: 'uint128' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildWithdrawLiquidityPayloadV2',
      inputs: [
        { name: '_id', type: 'uint64' },
        { name: '_deployWalletGrams', type: 'uint128' },
        { name: '_expectedLeftAmount', type: 'uint128' },
        { name: '_expectedRightAmount', type: 'uint128' },
        { name: '_recipient', type: 'address' },
        { name: '_referrer', type: 'address' },
        { name: '_successPayload', type: 'optional(cell)' },
        { name: '_cancelPayload', type: 'optional(cell)' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildCrossPairExchangePayload',
      inputs: [
        { name: 'id', type: 'uint64' },
        { name: 'deploy_wallet_grams', type: 'uint128' },
        { name: 'expected_amount', type: 'uint128' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: 'steps',
          type: 'tuple[]',
        },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildCrossPairExchangePayloadV2',
      inputs: [
        { name: '_id', type: 'uint64' },
        { name: '_deployWalletGrams', type: 'uint128' },
        { name: '_expectedAmount', type: 'uint128' },
        { name: '_outcoming', type: 'address' },
        { name: '_nextStepIndices', type: 'uint32[]' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'roots', type: 'address[]' },
            { name: 'outcoming', type: 'address' },
            { name: 'numerator', type: 'uint128' },
            { name: 'nextStepIndices', type: 'uint32[]' },
          ],
          name: '_steps',
          type: 'tuple[]',
        },
        { name: '_recipient', type: 'address' },
        { name: '_referrer', type: 'address' },
        { name: '_successPayload', type: 'optional(cell)' },
        { name: '_cancelPayload', type: 'optional(cell)' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'expectedDepositLiquidity',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'left_amount', type: 'uint128' },
        { name: 'right_amount', type: 'uint128' },
        { name: 'auto_change', type: 'bool' },
      ],
      outputs: [
        {
          components: [
            { name: 'step_1_left_deposit', type: 'uint128' },
            { name: 'step_1_right_deposit', type: 'uint128' },
            { name: 'step_1_lp_reward', type: 'uint128' },
            { name: 'step_2_left_to_right', type: 'bool' },
            { name: 'step_2_right_to_left', type: 'bool' },
            { name: 'step_2_spent', type: 'uint128' },
            { name: 'step_2_fee', type: 'uint128' },
            { name: 'step_2_received', type: 'uint128' },
            { name: 'step_3_left_deposit', type: 'uint128' },
            { name: 'step_3_right_deposit', type: 'uint128' },
            { name: 'step_3_lp_reward', type: 'uint128' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
    },
    {
      name: 'depositLiquidity',
      inputs: [
        { name: '_callId', type: 'uint64' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: '_operations',
          type: 'tuple[]',
        },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: '_expected',
          type: 'tuple',
        },
        { name: '_autoChange', type: 'bool' },
        { name: '_accountOwner', type: 'address' },
        { name: 'value5', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
        { name: '_referrer', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'expectedWithdrawLiquidity',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'lp_amount', type: 'uint128' },
      ],
      outputs: [
        { name: 'expected_left_amount', type: 'uint128' },
        { name: 'expected_right_amount', type: 'uint128' },
      ],
    },
    {
      name: 'withdrawLiquidity',
      inputs: [
        { name: '_callId', type: 'uint64' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: '_operation',
          type: 'tuple',
        },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: '_expected',
          type: 'tuple[]',
        },
        { name: '_accountOwner', type: 'address' },
        { name: 'value4', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'expectedExchange',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'amount', type: 'uint128' },
        { name: 'spent_token_root', type: 'address' },
      ],
      outputs: [
        { name: 'expected_amount', type: 'uint128' },
        { name: 'expected_fee', type: 'uint128' },
      ],
    },
    {
      name: 'expectedSpendAmount',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'receive_amount', type: 'uint128' },
        { name: 'receive_token_root', type: 'address' },
      ],
      outputs: [
        { name: 'expected_amount', type: 'uint128' },
        { name: 'expected_fee', type: 'uint128' },
      ],
    },
    {
      name: 'exchange',
      inputs: [
        { name: '_callId', type: 'uint64' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: '_operation',
          type: 'tuple',
        },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: '_expected',
          type: 'tuple',
        },
        { name: '_accountOwner', type: 'address' },
        { name: 'value4', type: 'uint32' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'crossPoolExchange',
      inputs: [
        { name: '_id', type: 'uint64' },
        { name: 'value1', type: 'uint32' },
        { name: 'value2', type: 'uint8' },
        { name: '_prevPoolTokenRoots', type: 'address[]' },
        { name: '_op', type: 'uint8' },
        { name: '_spentTokenRoot', type: 'address' },
        { name: '_spentAmount', type: 'uint128' },
        { name: '_senderAddress', type: 'address' },
        { name: '_recipient', type: 'address' },
        { name: '_referrer', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
        { name: '_deployWalletGrams', type: 'uint128' },
        { name: '_payload', type: 'cell' },
        { name: '_notifySuccess', type: 'bool' },
        { name: '_successPayload', type: 'cell' },
        { name: '_notifyCancel', type: 'bool' },
        { name: '_cancelPayload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'onAcceptTokensTransfer',
      inputs: [
        { name: '_tokenRoot', type: 'address' },
        { name: '_tokensAmount', type: 'uint128' },
        { name: '_senderAddress', type: 'address' },
        { name: '_senderWallet', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
        { name: '_payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'getRoot',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'dex_root', type: 'address' }],
    },
    {
      name: 'getTokenRoots',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        { name: 'left', type: 'address' },
        { name: 'right', type: 'address' },
        { name: 'lp', type: 'address' },
      ],
    },
    {
      name: 'getTokenWallets',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        { name: 'left', type: 'address' },
        { name: 'right', type: 'address' },
        { name: 'lp', type: 'address' },
      ],
    },
    {
      name: 'getVersion',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'version', type: 'uint32' }],
    },
    {
      name: 'getVault',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'getPoolType',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint8' }],
    },
    {
      name: 'getFeeParams',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        {
          components: [
            { name: 'denominator', type: 'uint128' },
            { name: 'pool_numerator', type: 'uint128' },
            { name: 'beneficiary_numerator', type: 'uint128' },
            { name: 'referrer_numerator', type: 'uint128' },
            { name: 'beneficiary', type: 'address' },
            { name: 'threshold', type: 'map(address,uint128)' },
            { name: 'referrer_threshold', type: 'map(address,uint128)' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
    },
    {
      name: 'getAccumulatedFees',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'accumulatedFees', type: 'uint128[]' }],
    },
    {
      name: 'isActive',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'getBalances',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        {
          components: [
            { name: 'lp_supply', type: 'uint128' },
            { name: 'left_balance', type: 'uint128' },
            { name: 'right_balance', type: 'uint128' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
    },
    {
      name: 'setFeeParams',
      inputs: [
        {
          components: [
            { name: 'denominator', type: 'uint128' },
            { name: 'pool_numerator', type: 'uint128' },
            { name: 'beneficiary_numerator', type: 'uint128' },
            { name: 'referrer_numerator', type: 'uint128' },
            { name: 'beneficiary', type: 'address' },
            { name: 'threshold', type: 'map(address,uint128)' },
            { name: 'referrer_threshold', type: 'map(address,uint128)' },
          ],
          name: '_params',
          type: 'tuple',
        },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'withdrawBeneficiaryFee',
      inputs: [{ name: 'send_gas_to', type: 'address' }],
      outputs: [],
    },
    {
      name: 'checkPair',
      inputs: [
        { name: '_accountOwner', type: 'address' },
        { name: 'value1', type: 'uint32' },
      ],
      outputs: [],
    },
    {
      name: 'upgrade',
      inputs: [
        { name: '_code', type: 'cell' },
        { name: '_newVersion', type: 'uint32' },
        { name: '_newType', type: 'uint8' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'liquidityTokenRootDeployed',
      inputs: [
        { name: '_lpRootAddress', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'liquidityTokenRootNotDeployed',
      inputs: [
        { name: 'value0', type: 'address' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'onTokenWallet',
      inputs: [{ name: '_wallet', type: 'address' }],
      outputs: [],
    },
    {
      name: 'setActive',
      inputs: [
        { name: '_newActive', type: 'bool' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'setOracleOptions',
      inputs: [
        {
          components: [
            { name: 'minInterval', type: 'uint8' },
            { name: 'minRateDeltaNumerator', type: 'uint128' },
            { name: 'minRateDeltaDenominator', type: 'uint128' },
            { name: 'cardinality', type: 'uint16' },
          ],
          name: '_newOptions',
          type: 'tuple',
        },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'getOracleOptions',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        {
          components: [
            { name: 'minInterval', type: 'uint8' },
            { name: 'minRateDeltaNumerator', type: 'uint128' },
            { name: 'minRateDeltaDenominator', type: 'uint128' },
            { name: 'cardinality', type: 'uint16' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
    },
    {
      name: 'removeLastNPoints',
      inputs: [
        { name: '_count', type: 'uint16' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'getObservation',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: '_timestamp', type: 'uint32' },
      ],
      outputs: [
        {
          components: [
            { name: 'timestamp', type: 'uint32' },
            { name: 'price0To1Cumulative', type: 'uint256' },
            { name: 'price1To0Cumulative', type: 'uint256' },
          ],
          name: 'value0',
          type: 'optional(tuple)',
        },
      ],
    },
    {
      name: 'observation',
      inputs: [
        { name: '_timestamp', type: 'uint32' },
        { name: '_callbackTo', type: 'address' },
        { name: '_payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'getRate',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: '_fromTimestamp', type: 'uint32' },
        { name: '_toTimestamp', type: 'uint32' },
      ],
      outputs: [
        {
          components: [
            { name: 'price0To1', type: 'uint256' },
            { name: 'price1To0', type: 'uint256' },
            { name: 'fromTimestamp', type: 'uint32' },
            { name: 'toTimestamp', type: 'uint32' },
          ],
          name: 'value0',
          type: 'optional(tuple)',
        },
        { name: 'value1', type: 'uint128[]' },
      ],
    },
    {
      name: 'rate',
      inputs: [
        { name: '_fromTimestamp', type: 'uint32' },
        { name: '_toTimestamp', type: 'uint32' },
        { name: '_callbackTo', type: 'address' },
        { name: '_payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'getExpectedAmountByTWAP',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: '_amount', type: 'uint128' },
        { name: '_tokenRoot', type: 'address' },
        { name: '_fromTimestamp', type: 'uint32' },
        { name: '_toTimestamp', type: 'uint32' },
      ],
      outputs: [{ name: 'value0', type: 'uint128' }],
    },
    {
      name: 'platform_code',
      inputs: [],
      outputs: [{ name: 'platform_code', type: 'cell' }],
    },
  ],
  data: [],
  events: [
    {
      name: 'OracleInitialized',
      inputs: [
        {
          components: [
            { name: 'timestamp', type: 'uint32' },
            { name: 'price0To1Cumulative', type: 'uint256' },
            { name: 'price1To0Cumulative', type: 'uint256' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'OracleUpdated',
      inputs: [
        {
          components: [
            { name: 'timestamp', type: 'uint32' },
            { name: 'price0To1Cumulative', type: 'uint256' },
            { name: 'price1To0Cumulative', type: 'uint256' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'OracleOptionsUpdated',
      inputs: [
        {
          components: [
            { name: 'minInterval', type: 'uint8' },
            { name: 'minRateDeltaNumerator', type: 'uint128' },
            { name: 'minRateDeltaDenominator', type: 'uint128' },
            { name: 'cardinality', type: 'uint16' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'PairCodeUpgraded',
      inputs: [
        { name: 'version', type: 'uint32' },
        { name: 'pool_type', type: 'uint8' },
      ],
      outputs: [],
    },
    {
      name: 'ActiveStatusUpdated',
      inputs: [
        { name: 'current', type: 'bool' },
        { name: 'previous', type: 'bool' },
      ],
      outputs: [],
    },
    {
      name: 'FeesParamsUpdated',
      inputs: [
        {
          components: [
            { name: 'denominator', type: 'uint128' },
            { name: 'pool_numerator', type: 'uint128' },
            { name: 'beneficiary_numerator', type: 'uint128' },
            { name: 'referrer_numerator', type: 'uint128' },
            { name: 'beneficiary', type: 'address' },
            { name: 'threshold', type: 'map(address,uint128)' },
            { name: 'referrer_threshold', type: 'map(address,uint128)' },
          ],
          name: 'params',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'DepositLiquidity',
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'owner', type: 'address' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: 'tokens',
          type: 'tuple[]',
        },
        { name: 'lp', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'WithdrawLiquidity',
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'owner', type: 'address' },
        { name: 'lp', type: 'uint128' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: 'tokens',
          type: 'tuple[]',
        },
      ],
      outputs: [],
    },
    {
      name: 'Exchange',
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'recipient', type: 'address' },
        { name: 'spentTokenRoot', type: 'address' },
        { name: 'spentAmount', type: 'uint128' },
        { name: 'receiveTokenRoot', type: 'address' },
        { name: 'receiveAmount', type: 'uint128' },
        {
          components: [
            { name: 'feeTokenRoot', type: 'address' },
            { name: 'pool_fee', type: 'uint128' },
            { name: 'beneficiary_fee', type: 'uint128' },
            { name: 'beneficiary', type: 'address' },
          ],
          name: 'fees',
          type: 'tuple[]',
        },
      ],
      outputs: [],
    },
    {
      name: 'ReferrerFees',
      inputs: [
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: 'fees',
          type: 'tuple[]',
        },
      ],
      outputs: [],
    },
    {
      name: 'Sync',
      inputs: [
        { name: 'reserves', type: 'uint128[]' },
        { name: 'lp_supply', type: 'uint128' },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'platform_code', type: 'cell' },
    {
      components: [
        { name: 'price0To1Cumulative', type: 'uint256' },
        { name: 'price1To0Cumulative', type: 'uint256' },
      ],
      name: '_points',
      type: 'map(uint32,tuple)',
    },
    { name: '_length', type: 'uint16' },
    {
      components: [
        { name: 'minInterval', type: 'uint8' },
        { name: 'minRateDeltaNumerator', type: 'uint128' },
        { name: 'minRateDeltaDenominator', type: 'uint128' },
        { name: 'cardinality', type: 'uint16' },
      ],
      name: '_options',
      type: 'tuple',
    },
    { name: '_root', type: 'address' },
    { name: '_vault', type: 'address' },
    { name: '_active', type: 'bool' },
    { name: '_currentVersion', type: 'uint32' },
    {
      components: [
        { name: 'denominator', type: 'uint128' },
        { name: 'pool_numerator', type: 'uint128' },
        { name: 'beneficiary_numerator', type: 'uint128' },
        { name: 'referrer_numerator', type: 'uint128' },
        { name: 'beneficiary', type: 'address' },
        { name: 'threshold', type: 'map(address,uint128)' },
        { name: 'referrer_threshold', type: 'map(address,uint128)' },
      ],
      name: '_fee',
      type: 'tuple',
    },
    { name: '_typeToRootAddresses', type: 'map(uint8,address[])' },
    { name: '_typeToWalletAddresses', type: 'map(uint8,address[])' },
    { name: '_typeToReserves', type: 'map(uint8,uint128[])' },
  ],
} as const;

export const factorySource = {
  BatchExecutor: batchExecutorAbi,
  CustomTokenRoot: customTokenRootAbi,
  TokenWalletUpgradeable: tokenWalletUpgradeableAbi,
  DexRoot: dexRootAbi,
  TokenFactory: tokenFactoryAbi,
  DexPair: dexPairAbi,
} as const;

export type FactorySource = typeof factorySource;
export type BatchExecutorAbi = typeof batchExecutorAbi;
export type CustomTokenRootAbi = typeof customTokenRootAbi;
export type TokenWalletUpgradeableAbi = typeof tokenWalletUpgradeableAbi;
export type DexRootAbi = typeof dexRootAbi;
export type TokenFactoryAbi = typeof tokenFactoryAbi;
export type DexPairAbi = typeof dexPairAbi;
