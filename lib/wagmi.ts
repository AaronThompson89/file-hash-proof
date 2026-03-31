import { QueryClient } from "@tanstack/react-query";
import { createConfig, http } from "wagmi";
import { defineChain } from "viem";

const baseChain = defineChain({
  id: 8453,
  name: "Base",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "BaseScan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api",
    },
  },
});

export const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [baseChain],
  transports: {
    [baseChain.id]: http(),
  },
  multiInjectedProviderDiscovery: true,
});

// TODO(builder-code): Replace this placeholder with the final builder code suffix
// once the production Base builder code string is provided by the user.
export const builderCodeConfig = {
  suffix: "TODO_REPLACE_WITH_BUILDER_CODE_SUFFIX",
};
