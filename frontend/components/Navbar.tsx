"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navItems = [
  { name: "Chat", path: "/chat" },
  { name: "Transactions", path: "/transactions" },
  { name: "402", path: "/402" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(5, 5, 5, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        zIndex: 100,
      }}
    >
      {/* Logo/Brand */}
      <Link
        href="/"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "var(--orange)",
          textShadow: "0 0 10px var(--orange-glow)",
          textDecoration: "none",
          fontFamily: "'Georgia', 'Palatino', serif",
        }}
      >
        q402-copilot
      </Link>

      {/* Navigation Links - Middle */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              style={{
                color: isActive ? "var(--orange)" : "var(--text)",
                textDecoration: "none",
                transition: "color 0.3s",
                borderBottom: isActive ? "2px solid var(--orange)" : "none",
                paddingBottom: isActive ? "4px" : "0",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "var(--orange)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = "var(--text)";
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Wallet Connect Button - Right */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <ConnectButton />
      </div>
    </nav>
  );
}

