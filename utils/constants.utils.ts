// COUNTS

export const EVER_WALLETS_COUNT = +(process.env.EVER_WALLETS_COUNT || 10000);
export const TEST_TOKENS_COUNT = +(process.env.TEST_TOKENS_COUNT || 50);

// PROGRESS BAR FORMATS

export const EVER_WALLETS_DEPLOY_PROGRESS_BAR_FORMAT =
  'Deploying wallets: {bar} {percentage}% | Duration: {duration}s | {value}/{total}';
export const TOKENS_DEPLOY_PROGRESS_BAR_FORMAT =
  'Deploying tokens: {bar} {percentage}% | Duration: {duration}s | {value}/{total}';
export const TOKEN_WALLETS_DEPLOY_PROGRESS_BAR_FORMAT =
  'Deploying token wallets: {bar} {percentage}% | Duration: {duration}s | {value}/{total}';
export const PAIRS_DEPLOY_PROGRESS_BAR_FORMAT =
  'Deploying pairs: {bar} {percentage}% | Duration: {duration}s | {value}/{total}';
export const EVER_WALLETS_CHECK_PROGRESS_BAR_FORMAT =
  'Checking wallets: {bar} {percentage}% | Duration: {duration}s | {value}/{total}';
export const TOKEN_WALLETS_CHECK_PROGRESS_BAR_FORMAT =
  'Checking token wallets: {bar} {percentage}% | Duration: {duration}s | {value}/{total}';
export const PAIRS_CHECK_PROGRESS_BAR_FORMAT =
  'Checking pairs: {bar} {percentage}% | Duration: {duration}s | {value}/{total}';
export const TOKEN_VAULTS_CHECK_PROGRESS_BAR_FORMAT =
  'Checking token vaults: {bar} {percentage}% | Duration: {duration}s | {value}/{total}';

// CODES

export const EverWalletCode =
  'te6ccgEBBgEA/AABFP8A9KQT9LzyyAsBAgEgBQIC5vJx1wEBwADyeoMI1xjtRNCDB9cB1ws/yPgozxYjzxbJ+QADcdcBAcMAmoMH1wFRE7ry4GTegEDXAYAg1wGAINcBVBZ1+RDyqPgju/J5Zr74I4EHCKCBA+ioUiC8sfJ0AiCCEEzuZGy64w8ByMv/yz/J7VQEAwA+ghAWnj4Ruo4R+AACkyDXSpd41wHUAvsA6NGTMvI84gCYMALXTND6QIMG1wFx1wF41wHXTPgAcIAQBKoCFLHIywVQBc8WUAP6AstpItAhzzEh10mghAm5mDNwAcsAWM8WlzBxAcsAEsziyQH7AAAE0jA=';
export const TokenWalletPlatformCode =
  'te6ccgECGAEAAmwAAgaK2zUXAQQkiu1TIOMDIMD/4wIgwP7jAvILEwQDAgAAA4rtRNDXScMB+GaJ+Gkh2zzTAAGfgQIA1xgg+QFY+EL5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAds88jwRDQUDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8EhIFARQgghAVoDj7uuMCBgSQMPhCbuMA+EbycyGW1NMf1NHQk9TTH+L6QNTR0PpA0fhJ+ErHBSCOgN+OgI4UIMjPhQjOgG/PQMmBAICmILUH+wDiXwTbPPIADQoHFgEIXSLbPAgCfPhKyM74SwHOcAHLf3AByx8Syx/O+EGIyM+OK2zWzM7JAcwh+wQB0CCLOK2zWMcFk9dN0N7XTNDtHu1Tyds8FwkABPACAR4wIfpCbxPXC//DACCOgN4LARAwIds8+EnHBQwBfnDIy/9wbYBA9EP4SnFYgED0FgFyWIBA9BbI9ADJ+EGIyM+OK2zWzM7JyM+EgPQA9ADPgcn5AMjPigBAy//J0BcCFu1E0NdJwgGOgOMNDw4ANO1E0NP/0z/TADH6QNTR0PpA0fhr+Gr4Y/hiAlRw7UTQ9AVxIYBA9A6OgN9yIoBA9A6OgN/4a/hqgED0DvK91wv/+GJw+GMQEAECiREAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAACvhG8uBMAgr0pCD0oRUUABRzb2wgMC41Ny4xARigAAAAAjDbPPgP8gAWACz4SvhD+ELIy//LP8+DzvhLyM7Nye1UAAwg+GHtHtk=';
