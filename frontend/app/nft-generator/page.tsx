"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { parseUnits } from "viem";

// Recipient address
const RECIPIENT_ADDRESS = "0x1dfb55af7e14096c836c70a4fe26efd890c4e444" as const;
// Amount: 0.01 BNB (18 decimals)
const AMOUNT = parseUnits("0.01", 18);

export default function NFTGeneratorPage() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("velogen");
  const [enhance, setEnhance] = useState("original");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    if (!isConnected || !address || !walletClient || !publicClient) {
      setError("Please connect your wallet to proceed");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setPaymentStatus("");

    try {
      // Send native BNB transaction
      setPaymentStatus("Sending payment transaction...");
      
      const hash = await walletClient.sendTransaction({
        account: address,
        to: RECIPIENT_ADDRESS,
        value: AMOUNT,
      });

      setPaymentStatus(`Transaction sent: ${hash.substring(0, 10)}... Waiting for confirmation...`);

      // Wait for transaction confirmation
      await publicClient.waitForTransactionReceipt({ hash });

      setPaymentStatus("Payment confirmed! Generating NFT...");

      // Make API call to generate NFT
      const response = await fetch("/api/nft-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model,
          enhance,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate NFT");
      }

      if (data.imageUrl) {
        setResult(data.imageUrl);
      } else {
        setResult("Image generated successfully! Check the response for details.");
      }
      setPaymentStatus("Payment successful!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setPaymentStatus("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans relative">
      {/* Full page background image */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://img.freepik.com/premium-photo/sky-with-beautiful-cloud-background_570543-6327.jpg?semt=ais_hybrid&w=740&q=80)',
          zIndex: 0
        }}
      />
      
      {/* Content with higher z-index */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'cursive', color: '#000000', WebkitTextFillColor: '#000000', background: 'none' }}>
              NFT Generator
            </h1>
            <p className="text-xl" style={{ color: '#000000' }}>
              Generate AI-powered NFT images using ChainGPT AI NFT Generator SDK
            </p>
          </div>

          <div className="frame-border p-8 space-y-6 relative" style={{ zIndex: 20 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <div>
              <label className="block mb-2" style={{ color: '#000000' }}>Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                style={{ backgroundColor: '#ffffff', color: '#000000', borderColor: '#000000' }}
                rows={4}
                placeholder="Describe the NFT image you want to generate..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2" style={{ color: '#000000' }}>Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-2 bg-black border border-white text-white rounded"
                >
                  <option value="velogen">VeloGen</option>
                  <option value="nebula_forge_xl">Nebula Forge XL</option>
                  <option value="VisionaryForge">VisionaryForge</option>
                </select>
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#000000' }}>Enhance</label>
                <select
                  value={enhance}
                  onChange={(e) => setEnhance(e.target.value)}
                  className="w-full px-4 py-2 bg-black border border-white text-white rounded"
                >
                  <option value="original">Original</option>
                  <option value="1x">1x Enhancement</option>
                  <option value="2x">2x Enhancement</option>
                </select>
              </div>
            </div>

            {!isConnected && (
              <div className="p-4 bg-yellow-100 border border-yellow-400 rounded" style={{ backgroundColor: '#fff3cd', borderColor: '#ffc107' }}>
                <p style={{ color: '#000000' }}>Please connect your wallet to generate NFTs</p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !isConnected}
              className="w-full px-8 py-3 transition-colors disabled:opacity-50"
              style={{ color: '#000000', border: '1px solid #000000' }}
            >
              {loading ? (paymentStatus || "Generating...") : "Pay 0.01 BNB to proceed"}
            </button>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500 rounded">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {paymentStatus && !error && (
              <div className="p-4 bg-blue-100 border border-blue-400 rounded" style={{ backgroundColor: '#d1ecf1', borderColor: '#0c5460' }}>
                <p style={{ color: '#000000' }}>{paymentStatus}</p>
              </div>
            )}

            {result && (
              <div className="p-4 frame-border rounded relative" style={{ zIndex: 30, backgroundColor: '#ffffff' }}>
                <div className="corner-top-left"></div>
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>
                <div className="corner-bottom-right"></div>
                {result.startsWith("http") || result.startsWith("data:") ? (
                  <img src={result} alt="Generated NFT" className="max-w-full rounded" />
                ) : (
                  <p style={{ color: '#000000' }}>{result}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
