"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ActionBar } from "@/components/action-bar";
import { CopyHashButton } from "@/components/copy-hash-button";
import { ProofStatusChip } from "@/components/proof-status-chip";
import { useProofStore } from "@/lib/proof-store";
import { formatTimestamp, shortenHash } from "@/lib/utils";

export function ProofDetailPage({ id }: { id: string }) {
  const { proofs } = useProofStore();
  const proof = useMemo(() => proofs.find((entry) => entry.id === id) ?? null, [id, proofs]);

  if (!proof) {
    return (
      <div className="page-shell">
        <div className="page-grid" style={{ maxWidth: 760 }}>
          <ActionBar title="Proof record" description="The requested record is not available in this archive snapshot." />
          <Link href="/records" style={{ padding: "11px 14px", borderRadius: 14, background: "#0f172a", color: "#f8fafc", fontWeight: 700, width: "fit-content" }}>
            Return to Records
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-grid" style={{ maxWidth: 980 }}>
        <ActionBar
          title="Proof detail slab"
          description="A dedicated record view for hash integrity, ownership, status, and transaction reference."
          actions={
            <Link href="/records" style={{ padding: "11px 14px", borderRadius: 14, border: "1px solid rgba(51,65,85,0.14)", background: "#fff", fontWeight: 700 }}>
              Back to Records
            </Link>
          }
        />

        <section className="panel" style={{ padding: 20, display: "grid", gap: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow">Record Identifier</div>
              <div style={{ marginTop: 8, fontSize: "1.35rem", fontWeight: 800 }}>{proof.id}</div>
            </div>
            <ProofStatusChip status={proof.status} />
          </div>

          <div className="detail-meta-grid" style={{ display: "grid", gap: 16 }}>
            <div className="panel section-card">
              <div className="section-title">File Hash</div>
              <div className="mono" style={{ fontSize: "1rem", lineHeight: 1.85, wordBreak: "break-all", fontWeight: 700 }}>
                {proof.fileHash}
              </div>
              <div style={{ marginTop: 14 }}>
                <CopyHashButton value={proof.fileHash} />
              </div>
            </div>
            <div className="panel section-card" style={{ display: "grid", gap: 14 }}>
              <div>
                <div className="section-title">Timestamp</div>
                <div style={{ fontWeight: 800 }}>{formatTimestamp(proof.timestamp)}</div>
              </div>
              <div>
                <div className="section-title">Owner</div>
                <div className="mono" style={{ fontWeight: 800, wordBreak: "break-all" }}>{proof.owner}</div>
              </div>
              <div>
                <div className="section-title">Transaction</div>
                <div className="mono" style={{ fontWeight: 800, wordBreak: "break-all" }}>{proof.txHash ?? "Pending local entry"}</div>
              </div>
            </div>
          </div>

          <div className="panel section-card" style={{ display: "grid", gap: 12 }}>
            <div className="section-title">Integrity Markers</div>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              <div>
                <div className="muted">Network</div>
                <strong>{proof.network}</strong>
              </div>
              <div>
                <div className="muted">Block number</div>
                <strong>{proof.blockNumber ?? "Awaiting receipt"}</strong>
              </div>
              <div>
                <div className="muted">Owner short</div>
                <strong className="mono">{shortenHash(proof.owner, 10, 8)}</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
