import Link from "next/link";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <div className="panel" style={{ padding: 24, display: "grid", gap: 12, justifyItems: "start" }}>
      <div className="eyebrow">No Records</div>
      <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>{title}</div>
      <div style={{ color: "#475569", maxWidth: 420, lineHeight: 1.6 }}>{description}</div>
      <Link
        href={actionHref}
        style={{
          padding: "11px 14px",
          borderRadius: 14,
          background: "#0f172a",
          color: "#f8fafc",
          fontWeight: 700,
        }}
      >
        {actionLabel}
      </Link>
    </div>
  );
}
