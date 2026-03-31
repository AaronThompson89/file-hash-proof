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

export const builderCodeConfig = {
  code: "bc_06u853n8",
  suffix: "0x62635f3036753835336e380b0080218021802180218021802180218021" as `0x${string}`,
};

export const wagmiConfig = createConfig({
  chains: [baseChain],
  transports: {
    [baseChain.id]: http(),
  },
  multiInjectedProviderDiscovery: true,
});
