import type { ProofRecord } from "@/lib/types";

export const mockProofs: ProofRecord[] = [
  {
    id: "proof-7h2aa1",
    fileHash: "0x76f69f48ea0028d2496d4f73a092d06f6fd7a6816b2a74c00a6da3f2b95fd21e",
    timestamp: "2026-03-31T08:18:00.000Z",
    owner: "0x9d8A62F656A8D1615C1294FD71E9CFB3E4855A4F",
    status: "proved",
    network: "Base",
    txHash: "0x18cb20aa0efbb699f835db235319daf63b7a2533c77cfd67c6798ac346b5aa01",
    blockNumber: 29184507,
    note: "Indexed in personal archive.",
  },
  {
    id: "proof-8k4mq9",
    fileHash: "0x3f92e8422cb68fd8b8d7f3f4f2d5cc39afddb02448cd929f7a8d458afcc71589",
    timestamp: "2026-03-30T14:42:00.000Z",
    owner: "0x9d8A62F656A8D1615C1294FD71E9CFB3E4855A4F",
    status: "indexed",
    network: "Base",
    txHash: "0xaa2794978fc311f60129fbe2ba51a06e45ad4b4670df78c120965f7cf82b0d75",
    blockNumber: 29172018,
    note: "Integrity log synchronized.",
  },
  {
    id: "proof-4n6ex3",
    fileHash: "0x48f0f0d8a102f0e53dab34db4d6bb875ab95f495facd5777dcf2f8c64163d6f7",
    timestamp: "2026-03-29T09:05:00.000Z",
    owner: "0x2D3A5fC1bD32eFf72E3b2251fd5D4C82B4EFf590",
    status: "submitted",
    network: "Base",
    txHash: "0x6609a926a2b67d6adccbb8b24701c85e4dcc6e9a6ae3414c21ce1ce4a171ad01",
    blockNumber: 29160893,
    note: "Awaiting final index confirmation.",
  },
];
