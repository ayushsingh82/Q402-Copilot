"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function ContractAuditorPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);

  const handleAuditBlob = async () => {
    if (!question.trim()) {
      setError("Please enter a contract to audit");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/contract-auditor/audit", {
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
        throw new Error(data.error || "Failed to audit contract");
      }

      setResult(data.audit || data.bot || "Audit completed successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAuditStream = async () => {
    if (!question.trim()) {
      setError("Please enter a contract to audit");
      return;
    }

    setStreaming(true);
    setError(null);
    setResult("");

    try {
      const response = await fetch("/api/contract-auditor/stream", {
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
        <div className="bg-black">
          <Navbar />
        </div>
        <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'cursive', color: '#000000', WebkitTextFillColor: '#000000', background: 'none' }}>
              Smart Contract Auditor
            </h1>
            <p className="text-xl" style={{ color: '#000000' }}>
              Audit smart contracts using ChainGPT Smart Contract Auditor SDK
            </p>
          </div>

          <div className="frame-border p-8 space-y-6 relative" style={{ zIndex: 20 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <div>
              <label className="block mb-2" style={{ color: '#000000' }}>Contract Code</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-white text-white rounded font-mono text-sm"
                rows={12}
                placeholder="Paste your Solidity contract code here, e.g.:
pragma solidity ^0.8.0;

contract Counter {
  uint256 private count;
  
  constructor() {
    count = 0;
  }
  
  function increment() public {
    count += 1;
  }
}"
              />
            </div>

            <div className="flex gap-4" style={{ zIndex: 25 }}>
              <button
                onClick={handleAuditBlob}
                disabled={loading || streaming}
                className="flex-1 px-8 py-3 transition-colors disabled:opacity-50 relative"
                style={{ zIndex: 26, color: '#000000', border: '1px solid #000000' }}
              >
                {loading ? "Auditing..." : "Audit (Full Report)"}
              </button>
              <button
                onClick={handleAuditStream}
                disabled={loading || streaming}
                className="flex-1 px-8 py-3 transition-colors disabled:opacity-50 relative"
                style={{ zIndex: 26, color: '#000000', border: '1px solid #000000' }}
              >
                {streaming ? "Streaming..." : "Audit (Stream)"}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500 rounded">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="p-4 bg-black frame-border rounded relative" style={{ zIndex: 50 }}>
                <div className="corner-top-left"></div>
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>
                <div className="corner-bottom-right"></div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>Audit Report:</h3>
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
