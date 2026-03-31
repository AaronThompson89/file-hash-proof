import type { ReactNode } from "react";
import { ArchiveHeader } from "@/components/archive-header";
import { SideNav } from "@/components/side-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <ArchiveHeader />
      <div className="shell-grid">
        <SideNav />
        <main className="content-frame">{children}</main>
      </div>
    </div>
  );
}
