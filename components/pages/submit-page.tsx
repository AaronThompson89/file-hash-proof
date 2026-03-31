"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ActionBar } from "@/components/action-bar";
import { CreateProofButton } from "@/components/create-proof-button";
import { HashProofInput } from "@/components/hash-proof-input";
import { ProofRecordCard } from "@/components/proof-record-card";
import { ProofStatusChip } from "@/components/proof-status-chip";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import { proofContractAbi } from "@/lib/proof-contract";
import { useProofStore } from "@/lib/proof-store";
import { isHex32 } from "@/lib/utils";
import { trackTransaction } from "@/utils/track";

export function SubmitPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { createLocalProof, markProofStatus, proofs } = useProofStore();
  const [hashValue, setHashValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [createdProofId, setCreatedProofId] = useState<string | null>(null);
  const [manualStatus, setManualStatus] = useState<"ready" | "submitted" | "proved">("ready");
  const { data: txHash, isPending, writeContractAsync, error: writeError } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash: txHash });

  const latestCreated = useMemo(
    () => proofs.find((proof) => proof.id === createdProofId) ?? null,
    [createdProofId, proofs],
  );

  useEffect(() => {
    if (writeError) {
      setError(writeError.message || "Transaction failed.");
      setManualStatus("ready");
    }
  }, [writeError]);

  useEffect(() => {
    if (receipt.isSuccess && txHash && address && createdProofId) {
      markProofStatus(createdProofId, "proved");
      setManualStatus("proved");
      trackTransaction("app-026", "file-hash-proof", address, txHash);
    }
  }, [address, createdProofId, markProofStatus, receipt.isSuccess, txHash]);

  async function handleSubmit() {
    if (!isHex32(hashValue)) {
      setError("Enter a valid bytes32 hash.");
      return;
    }

    if (!isConnected || !address) {
      setError("Connect a wallet before creating a proof.");
      return;
    }

    setError(null);

    try {
      const sentHash = await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: proofContractAbi,
        functionName: "saveProof",
        args: [hashValue as `0x${string}`],
      });

      const localProof = createLocalProof({
        fileHash: hashValue,
        owner: address,
        txHash: sentHash,
        status: "submitted",
      });

      setCreatedProofId(localProof.id);
      setManualStatus("submitted");
      setHashValue("");
    } catch {
      setError("Unable to send the proof transaction.");
      setManualStatus("ready");
    }
  }

  return (
    <div className="page-shell">
      <div className="page-grid submit-layout">
        <div style={{ display: "grid", gap: 18 }}>
          <ActionBar
            title="Evidence intake chamber"
            description="Submit a file hash, anchor it on Base, and keep the resulting proof record within immediate reach."
            actions={
              <Link href="/records" style={{ padding: "11px 14px", borderRadius: 14, border: "1px solid rgba(51,65,85,0.14)", background: "#fff", fontWeight: 700 }}>
                Open Ledger
              </Link>
            }
          />

          <section
            className="panel"
            style={{
              padding: 18,
              display: "grid",
              gap: 16,
              background: "linear-gradient(165deg, rgba(15,23,42,0.98), rgba(51,65,85,0.95))",
              color: "#f8fafc",
            }}
          >
            <div className="section-title" style={{ color: "rgba(203,213,225,0.88)" }}>Submission State</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "1.35rem", fontWeight: 800 }}>Create a new proof entry</div>
                <div style={{ marginTop: 6, color: "#cbd5e1", wordBreak: "break-all" }}>
                  Contract target: {CONTRACT_ADDRESS}
                </div>
              </div>
              <ProofStatusChip status={receipt.isSuccess ? "proved" : manualStatus} />
            </div>
            <div className="divider" />
            <div style={{ display: "grid", gap: 12 }}>
              <HashProofInput value={hashValue} onChange={setHashValue} error={error} />
              <CreateProofButton disabled={!hashValue} loading={isPending || receipt.isLoading} onClick={handleSubmit} />
            </div>
          </section>
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          <div className="panel section-card" style={{ display: "grid", gap: 12 }}>
            <div className="section-title">Current Status</div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span className="muted">Wallet session</span>
              <strong>{isConnected ? "Ready" : "Wallet required"}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span className="muted">Transaction</span>
              <strong>{receipt.isSuccess ? "Confirmed" : txHash ? "Pending" : "Idle"}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span className="muted">Recent receipt</span>
              <strong>{txHash ? "Captured" : "Waiting"}</strong>
            </div>
            {txHash && createdProofId ? (
              <button
                type="button"
                onClick={() => router.push(`/proofs/${createdProofId}`)}
                style={{
                  marginTop: 6,
                  padding: "11px 14px",
                  borderRadius: 14,
                  background: "rgba(15,118,110,0.1)",
                  border: "1px solid rgba(15,118,110,0.22)",
                  color: "#0f766e",
                  fontWeight: 700,
                }}
              >
                Open Latest Detail
              </button>
            ) : null}
          </div>

          {latestCreated ? <ProofRecordCard proof={latestCreated} dense /> : null}
        </div>
      </div>
    </div>
  );
}
