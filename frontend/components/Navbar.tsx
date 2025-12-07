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
    <nav className="w-full border-b border-white relative">
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="text-2xl font-bold text-white" style={{ fontFamily: 'cursive' }}>
           Q402-Copilot
          </Link>

          {/* Navigation Links - Middle */}
          <div className="flex items-center gap-0 relative">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <div key={item.path} className="flex items-center relative frame-border">
                  <div className="corner-top-left"></div>
                  <div className="corner-top-right"></div>
                  <div className="corner-bottom-left"></div>
                  <div className="corner-bottom-right"></div>
                  {/* Left separator - spans full height of nav container */}
                  <div className="nav-separator left-0"></div>
                  <Link
                    href={item.path}
                    className={`text-base font-medium transition-colors px-6 py-2 relative z-10 ${
                      isActive
                        ? "text-white border-b-2 border-white"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                  {/* Right separator - spans full height of nav container */}
                  <div className="nav-separator right-0"></div>
                </div>
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

