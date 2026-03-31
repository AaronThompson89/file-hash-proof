import Link from "next/link";
import type { ProofRecord } from "@/lib/types";
import { formatTimestamp, shortenHash } from "@/lib/utils";
import { ProofStatusChip } from "@/components/proof-status-chip";

export function ProofTimeline({ proofs }: { proofs: ProofRecord[] }) {
  return (
    <div
      className="panel"
      style={{
        padding: 18,
        display: "grid",
        gap: 14,
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(241,245,249,0.95))",
      }}
    >
      <div className="section-title">Archive Timeline</div>
      {proofs.map((proof, index) => (
        <Link
          href={`/proofs/${proof.id}`}
          key={proof.id}
          style={{
            display: "grid",
            gridTemplateColumns: "22px 1fr",
            gap: 12,
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", justifyItems: "center", gap: 6 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#0f766e", marginTop: 6 }} />
            {index !== proofs.length - 1 ? (
              <span style={{ width: 1, minHeight: 72, background: "rgba(51,65,85,0.18)" }} />
            ) : null}
          </div>
          <div
            style={{
              padding: 14,
              borderRadius: 18,
              border: "1px solid rgba(51,65,85,0.14)",
              background: "rgba(248,250,252,0.92)",
              marginBottom: 2,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <strong>{formatTimestamp(proof.timestamp)}</strong>
              <ProofStatusChip status={proof.status} />
            </div>
            <div className="mono" style={{ marginTop: 10, fontSize: "0.88rem", fontWeight: 700 }}>
              {shortenHash(proof.fileHash, 18, 12)}
            </div>
            <div style={{ marginTop: 6, color: "#64748b", fontSize: "0.86rem" }}>
              Owner {shortenHash(proof.owner, 8, 6)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
