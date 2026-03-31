"use client";

import { useState } from "react";
import { CopyIcon } from "@/components/icons";

export function CopyHashButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        border: "1px solid rgba(51,65,85,0.14)",
        background: copied ? "rgba(15,118,110,0.08)" : "#ffffff",
        color: copied ? "#0f766e" : "#334155",
        borderRadius: 14,
        padding: "10px 12px",
        fontWeight: 700,
      }}
    >
      <CopyIcon width={16} height={16} />
      {copied ? "Copied" : "Copy Hash"}
    </button>
  );
}
