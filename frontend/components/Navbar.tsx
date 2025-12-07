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
    <nav 
      className="w-full relative" 
      style={{ 
        zIndex: 15, 
        borderBottom: '1px solid #000000',
        backgroundImage: 'url(https://img.freepik.com/free-vector/hand-painted-blue-sky-background-with-fluffy-white-clouds_1048-18892.jpg?semt=ais_se_enriched&w=740&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="text-2xl font-bold" style={{ fontFamily: 'cursive', color: '#000000' }}>
           Q402-Copilot
          </Link>

          {/* Navigation Links - Middle */}
          <div className="flex items-center gap-0 relative">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-base font-medium transition-colors px-6 py-2 relative z-10"
                  style={{
                    color: '#000000',
                    borderBottom: isActive ? '2px solid #000000' : 'none'
                  }}
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

