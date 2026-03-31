export const proofContractAbi = [
  {
    type: "function",
    name: "saveProof",
    stateMutability: "nonpayable",
    inputs: [{ name: "fileHash", type: "bytes32" }],
    outputs: [],
  },
  {
    type: "function",
    name: "getProofsCount",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "Proved",
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: true, name: "fileHash", type: "bytes32" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    anonymous: false,
  },
] as const;
