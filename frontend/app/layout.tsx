import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "q402 - Web3 Copilot",
  description: "Chat-based Web3 Copilot on BNB Chain powered by ChainGPT and x402",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