export const DexTokenVaultCode =
  'te6ccgECawEAE5QABCSK7VMg4wMgwP/jAiDA/uMC8gtVAgFqBL7tRNDXScMB+GaJ+Gkh2zzTAAGOGYMI1xgg+QEB0wABlNP/AwGTAvhC4vkQ8qiV0wAB8nri0z8B+EMhufK0IPgjgQPoqIIIG3dAoLnytPhj0x8B+CO88rnTHwHbPFvbPGkgBFEEau1E0NdJwwH4ZiLQ0wP6QDD4aak4APhEf29xggiYloBvcm1vc3BvdPhk4wIhxwAgjoDf4wIBUk9OAwIK2zxb2zwEUQIoIIIQaLVfP7vjAiCCEH1zW/a74wIdBQIoIIIQep7eK7rjAiCCEH1zW/a64wIIBgPYMPhG8uBM+EJu4wDTH/hEWG91+GTR2zwhjhoj0NMB+kAwMcjPhyDOghD9c1v2zwuBy3/JcI4v+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ACAas9A+ERvFc8LH8t/yfhEbxTi+wDjAPIAVAdTASD4RHBvcoBAb3Rwb3H4ZNs8ZgNGMPhG8uBM+EJu4wAhk9TR0N76QNN/1NHQ+kDU0ds8MNs88gBUCVoE8ts8IHD7AvhP+kJvE9cL/8MA+En4T8cFsPLgkVUwINB5IdQzINDTP9Mf0wfTH/QEWW8CAfpA1NHQ+kDU0dD6QNN/0x/0BFlvAgHRiFMM10rCAC7XSsIBIZUv1FcRNN4glS/UVxEz3nBTCts8J28QtR9wXzCVUwxvELlmakUKBESOgOMYMCbAACCOgN6TgGc33ibAACxvEMIAsI6AjoDigBxlGxgUCwFkK28QwAAgjiovVhJWHI0EcAAAAAAAAAAAAAAAABX14KOgyM7LfwFvIgLLH/QAzslw+wAMA/yOaVYUggiYloCmLLV/VhJwyM+FgMoAz4RAzgH6AoIQDAoZBs8Liss/yXGmArUH+wAvVhHHBY4zVhRWEHDIz4WAygDPhEDOgpgcxLQAAAAAAAAAAAAAAAAAAAwKGQbPC6bLP8lxpgK1B/sA3+IgjoCOgOIhkSqRKeJWG1YQVQMSDg0AYJJWEpJWE+JWHvhPyM+FiM5xzwtuVVDIz5HPiIUOy3/Oy39VIMjOygDMzc3Jgwb7AAEOVhZUeL3bPA8BViPAASTAAiXAAybABLGxsZMwbCHgyM+HJiTPCwdVAs8LDxLMWMAJjoDeyTEQAV4hbxBwceMEIm8RcG2OgJsgbxQkoLUfNCGkMuhfA8jLH8kBzMgibyICyx/0AMkBzBEBHFMSgCD0Dm+h4wAgMm6zHAEOVhYsVhLbPBMASiLAASPAAiTAAyXABLGxsZIwMeDIz4ciVQLPCwcSzAHIzskBzMkETmim/mAu2zzbPCWotX+htX9wggGGoG8C2zyhtX9wlVMNbxC5joDoWxlhYRUD/lMNbxGAIPQO8rLbPFYcIW8QKqmEtX8hbxRTR6mEtX9Ufs9WECZvElYWViNWGVYbVh1VCvhOViVWIVYjViVWJ1YTVha6b5COgN+AE2FvEcjPhYjOAfoCcc8LaoARYsjPkNFTjRbLP8sfywcBbyICyx/0AMsHzst/VZDIzlWAyM4cFxYASlVwyM5VYMjOy3/MygDMygDMzc3Nzc3JUyS6gwZx4wT7ADCktR8CKlYSbxOktR9WI9s82zyotX9WEqC1fxlhAzYwaKb+YC7bPNs8Jai1f3CCAYagbwLbPKC1f7kZYWEBfts8ggk0OkC1f4IQBfXhAKC1fyL6Qm8T1wv/b5GTIW8Q3qC1f4IIBJPgVQL6Qm8T1wv/b5GTIm8R3qC1f28CMRoAUIIImJaAgggPQkCgtX+CEAX14QCgtX+CAknwIKC1f4IIByvwoLV/bwIBsFMMbxGAIPQO8rLbPCBvEfpCbxPXC//AACFvESjHBSJvEMAAI28UwACxsbGWgG85MNsx4CBvEyS8liBvEzQhM94gbxAooDggbxMmoLUfNm8UJKC1HzSktR8cABjTf/pA1NMf0x/RbwUEUCCCECFFfMy74wIgghAxQSFfu+MCIIIQSysszrvjAiCCEGi1Xz+74wJANiweBFAgghBgPY29uuMCIIIQZKV4yLrjAiCCEGbUTfW64wIgghBotV8/uuMCJiMiHwEcMPhCbuMA+Ebyc9HywGQgAhbtRNDXScIBjoDjDSFUA1Jw7UTQ9AWIiSBwiV8g+HD4b/hu+G34bPhr+GqAQPQO8r3XC//4YnD4Y2ppaQFOMNHbPPhKIY4bjQRwAAAAAAAAAAAAAAAAObUTfWDIzszJcPsA3vIAVANEMPhG8uBM+EJu4wAhltTTH9TR0JPU0x/i+kDR2zww2zzyAFQkWgLA2zxw+wL4S/pCbxPXC//DAPhJ+EvHBbDy4GX4UPhP+E7IzlnIzgHIzs3NyfhLyM74TM8W+E3PCx9VAs8LHxLO+EoBzMwh+wQB0CCLOK2zWMcFk9dN0N7XTNDtHu1Tyds8ZiUABPACA2Aw+Eby4Ez4Qm7jACGV0z/U0dCS0z/i03/6QNN/1NHQ+kDTH9TR0PpA0ds8MNs88gBUJ1oELts8cPsC+Ekj2zzHBfLgaYhwWFR1Z1UHZipqKAL02zzbPPhPcMjPhYDKAM+EQM4B+gJxzwtqVVDIz5HPiIUOy3/Oy39VIMjOygDMzc3JcfsAMFUC+ElwyM+FgMoAz4RAzoIQERMmBs8Ljss/yYMG+wBYi9wAAAAAAAAAAAAAAAAYyM5VIMjPkOcDiQ7Lf84ByM7Nzclw+wApYQAMggMNQG8CAiJxAds82zz5AMjPigBAy//J0CtGAAbIzskEUCCCED0b0yW64wIgghBHtHAEuuMCIIIQSbL217rjAiCCEEsrLM664wI0Mi8tA+Iw+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGOHSPQ0wH6QDAxyM+HIM5xzwthAcjPkyysszrOzclwjjH4RCBvEyFvEvhJVQJvEcjPhIDKAM+EQM4B+gL0AHHPC2kByPhEbxXPCx/Ozcn4RG8U4vsA4wDyAFQuUwAg+ERwb3KAQG90cG9x+GT4SwM2MPhG8uBM+EJu4wAhk9TR0N76QNHbPDDbPPIAVDBaAmbbPHD7AvhO+kJvE9cL/8MA+En4TscFsPLghyD6Qm8T1wv/wAAgnDD4T/pCbxPXC//AAN5mMQHujnL4T/pCbxPXC/+OEvhQyM+FCM6Ab89AyYMGpgK1B45QIPhvII0EcAAAAAAAAAAAAAAAABlfi/kgyM7OyXD7APhQ+E/4TvhN+EtwyM+FgMoAz4RAznHPC25VMMjPkEYp6lbLH85ZyM4ByM7Nzc3Jgwbi+wDjDTBdA+Iw+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGOHSPQ0wH6QDAxyM+HIM5xzwthAcjPkx7RwBLOzclwjjH4RCBvEyFvEvhJVQJvEcjPhIDKAM+EQM4B+gL0AHHPC2kByPhEbxXPCx/Ozcn4RG8U4vsA4wDyAFQzUwAg+ERwb3KAQG90cG9x+GT4TwPiMPhG8uBM+EJu4wDTH/hEWG91+GTR2zwhjh0j0NMB+kAwMcjPhyDOcc8LYQHIz5L0b0yWzs3JcI4x+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ABxzwtpAcj4RG8Vzwsfzs3J+ERvFOL7AOMA8gBUNVMAIPhEcG9ygEBvdHBvcfhk+EwEUCCCECKmzt264wIgghAonxncuuMCIIIQLalNL7rjAiCCEDFBIV+64wI+Ozk3A9Qw+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGOGSPQ0wH6QDAxyM+HIM6CELFBIV/PC4HMyXCOLvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAgGrPQPhEbxXPCx/MyfhEbxTi+wDjAPIAVDhTACD4RHBvcoBAb3Rwb3H4ZPhKA9gw+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGOGiPQ0wH6QDAxyM+HIM6CEK2pTS/PC4HLH8lwji/4RCBvEyFvEvhJVQJvEcjPhIDKAM+EQM4B+gL0AIBqz0D4RG8Vzwsfyx/J+ERvFOL7AOMA8gBUOlMAIPhEcG9ygEBvdHBvcfhk+E0DVDD4RvLgTPhCbuMAIZPU0dDe03/6QNTR0PpA0x/0BFlvAgHR2zww2zzyAFQ8WgP+2zxw+wL4SSHbPMcF8uBqyM+EKlMjyCRvIgLLH/QAzgHIzs3NyX8jcPhMKPhPcMjPhYDKAM+EQM5xzwtuVVDIz5HPiIUOy3/Oy39VIMjOygDMzc3Jgwb7AAEDi9wAAAAAAAAAAAAAAAAYyM5VMMjPkHx+vRbLfwFvIgLLH/QAzmZFPQASAcjOzc3JcPsAAzQw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds84wDyAFQ/UwGS2zxw+wL4TvpCbxPXC//DAPhJ+E7HBbDy4IeNBHAAAAAAAAAAAAAAAAAVkMgPYMjOzslw+wD4UMjPhQjOgG/PQMmDBqYCtQf7AGYEUCCCEAbiny664wIgghAVoDj7uuMCIIIQGu1IXrrjAiCCECFFfMy64wJMSkNBA+Iw+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGOHSPQ0wH6QDAxyM+HIM5xzwthAcjPkoUV8zLOzclwjjH4RCBvEyFvEvhJVQJvEcjPhIDKAM+EQM4B+gL0AHHPC2kByPhEbxXPCx/Ozcn4RG8U4vsA4wDyAFRCUwAg+ERwb3KAQG90cG9x+GT4TgNiMPhG8uBM+EJu4wAhk9TR0N7Tf/pA03/SANTTH/QEWW8CAdMf1NHQ+kDR2zww2zzyAFREWgLS2zxw+wL4SSPbPMcF8uBqWAUQJFNn+E9wyM+FgMoAz4RAznHPC25VUMjPkc+IhQ7Lf87Lf1UgyM7KAMzNzcmDBvsAMFiNBHAAAAAAAAAAAAAAAAAV9eCjoMjOy38BbyICyx/0AM7JcPsAZkUCInIB2zzbPPkAyM+KAEDL/8nQSEYBaHDIy/9wbYBA9EPbPHFYgED0FljIywdyWIBA9EMBc1iAQPQXyPQAyfhKyM+EgPQA9ADPgclHAAT4SwHkbSFvEXBtnVMSgCD0Dm+hMCAybrOOHVMDgQEL9ApvoTHy0JlTA8jPhAJZgQEL9EE0IaQy6F8DAW8QwQOONchREIEBC/SClSBY1wsHk21fIOKTIm6zjhhTFM41UyOBAQv0dJUgWNcLB5NtXyDibDPoXwTJSQCejkxwbW8CURCBAQv0gpUgWNcLB5NtXyDikyJus44jUxRvIiGkVSCAIPQWbwI1UyOBAQv0dJUgWNcLB5NtXyDibDPoXwTIAW8iAssf9ADJ4gNOMPhG8uBM+EJu4wAhltTTH9TR0JPU0x/i+kDU0dD6QNHbPDDbPPIAVEtaAVzbPHD7AvhL+kJvE9cL/8MA+En4S8cFsPLgZcjPhQjOgG/PQMmDBqYCtQf7AF8DZgM0MPhG8uBM+EJu4wAhk9TR0N76QNHbPOMA8gBUTVMBWNs8cPsC+Ev6Qm8T1wv/wwD4SfhLxwWw8uBlyM+FCM6Ab89AyYMGpgK1B/sAZgJC+Eby4EzbPHD7AvhJyM+FCM6Ab89AyYMGpgK1B/sAIOMAZlMBIDAh1w0fjoDfIcAAIJJsId5QAQow2zzyAFEAEPhG8uBM8sBkBIwh1h8x+Eby4Ez4Qm7jANs8cPsC+E76Qm8T1wv/wwD4SfhOxwWw8uCH1wsfghAx7dTHuiCcMPhP+kJvE9cL/8AA3uMAIOMAVGZdUwAo7UTQ0//TPzH4Q1jIy//LP87J7VQAbO1E0NP/0z/TADHU+kDU0dD6QNMf1NHQ+kDU0dD6QNTR0PpA0fhw+G/4bvht+Gz4a/hq+GP4YgIK9KQg9KFXVgAUc29sIDAuNjIuMAQioAAAAAKI+GqJ+GuJ+Gxw+G1qaWlYBDCJ+G6J+G+J+HAg0PpA+kDXCx9Y+GsB+GxpaWlZAxiOgI6A4jDbPPgP8gBnW1oAZPhQ+E/4TvhN+Ez4S/hK+EP4QsjL/8s/z4PMzlVAyM7LH1UgyM5ZyM4ByM7Nzc3Nye1UAhDbPHD7AiDbPGZcAl7QIPpA+kDTH9Mf+kA2bDIh+G0g+HAi1DT4aljVMfpAMCD4bvpCbxPXC/+OgOMOW15dADBwIPsC+FDIz4UIzoBvz0DJgwamILUH+wACbnAijQRwAAAAAAAAAAAAAAAAGPiBZGDIzssfyx/JcPsA2zzbPCDIz4UIzoBvz0DJgwamArUH+wBgXwJqghAHJw4A+EzbPNs8+E5/yM+FgMoAz4RAzgH6AnHPC2pZi4Me3UxyKmzt2MjOzst/zclx+wBlYQJqghAHJw4A+CjbPNs8+E5/yM+FgMoAz4RAzgH6AnHPC2pZi4Me3Ux0my9teMjOzst/zclx+wBlYQEiIG8QAW8R+Cj6Qm8S2zygtX9iAQzbPIMPqYZjAU4gwAAhwP+x8uBDgBSAFeME+DIgjoDf8uBE0NMH0z/TP9MH1ws/bEFkAQSIAWoAKoIQBycOAIIQBfXhAKC1f4IBhqBvAgAMghA7msoAAQYg2zxoAMLQIPpA+kDTH9Mf+kA2bCMh+G0j1DX4alUC10zQ+kDU0dD6QNTR0PpA0QL4bvhv+HBZjQRwAAAAAAAAAAAAAAAAGPiBZGDIzssfyx/JcPsAyM+FCM6Ab89AyYMGpgK1B/sAAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAA=';
