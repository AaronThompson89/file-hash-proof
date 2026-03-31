import type { ReactNode } from "react";

export function ActionBar({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div
      className="panel"
      style={{
        padding: 18,
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div className="eyebrow">Workspace Focus</div>
        <h1 style={{ margin: "8px 0 6px", fontSize: "1.45rem", lineHeight: 1.1 }}>{title}</h1>
        <p style={{ margin: 0, color: "#475569", maxWidth: 520 }}>{description}</p>
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
