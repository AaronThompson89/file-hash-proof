"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProofRecord, ProofStatus } from "@/lib/types";
import { mockProofs } from "@/lib/mock-proof-data";

type ProofStoreValue = {
  proofs: ProofRecord[];
  latestProof: ProofRecord | null;
  createLocalProof: (payload: {
    fileHash: string;
    owner: string;
    txHash?: string;
    status?: ProofStatus;
  }) => ProofRecord;
  markProofStatus: (id: string, status: ProofStatus) => void;
};

const ProofStoreContext = createContext<ProofStoreValue | null>(null);
const STORAGE_KEY = "file-hash-proof-records";

function readStoredProofs(): ProofRecord[] {
  if (typeof window === "undefined") return mockProofs;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return mockProofs;

  try {
    const parsed = JSON.parse(raw) as ProofRecord[];
    return parsed.length ? parsed : mockProofs;
  } catch {
    return mockProofs;
  }
}

export function ProofStoreProvider({ children }: { children: ReactNode }) {
  const [proofs, setProofs] = useState<ProofRecord[]>(mockProofs);

  useEffect(() => {
    setProofs(readStoredProofs());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(proofs));
    }
  }, [proofs]);

  const value = useMemo<ProofStoreValue>(() => {
    const latestProof = proofs[0] ?? null;

    return {
      proofs,
      latestProof,
      createLocalProof: ({ fileHash, owner, txHash, status = "submitted" }) => {
        const created: ProofRecord = {
          id: `proof-${Math.random().toString(36).slice(2, 8)}`,
          fileHash,
          owner,
          timestamp: new Date().toISOString(),
          status,
          network: "Base",
          txHash,
          note: "Fresh proof entry captured in workspace.",
        };
        setProofs((current) => [created, ...current]);
        return created;
      },
      markProofStatus: (id, status) => {
        setProofs((current) =>
          current.map((proof) => (proof.id === id ? { ...proof, status } : proof)),
        );
      },
    };
  }, [proofs]);

  return <ProofStoreContext.Provider value={value}>{children}</ProofStoreContext.Provider>;
}

export function useProofStore() {
  const context = useContext(ProofStoreContext);
  if (!context) {
    throw new Error("useProofStore must be used within ProofStoreProvider");
  }
  return context;
}
