"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function ChatPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setPaymentStatus("Payment processing...");

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setPaymentStatus("Payment confirmed!");
      setResult("Payment successful! Your transaction has been processed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setPaymentStatus("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'cursive' }}>
              ChainGPT SDK Network Support
            </h1>
            <p className="text-xl text-zinc-300 mb-8">
              Information about network compatibility for ChainGPT SDKs
            </p>
          </div>

          <div className="space-y-8">
            {/* NFT Generator SDK */}
            <div className="frame-border p-6 relative">
              <div className="corner-top-left"></div>
              <div className="corner-top-right"></div>
              <div className="corner-bottom-left"></div>
              <div className="corner-bottom-right"></div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>
                NFT Generator SDK (@chaingpt/nft)
              </h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  <strong className="text-white">Network Support:</strong> The NFT Generator SDK supports multiple blockchain networks for minting NFTs.
                </p>
                <div>
                  <strong className="text-white">Supported Networks:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Ethereum Mainnet (Chain ID: 1)</li>
                    <li>BNB Smart Chain Mainnet (Chain ID: 56)</li>
                    <li>BNB Smart Chain Testnet (Chain ID: 97)</li>
                    <li>Polygon Mainnet (Chain ID: 137)</li>
                    <li>Arbitrum</li>
                    <li>Avalanche</li>
                    <li>Tron</li>
                    <li>And many more...</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-white">Usage:</strong> When calling <code className="bg-zinc-900 px-2 py-1 rounded">generateNft()</code> or <code className="bg-zinc-900 px-2 py-1 rounded">generateNftWithQueue()</code>, you specify the <code className="bg-zinc-900 px-2 py-1 rounded">chainId</code> parameter to indicate which network to mint on.
                </p>
                <p>
                  <strong className="text-white">Note:</strong> You can retrieve the full list of supported networks at runtime using the <code className="bg-zinc-900 px-2 py-1 rounded">getChains()</code> method.
                </p>
              </div>
            </div>

            {/* Smart Contracts Generator SDK */}
            <div className="frame-border p-6 relative">
              <div className="corner-top-left"></div>
              <div className="corner-top-right"></div>
              <div className="corner-bottom-left"></div>
              <div className="corner-bottom-right"></div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>
                Smart Contracts Generator SDK (@chaingpt/smartcontractgenerator)
              </h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  <strong className="text-white">Network Support:</strong> <span className="text-yellow-400">This SDK does NOT work on any blockchain network.</span>
                </p>
                <p>
                  The Smart Contracts Generator SDK is a code generation tool that creates Solidity smart contract code from natural language prompts. It does not interact with any blockchain network.
                </p>
                <p>
                  <strong className="text-white">What it does:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Generates Solidity contract code from text descriptions</li>
                  <li>Works offline/on-chain agnostic</li>
                  <li>Returns contract code that you can then deploy to any EVM-compatible network</li>
                </ul>
                <p>
                  <strong className="text-white">Usage:</strong> After generating the contract code, you can deploy it to any EVM-compatible blockchain (Ethereum, BNB Chain, Polygon, etc.) using standard deployment tools.
                </p>
              </div>
            </div>

            {/* Smart Contract Auditor SDK */}
            <div className="frame-border p-6 relative">
              <div className="corner-top-left"></div>
              <div className="corner-top-right"></div>
              <div className="corner-bottom-left"></div>
              <div className="corner-bottom-right"></div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>
                Smart Contract Auditor SDK (@chaingpt/smartcontractauditor)
              </h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  <strong className="text-white">Network Support:</strong> <span className="text-yellow-400">This SDK does NOT work on any blockchain network.</span>
                </p>
                <p>
                  The Smart Contract Auditor SDK analyzes Solidity smart contract code for security vulnerabilities and best practices. It does not interact with any blockchain network.
                </p>
                <p>
                  <strong className="text-white">What it does:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Analyzes contract code for security issues</li>
                  <li>Checks for reentrancy vulnerabilities</li>
                  <li>Identifies access control issues</li>
                  <li>Detects integer overflow/underflow risks</li>
                  <li>Provides gas optimization suggestions</li>
                  <li>Validates best practices compliance</li>
                </ul>
                <p>
                  <strong className="text-white">Usage:</strong> You provide the contract code as a string, and the SDK returns an audit report. This works for contracts intended for any EVM-compatible network.
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="frame-border p-6 bg-zinc-900/50 relative">
              <div className="corner-top-left"></div>
              <div className="corner-top-right"></div>
              <div className="corner-bottom-left"></div>
              <div className="corner-bottom-right"></div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>
                Summary
              </h2>
              <div className="space-y-2 text-zinc-300">
                <p>
                  <strong className="text-white">NFT Generator:</strong> ✅ Works on multiple networks (Ethereum, BNB Chain, Polygon, Arbitrum, Avalanche, Tron, etc.)
                </p>
                <p>
                  <strong className="text-white">Smart Contracts Generator:</strong> ❌ No network - generates code only
                </p>
                <p>
                  <strong className="text-white">Smart Contract Auditor:</strong> ❌ No network - audits code only
                </p>
                <p className="mt-4 pt-4 border-t border-white">
                  <strong className="text-white">Important:</strong> All SDKs require a ChainGPT API key and sufficient credits to function. The NFT Generator is the only SDK that actually interacts with blockchain networks for minting NFTs.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mt-12 frame-border p-6 relative">
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>
              Payment
            </h2>
            
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full px-8 py-3 transition-colors disabled:opacity-50 text-white border border-white hover:bg-zinc-900"
            >
              {loading ? (paymentStatus || "Processing...") : "Pay 0.1 USDC to proceed"}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {paymentStatus && !error && (
              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500 rounded">
                <p className="text-blue-400">{paymentStatus}</p>
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 frame-border rounded relative" style={{ zIndex: 50, backgroundColor: '#ffffff' }}>
                <div className="corner-top-left"></div>
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>
                <div className="corner-bottom-right"></div>
                <p style={{ color: '#000000' }}>{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
