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
            <h1 className="text-5xl font-bold mb-6 highlight-blue" style={{ fontFamily: 'cursive' }}>
              NFT Generator
            </h1>
            <p className="text-xl text-zinc-300">
              Generate AI-powered NFT images using ChainGPT AI NFT Generator SDK
            </p>
          </div>

          <div className="border border-zinc-400 p-8 space-y-6">
            <div>
              <label className="block text-zinc-300 mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-zinc-600 text-white rounded"
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
                  className="w-full px-4 py-2 bg-black border border-zinc-600 text-white rounded"
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
                  className="w-full px-4 py-2 bg-black border border-zinc-600 text-white rounded"
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
                  className="w-full px-4 py-2 bg-black border border-zinc-600 text-white rounded"
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
                  className="w-full px-4 py-2 bg-black border border-zinc-600 text-white rounded"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-2">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-black border border-zinc-600 text-white rounded"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full px-8 py-3 border border-zinc-400 text-white hover:bg-zinc-900 transition-colors disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate NFT Image"}
            </button>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500 rounded">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="p-4 bg-zinc-900 border border-zinc-600 rounded">
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
