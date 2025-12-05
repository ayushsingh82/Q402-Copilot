import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "q402-copilot",
  description: "Chat-based Web3 Copilot on BNB Chain powered by ChainGPT and x402",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
