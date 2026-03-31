"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArchiveIcon } from "@/components/icons";
import { TopTabs } from "@/components/top-tabs";
import { WalletButton } from "@/components/wallet-button";

export function ArchiveHeader() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(14px)",
        background: "rgba(248, 250, 252, 0.88)",
        borderBottom: "1px solid rgba(51, 65, 85, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "14px 16px",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #334155, #0f766e)",
              color: "white",
              boxShadow: "0 10px 20px rgba(15, 23, 42, 0.14)",
            }}
          >
            <ArchiveIcon width={20} height={20} />
          </div>
          <div>
            <div style={{ fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#475569" }}>
              Evidence Workspace
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>file-hash-proof</div>
          </div>
        </Link>

        <div className="desktop-only">
          <WalletButton compact={pathname === "/submit"} />
        </div>
      </div>

      <div className="mobile-only" style={{ padding: "0 16px 14px" }}>
        <TopTabs />
      </div>
    </header>
  );
}
