"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function ContractAuditorPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  const handleAuditBlob = async () => {
    if (!question.trim()) {
      setError("Please enter a contract to audit");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setPaymentStatus("Payment processing...");

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setPaymentStatus("Payment confirmed! Auditing contract...");

      // Make API call to audit contract
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
                className="w-full px-4 py-2 border rounded font-mono text-sm"
                style={{ backgroundColor: '#ffffff', color: '#000000', borderColor: '#000000' }}
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

            <button
              onClick={handleAuditBlob}
              disabled={loading}
              className="w-full px-8 py-3 transition-colors disabled:opacity-50"
              style={{ color: '#000000', border: '1px solid #000000' }}
            >
              {loading ? (paymentStatus || "Auditing...") : "Pay 0.1 USDC to proceed"}
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
              <div className="p-4 frame-border rounded relative" style={{ zIndex: 50, backgroundColor: '#ffffff' }}>
                <div className="corner-top-left"></div>
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>
                <div className="corner-bottom-right"></div>
                <pre className="text-sm whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto" style={{ color: '#000000' }}>
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
