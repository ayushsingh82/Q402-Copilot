"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navItems = [
  { name: "NFT Generator", path: "/nft-generator" },
  { name: "Smart Contracts", path: "/smart-contracts" },
  { name: "Contract Auditor", path: "/contract-auditor" },
  { name: "402", path: "/402" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-zinc-400">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="text-2xl font-bold text-white" style={{ fontFamily: 'cursive' }}>
           Q402-Copilot
          </Link>

          {/* Navigation Links - Middle */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-base font-medium transition-colors ${
                    isActive
                      ? "text-white border-b-2 border-white"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Wallet Connect Button - Right */}
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

