export default function NotFound() {
  return (
    <div className="page-shell">
      <div className="page-grid" style={{ maxWidth: 720 }}>
        <section className="panel" style={{ padding: 24, display: "grid", gap: 12 }}>
          <div className="section-title">Missing Record</div>
          <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Archive entry not found</h1>
          <p style={{ margin: 0, color: "#475569" }}>
            The requested route is not available in this proof workspace.
          </p>
        </section>
      </div>
    </div>
  );
}
