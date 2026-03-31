"use client";

import { useState } from "react";
import { injected, useAccount, useConnect, useDisconnect } from "wagmi";
import { shortenHash } from "@/lib/utils";

export function WalletButton({ compact = false }: { compact?: boolean }) {
  const { address, isConnected } = useAccount();
  const { connectAsync, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    if (isConnected) {
      disconnect();
      return;
    }

    try {
      await connectAsync({ connector: injected() });
    } catch {
      setError("Wallet connection is not available.");
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button
        type="button"
        onClick={handleClick}
        style={{
          width: "100%",
          border: "1px solid rgba(51,65,85,0.14)",
          background: isConnected ? "#0f172a" : "#ffffff",
          color: isConnected ? "#f8fafc" : "#0f172a",
          borderRadius: compact ? 14 : 16,
          padding: compact ? "12px 14px" : "13px 16px",
          fontWeight: 700,
          boxShadow: "0 10px 20px rgba(15, 23, 42, 0.06)",
        }}
      >
        {isPending ? "Connecting..." : isConnected && address ? shortenHash(address, 8, 6) : "Connect Wallet"}
      </button>
      {!compact && isConnected && (
        <div style={{ color: "#475569", fontSize: "0.86rem" }}>Session ready on Base.</div>
      )}
      {error ? <div style={{ color: "#b45309", fontSize: "0.82rem" }}>{error}</div> : null}
    </div>
  );
}
