"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ActionBar } from "@/components/action-bar";
import { EmptyState } from "@/components/empty-state";
import { ProofTimeline } from "@/components/proof-timeline";
import { RecordSummaryPanel } from "@/components/record-summary-panel";
import { useProofStore } from "@/lib/proof-store";

export function RecordsPage() {
  const { address } = useAccount();
  const { proofs } = useProofStore();

  const walletProofs = useMemo(() => {
    if (!address) return [];
    return proofs.filter((proof) => proof.owner.toLowerCase() === address.toLowerCase());
  }, [address, proofs]);

  const visibleProofs = walletProofs.length ? walletProofs : proofs;

  return (
    <div className="page-shell">
      <div className="page-grid records-layout">
        <div style={{ display: "grid", gap: 18 }}>
          <ActionBar
            title="Personal archive ledger"
            description="Inspect the latest proof lineage, review timestamps, and move into a dedicated detail route."
            actions={
              <Link href="/submit" style={{ padding: "11px 14px", borderRadius: 14, background: "#0f172a", color: "#f8fafc", fontWeight: 700 }}>
                New Proof
              </Link>
            }
          />
          <RecordSummaryPanel proof={visibleProofs[0] ?? null} />
          <div className="panel section-card">
            <div className="section-title">Archive Scope</div>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span className="muted">Visible records</span>
                <strong>{visibleProofs.length}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span className="muted">Wallet filter</span>
                <strong>{address ? "Applied" : "Fallback archive"}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span className="muted">Detail routes</span>
                <strong>Enabled</strong>
              </div>
            </div>
          </div>
        </div>

        <div>
          {visibleProofs.length ? (
            <ProofTimeline proofs={visibleProofs} />
          ) : (
            <EmptyState
              title="No proof records yet"
              description="Create your first file existence proof to populate this ledger."
              actionHref="/submit"
              actionLabel="Create Proof"
            />
          )}
        </div>
      </div>
    </div>
  );
}
