"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function ContractAuditorPage() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<"on" | "off">("off");
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
          chatHistory,
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
          chatHistory,
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
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'cursive' }}>
              Smart Contract Auditor
            </h1>
            <p className="text-xl text-zinc-300">
              Audit smart contracts using ChainGPT Smart Contract Auditor SDK
            </p>
          </div>

          <div className="frame-border p-8 space-y-6 relative">
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <div>
              <label className="block text-zinc-300 mb-2">Contract Code</label>
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

            <div>
              <label className="block text-zinc-300 mb-2">Chat History</label>
              <select
                value={chatHistory}
                onChange={(e) => setChatHistory(e.target.value as "on" | "off")}
                className="w-full px-4 py-2 bg-black border border-white text-white rounded"
              >
                <option value="off">Off</option>
                <option value="on">On</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAuditBlob}
                disabled={loading || streaming}
                className="flex-1 px-8 py-3 border border-white text-white hover:bg-zinc-900 transition-colors disabled:opacity-50"
              >
                {loading ? "Auditing..." : "Audit (Full Report)"}
              </button>
              <button
                onClick={handleAuditStream}
                disabled={loading || streaming}
                className="flex-1 px-8 py-3 border border-white text-white hover:bg-zinc-900 transition-colors disabled:opacity-50"
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
              <div className="p-4 bg-zinc-900 frame-border rounded relative">
                <div className="corner-top-left"></div>
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>
                <div className="corner-bottom-right"></div>
                <h3 className="text-lg font-semibold mb-2 text-white">Audit Report:</h3>
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">
                  {result}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
