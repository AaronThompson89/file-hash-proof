import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { Providers } from "@/components/providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69c22f7b3c2c56b9bbd2f616" />
        <meta name="base:app_id" content="69cb25016b6a2cd82c727ed7" />
        <meta name="talentapp:project_verification" content="43dc647b4ae0856d3df946a38226cf4848ac08173df995c25f0a5d1c416f66b711128c656173a6dced46c7abc9e7fe0046faeb4a6f59444e64b217a3253666f8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#f8fafc" />
        <meta name="description" content="File existence proof workspace on Base." />
        <title>file-hash-proof</title>
      </head>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
        <Script id="app-config" strategy="afterInteractive">
          {`window.__FILE_HASH_PROOF__ = { appName: "file-hash-proof" };`}
        </Script>
      </body>
    </html>
  );
}
