export type ProofStatus = "ready" | "submitted" | "proved" | "indexed" | "copied";

export type ProofRecord = {
  id: string;
  fileHash: string;
  timestamp: string;
  owner: string;
  status: ProofStatus;
  network: string;
  txHash?: string;
  blockNumber?: number;
  note?: string;
};
