"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ActionBar } from "@/components/action-bar";
import { ProofRecordCard } from "@/components/proof-record-card";
import { RecordSummaryPanel } from "@/components/record-summary-panel";
import { useProofStore } from "@/lib/proof-store";

export function HubPage() {
  const { address, isConnected } = useAccount();
  const { proofs, latestProof } = useProofStore();

  const walletProofs = useMemo(() => {
    if (!address) return [];
    return proofs.filter((proof) => proof.owner.toLowerCase() === address.toLowerCase());
  }, [address, proofs]);

  const currentLatest = walletProofs[0] ?? latestProof;

  return (
    <div className="page-shell">
      <div className="page-grid hub-layout">
        <div style={{ display: "grid", gap: 18 }}>
          <ActionBar
            title="Proof archive hub"
            description="Create a file hash proof, inspect the latest evidence entry, and keep your Base archive in order."
            actions={
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/submit" style={{ padding: "11px 14px", borderRadius: 14, background: "#0f172a", color: "#f8fafc", fontWeight: 700 }}>
                  Create Proof
                </Link>
                <Link href="/records" style={{ padding: "11px 14px", borderRadius: 14, border: "1px solid rgba(51,65,85,0.14)", background: "#fff", fontWeight: 700 }}>
                  View Records
                </Link>
              </div>
            }
          />

          <section
            className="panel"
            style={{
              padding: 18,
              display: "grid",
              gap: 16,
              background: "linear-gradient(160deg, rgba(255,255,255,0.96), rgba(226,232,240,0.9))",
            }}
          >
            <div className="section-title">Current Session</div>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
              <div className="panel section-card">
                <div className="section-title">Wallet</div>
                <div style={{ fontWeight: 800, fontSize: "1.12rem" }}>{isConnected ? "Connected" : "Offline"}</div>
                <div className="muted" style={{ marginTop: 8 }}>{isConnected ? "Base wallet session active." : "Connect wallet to submit a proof."}</div>
              </div>
              <div className="panel section-card">
                <div className="section-title">Archive Count</div>
                <div style={{ fontWeight: 800, fontSize: "1.12rem" }}>{walletProofs.length || proofs.length}</div>
                <div className="muted" style={{ marginTop: 8 }}>Records available for quick inspection.</div>
              </div>
              <div className="panel section-card">
                <div className="section-title">Integrity State</div>
                <div style={{ fontWeight: 800, fontSize: "1.12rem" }}>{currentLatest?.status ?? "Ready"}</div>
                <div className="muted" style={{ marginTop: 8 }}>Latest evidence status in the workspace.</div>
              </div>
            </div>
          </section>

          {currentLatest ? <ProofRecordCard proof={currentLatest} /> : null}
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          <RecordSummaryPanel proof={currentLatest} />
          <div className="panel section-card" style={{ display: "grid", gap: 14 }}>
            <div className="section-title">Fast Actions</div>
            <Link href="/submit" style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(51,65,85,0.14)", background: "rgba(255,255,255,0.82)", fontWeight: 700 }}>
              Open evidence intake
            </Link>
            <Link href="/records" style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(51,65,85,0.14)", background: "rgba(255,255,255,0.82)", fontWeight: 700 }}>
              Browse archive ledger
            </Link>
            <Link href="/about" style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(51,65,85,0.14)", background: "rgba(255,255,255,0.82)", fontWeight: 700 }}>
              Read proof scope
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