export const DexAccountCode =
  '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';
export const DexPlatformCode =
  'te6ccgECFgEAAjUAAgaK2zUVAQQkiu1TIOMDIMD/4wIgwP7jAvILEQMCDQO+7UTQ10nDAfhmifhpIds80wABjhqBAgDXGCD5AQHTAAGU0/8DAZMC+ELi+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jwPCQQDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8EBAEARQgghAVoDj7uuMCBQOIMPhCbuMA+EbycyGW1NMf1NHQk9TTH+L6QNTR0PpA0fhJ+ErHBY6AjhQgyM+FCM6Ab89AyYEAgKYgtQf7AOJfBNs88gAJBhQBCF9D2zwHAnj4SsjOEs5wAcsfEssfzvhBiMjPjits1szOyQHM+EwBzCH7BAHQIIs4rbNYxwWT103Q3tdM0O0e7VPJ2zwVCAAE8AICFu1E0NdJwgGOgOMNCwoANO1E0NP/0z/TADH6QNMH1NH4bPhr+Gr4Y/hiAnJw7UTQ9AVxIYBA9A6OgN9yIoBA9A6T1wsHkXDicyOAQPQPjoDf+Gz4a/hqgED0DvK91wv/+GJw+GMODAECiA0AAAECiQ8AQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAACvhG8uBMAgr0pCD0oRMSABRzb2wgMC41Ny4xARigAAAAAjDbPPgP8gAUADD4TPhL+Er4Q/hCyMv/yz/Pg87LB8zJ7VQADCD4Ye0e2Q==';
