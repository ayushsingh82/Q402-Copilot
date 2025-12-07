"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function SmartContractsPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateBlob = async () => {
    if (!question.trim()) {
      setError("Please enter a contract description");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/smart-contracts/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          chatHistory: "off",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate smart contract");
      }

      setResult(data.contract || data.bot || "Contract generated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateStream = async () => {
    if (!question.trim()) {
      setError("Please enter a contract description");
      return;
    }

    setStreaming(true);
    setError(null);
    setResult("");

    try {
      const response = await fetch("/api/smart-contracts/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          chatHistory: "off",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to start stream");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response stream available");
      }

      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setResult(accumulated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setStreaming(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans relative">
      {/* Full page background image */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://img.freepik.com/free-vector/hand-painted-blue-sky-background-with-fluffy-white-clouds_1048-18892.jpg?semt=ais_se_enriched&w=740&q=80)',
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
              Smart Contracts Generator
            </h1>
            <p className="text-xl" style={{ color: '#000000' }}>
              Generate Solidity smart contracts using ChainGPT Smart Contracts Generator SDK
            </p>
          </div>

          <div className="frame-border p-8 space-y-6 relative" style={{ zIndex: 20 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <div>
              <label className="block mb-2" style={{ color: '#000000' }}>Contract Description</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-white text-white rounded"
                rows={6}
                placeholder="Describe the smart contract you want to generate, e.g., 'Create an ERC-20 token contract with a mint function'"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleGenerateBlob}
                disabled={loading || streaming}
                className="flex-1 px-8 py-3 transition-colors disabled:opacity-50"
                style={{ color: '#000000', border: '1px solid #000000' }}
              >
                {loading ? "Generating..." : "Generate (Full Response)"}
              </button>
              <button
                onClick={handleGenerateStream}
                disabled={loading || streaming}
                className="flex-1 px-8 py-3 transition-colors disabled:opacity-50"
                style={{ color: '#000000', border: '1px solid #000000' }}
              >
                {streaming ? "Streaming..." : "Generate (Stream)"}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500 rounded">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="p-4 bg-black frame-border rounded relative" style={{ zIndex: 30 }}>
                <div className="corner-top-left"></div>
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>
                <div className="corner-bottom-right"></div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold" style={{ color: '#000000' }}>Generated Contract:</h3>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 transition-colors rounded text-sm"
                    style={{ color: '#000000', border: '1px solid #000000' }}
                    title="Copy code"
                  >
                    {copied ? (
                      <>
                        <span>✅</span>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">
                  {result}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
