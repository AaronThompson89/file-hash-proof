import { ProofStatusChip } from "@/components/proof-status-chip";
import type { ProofRecord } from "@/lib/types";
import { formatTimestamp, shortenHash } from "@/lib/utils";

export function RecordSummaryPanel({ proof }: { proof: ProofRecord | null }) {
  if (!proof) {
    return (
      <div className="panel section-card">
        <div className="section-title">Latest Record</div>
        <div style={{ fontSize: "1.05rem", fontWeight: 700 }}>No recent proof</div>
        <p style={{ marginBottom: 0, color: "#475569" }}>Connect a wallet and create a hash proof to start the archive.</p>
      </div>
    );
  }

  return (
    <div
      className="panel"
      style={{
        padding: 18,
        background: "linear-gradient(180deg, rgba(15,23,42,0.98), rgba(51,65,85,0.94))",
        color: "#f8fafc",
      }}
    >
      <div className="section-title" style={{ color: "rgba(203,213,225,0.9)" }}>Latest Record</div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>{proof.id}</div>
        <ProofStatusChip status={proof.status} />
      </div>
      <div className="mono" style={{ marginTop: 16, fontSize: "0.94rem", lineHeight: 1.75, wordBreak: "break-all" }}>
        {proof.fileHash}
      </div>
      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span style={{ color: "#cbd5e1" }}>Timestamp</span>
          <strong>{formatTimestamp(proof.timestamp)}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span style={{ color: "#cbd5e1" }}>Owner</span>
          <strong className="mono">{shortenHash(proof.owner, 8, 6)}</strong>
        </div>
      </div>
    </div>
  );
}