export const LpTokenPendingCode =
  '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';

// DEPLOYMENT NAMES

export const OWNER_EVER_WALLET_DEPLOYMENT_TAG = 'DexOwner';
export const BATCH_EXECUTOR_DEPLOYMENT_TAG = 'BatchExecutor';
export const TOKEN_FACTORY_DEPLOYMENT_TAG = 'TokenFactory';
export const DEX_ROOT_DEPLOYMENT_TAG = 'DexRoot';
export const USER_EVER_WALLET_DEPLOYMENT_TAG = 'commonAccount-';
export const PAIR_DEPLOYMENT_TAG = 'DexPair-';
export const TOKEN_ROOT_DEPLOYMENT_TAG = 'TokenRootUpgradeable';
export const TOKEN_NAME_SUFFIX = 'TEST-';
export const OWNER_TOKEN_WALLET_DEPLOYMENT_TAG = 'OwnerTokenWallet';
export const HELPERS_DEPLOY_BATCH_INDEX = 65535;

// TIMEOUTS

export const DEPLOY_EVER_WALLETS_BATCH_TIMEOUT = 60_000;
export const DEPLOY_TOKENS_BATCH_TIMEOUT = 120_000;
export const DEPLOY_PAIRS_BATCH_TIMEOUT = 60_000;
export const DEPLOY_TOKEN_WALLETS_BATCH_TIMEOUT = 400_000;

