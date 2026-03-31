"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArchiveIcon, ClockIcon, HashIcon, ShieldIcon, WalletIcon } from "@/components/icons";
import { WalletButton } from "@/components/wallet-button";

const navItems = [
  { href: "/", label: "Proof Hub", meta: "Workspace entry", icon: ArchiveIcon },
  { href: "/submit", label: "Submit Proof", meta: "Evidence intake", icon: HashIcon },
  { href: "/records", label: "My Records", meta: "Archive ledger", icon: ClockIcon },
  { href: "/about", label: "About", meta: "Integrity note", icon: ShieldIcon },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside
      className="desktop-only"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        padding: 22,
        borderRight: "1px solid rgba(51, 65, 85, 0.12)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(241,245,249,0.96))",
      }}
    >
      <div
        style={{
          padding: 18,
          borderRadius: 24,
          border: "1px solid rgba(51,65,85,0.14)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(226,232,240,0.7))",
          boxShadow: "0 14px 36px rgba(15, 23, 42, 0.05)",
        }}
      >
        <div className="eyebrow">Archive Directory</div>
        <div style={{ marginTop: 10, fontSize: "1.55rem", fontWeight: 800, lineHeight: 1.05 }}>
          Proof
          <br />
          Registry
        </div>
        <p style={{ margin: "12px 0 0", color: "#475569", lineHeight: 1.5 }}>
          File evidence records anchored to Base and organized for quick review.
        </p>
      </div>

      <nav aria-label="Sidebar navigation" style={{ marginTop: 20, display: "grid", gap: 10 }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: 12,
                alignItems: "center",
                padding: 14,
                borderRadius: 18,
                border: `1px solid ${active ? "rgba(15,118,110,0.24)" : "rgba(51,65,85,0.1)"}`,
                background: active ? "rgba(15,118,110,0.08)" : "rgba(255,255,255,0.66)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 14,
                  display: "grid",
                  placeItems: "center",
                  background: active ? "#0f766e" : "#e2e8f0",
                  color: active ? "#fff" : "#334155",
                }}
              >
                <Icon width={18} height={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{item.label}</div>
                <div style={{ color: "#64748b", fontSize: "0.88rem" }}>{item.meta}</div>
              </div>
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          marginTop: 18,
          padding: 16,
          borderRadius: 20,
          border: "1px solid rgba(51,65,85,0.12)",
          background: "rgba(255,255,255,0.75)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          <WalletIcon width={14} height={14} />
          Session Access
        </div>
        <WalletButton />
      </div>
    </aside>
  );
}
