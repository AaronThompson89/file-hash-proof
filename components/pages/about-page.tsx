import Link from "next/link";
import { ActionBar } from "@/components/action-bar";

export function AboutPage() {
  return (
    <div className="page-shell">
      <div className="page-grid" style={{ maxWidth: 880 }}>
        <ActionBar
          title="Proof scope"
          description="A compact note on what this workspace records and how a file hash proof is used."
        />
        <section className="panel" style={{ padding: 22, display: "grid", gap: 16 }}>
          <div className="section-title">Integrity Note</div>
          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div className="panel section-card">
              <div className="section-title">What it proves</div>
              <div style={{ fontWeight: 700, lineHeight: 1.6 }}>
                A submitted file hash can show that a file existed at a specific point in time.
              </div>
            </div>
            <div className="panel section-card">
              <div className="section-title">What it stores</div>
              <div style={{ fontWeight: 700, lineHeight: 1.6 }}>
                The record flow centers on hash, owner, timestamp, transaction reference, and proof status.
              </div>
            </div>
            <div className="panel section-card">
              <div className="section-title">Where to go next</div>
              <Link href="/submit" style={{ display: "inline-block", padding: "11px 14px", borderRadius: 14, background: "#0f172a", color: "#f8fafc", fontWeight: 700 }}>
                Open Submit Proof
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
