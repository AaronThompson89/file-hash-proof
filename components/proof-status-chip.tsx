import type { ProofStatus } from "@/lib/types";

const statusMap: Record<ProofStatus, { label: string; bg: string; color: string }> = {
  ready: { label: "Ready", bg: "rgba(51,65,85,0.08)", color: "#334155" },
  submitted: { label: "Submitted", bg: "rgba(217,119,6,0.12)", color: "#b45309" },
  proved: { label: "Proved", bg: "rgba(15,118,110,0.12)", color: "#0f766e" },
  indexed: { label: "Indexed", bg: "rgba(15,118,110,0.12)", color: "#0f766e" },
  copied: { label: "Copied", bg: "rgba(51,65,85,0.08)", color: "#334155" },
};

export function ProofStatusChip({ status }: { status: ProofStatus }) {
  const config = statusMap[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 12px",
        borderRadius: 999,
        background: config.bg,
        color: config.color,
        fontSize: "0.82rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: config.color,
        }}
      />
      {config.label}
    </span>
  );
}
