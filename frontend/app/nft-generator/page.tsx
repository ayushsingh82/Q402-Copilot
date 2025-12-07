"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function NFTGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("velogen");
  const [enhance, setEnhance] = useState("original");
  const [steps, setSteps] = useState(2);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [chainId, setChainId] = useState(97); // BNB Testnet
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/nft-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model,
          enhance,
          steps,
          width,
          height,
          chainId,
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
              NFT Generator
            </h1>
            <p className="text-xl text-zinc-300">
              Generate AI-powered NFT images using ChainGPT AI NFT Generator SDK
            </p>
          </div>

          <div className="frame-border p-8 space-y-6 relative">
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <div>
              <label className="block text-zinc-300 mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-white text-white rounded"
                rows={4}
                placeholder="Describe the NFT image you want to generate..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 mb-2">Model</label>
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
                <label className="block text-zinc-300 mb-2">Enhance</label>
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

              <div>
                <label className="block text-zinc-300 mb-2">Steps</label>
                <input
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-black border border-white text-white rounded"
                  min="1"
                  max="50"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-2">Width</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-black border border-white text-white rounded"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-2">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-black border border-white text-white rounded"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-2">Chain ID</label>
                <select
                  value={chainId}
                  onChange={(e) => setChainId(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-black border border-white text-white rounded"
                >
                  <option value={97}>BNB Smart Chain Testnet (97)</option>
                  <option value={56}>BNB Smart Chain Mainnet (56)</option>
                  <option value={1}>Ethereum Mainnet (1)</option>
                  <option value={137}>Polygon Mainnet (137)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full px-8 py-3 border border-white text-white hover:bg-zinc-900 transition-colors disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate NFT Image"}
            </button>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500 rounded">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="p-4 bg-zinc-900 frame-border rounded relative">
                <div className="corner-top-left"></div>
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>
                <div className="corner-bottom-right"></div>
                {result.startsWith("http") || result.startsWith("data:") ? (
                  <img src={result} alt="Generated NFT" className="max-w-full rounded" />
                ) : (
                  <p className="text-zinc-300">{result}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
