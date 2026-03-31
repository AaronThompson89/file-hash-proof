"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Hub" },
  { href: "/submit", label: "Submit" },
  { href: "/records", label: "Records" },
  { href: "/about", label: "About" },
];

export function TopTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Top navigation"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 8,
      }}
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              padding: "10px 8px",
              textAlign: "center",
              borderRadius: 14,
              border: `1px solid ${active ? "rgba(15, 118, 110, 0.28)" : "rgba(51, 65, 85, 0.1)"}`,
              background: active ? "rgba(15, 118, 110, 0.09)" : "rgba(255,255,255,0.72)",
              color: active ? "#0f766e" : "#334155",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
