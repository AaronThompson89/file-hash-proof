import Link from "next/link";
import { ChevronRightIcon, ClockIcon, HashIcon, ShieldIcon } from "@/components/icons";
import { CopyHashButton } from "@/components/copy-hash-button";
import { ProofStatusChip } from "@/components/proof-status-chip";
import type { ProofRecord } from "@/lib/types";
import { formatTimestamp, shortenHash } from "@/lib/utils";

export function ProofRecordCard({ proof, dense = false }: { proof: ProofRecord; dense?: boolean }) {
  return (
    <article
      className="panel"
      style={{
        padding: dense ? 16 : 18,
        display: "grid",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div>
          <div className="eyebrow">Proof Record</div>
          <div style={{ marginTop: 8, fontSize: dense ? "1rem" : "1.12rem", fontWeight: 800 }}>
            {proof.id}
          </div>
        </div>
        <ProofStatusChip status={proof.status} />
      </div>

      <div
        style={{
          border: "1px solid rgba(51,65,85,0.14)",
          borderRadius: 18,
          padding: "14px 14px 16px",
          background: "rgba(248,250,252,0.9)",
        }}
      >
        <div className="eyebrow">
          <HashIcon width={14} height={14} />
          File Hash
        </div>
        <div className="mono" style={{ marginTop: 10, fontSize: dense ? "0.9rem" : "0.96rem", lineHeight: 1.7, wordBreak: "break-all", fontWeight: 700 }}>
          {proof.fileHash}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: dense ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        <div>
          <div className="eyebrow">
            <ClockIcon width={14} height={14} />
            Timestamp
          </div>
          <div style={{ marginTop: 8, fontWeight: 700 }}>{formatTimestamp(proof.timestamp)}</div>
        </div>
        <div>
          <div className="eyebrow">
            <ShieldIcon width={14} height={14} />
            Owner
          </div>
          <div className="mono" style={{ marginTop: 8, fontWeight: 700 }}>
            {shortenHash(proof.owner, 10, 8)}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <CopyHashButton value={proof.fileHash} />
        <Link
          href={`/proofs/${proof.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 12px",
            borderRadius: 14,
            border: "1px solid rgba(51,65,85,0.14)",
            background: "#fff",
            fontWeight: 700,
          }}
        >
          View Detail
          <ChevronRightIcon width={16} height={16} />
        </Link>
      </div>
    </article>
  );
}
