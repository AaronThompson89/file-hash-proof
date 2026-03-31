type CreateProofButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export function CreateProofButton({ disabled, loading, onClick }: CreateProofButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        width: "100%",
        borderRadius: 18,
        border: "1px solid rgba(15,118,110,0.28)",
        background: disabled || loading ? "#cbd5e1" : "linear-gradient(135deg, #0f172a, #0f766e)",
        color: "#fff",
        padding: "16px 18px",
        fontSize: "1rem",
        fontWeight: 800,
        letterSpacing: "0.02em",
        boxShadow: disabled || loading ? "none" : "0 16px 30px rgba(15, 118, 110, 0.18)",
      }}
    >
      {loading ? "Submitting proof..." : "Create Proof"}
    </button>
  );
}