// RETRY DELAYS

export const DEPLOY_EVER_WALLETS_BATCH_RETRY_DELAY = 1_500;
export const DEPLOY_TOKENS_BATCH_RETRY_DELAY = 1_500;
export const DEPLOY_PAIRS_BATCH_RETRY_DELAY = 1_500;
export const DEPLOY_TOKEN_WALLETS_BATCH_RETRY_DELAY = 3_000;

// BATCH SIZES

export const EVER_WALLETS_DEPLOY_BATCH_SIZE = 500;
export const TOKENS_DEPLOY_BATCH_SIZE = 200;
export const PAIRS_DEPLOY_BATCH_SIZE = 200;
export const TOKEN_WALLETS_DEPLOY_BATCH_SIZE = 1000;

// CONCURRENCY

export const EVER_WALLET_DEPLOY_BATCH_CONCURRENCY = 100;
export const PAIRS_DEPLOY_BATCH_CONCURRENCY = 50;
export const TOKEN_WALLET_DEPLOY_BATCH_CONCURRENCY = 50;

// AMOUNTS

export const EVER_WALLET_AMOUNT = 10 ** 4;
export const TOKEN_MINT_AMOUNT = 10 ** 12;

export const DEX_DEPLOY_VALUE = 12;
export const BATCH_EXECUTOR_DEPLOY_VALUE = 2;
export const TOKEN_WALLET_DEPLOY_VALUE = 0.5;
export const TOKEN_DEPLOY_VALUE = 1.5;
export const PAIR_DEPLOY_VALUE = 15;

export const TOKEN_WALLETS_DEPLOY_BATCH_VALUE = 150;
export const EVER_WALLETS_DEPLOY_BATCH_VALUE = 50;
export const TOKENS_DEPLOY_BATCH_VALUE = 50;
export const PAIRS_DEPLOY_BATCH_VALUE = 50;

export const HELPER_WALLET_EXTRA_VALUE = 5;
export const OWNER_WALLET_EXTRA_VALUE = 5;

// SIGNERS

export const OWNER_SIGNER_ID = '5';
export const USER_SIGNER_ID = '0';
