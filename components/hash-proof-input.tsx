type HashProofInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
};

export function HashProofInput({ value, onChange, error }: HashProofInputProps) {
  return (
    <div
      className="panel"
      style={{
        padding: 18,
        display: "grid",
        gap: 12,
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(226,232,240,0.85))",
      }}
    >
      <div className="eyebrow">Evidence Intake</div>
      <div style={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.1 }}>File hash input</div>
      <textarea
        aria-label="File hash"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste a 32-byte file hash, for example 0x..."
        rows={5}
        style={{
          width: "100%",
          borderRadius: 20,
          border: `1px solid ${error ? "rgba(180,83,9,0.45)" : "rgba(51,65,85,0.16)"}`,
          background: "#f8fafc",
          padding: "18px 16px",
          color: "#0f172a",
          resize: "vertical",
          fontFamily: "var(--font-mono)",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          minHeight: 144,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ color: error ? "#b45309" : "#475569", fontSize: "0.86rem" }}>
          {error ?? "Use a bytes32 hex hash to create a proof record."}
        </div>
        <div className="mono" style={{ color: "#64748b", fontSize: "0.82rem" }}>
          66 chars expected
        </div>
      </div>
    </div>
  );
}
