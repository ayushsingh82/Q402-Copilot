"use client";

import { useState } from "react";

export default function X402ServerDemo() {
  const [endpoint, setEndpoint] = useState("/api/demo-resource");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleTestEndpoint = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      
      setResponse(
        `Status: ${res.status} ${res.statusText}\n\n` +
        `Headers:\n${JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2)}\n\n` +
        `Body:\n${JSON.stringify(data, null, 2)}`
      );
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTestWithPayment = async () => {
    setLoading(true);
    setResponse("");

    try {
      // First request to get 402 response
      const firstRes = await fetch(endpoint);
      
      if (firstRes.status === 402) {
        const paymentRequired = await firstRes.json();
        setResponse(
          `First Request - Status: ${firstRes.status}\n\n` +
          `Payment Required Response:\n${JSON.stringify(paymentRequired, null, 2)}\n\n` +
          `\nTo complete payment:\n` +
          `1. Use Client Demo component with connected wallet\n` +
          `2. It will create payment signature\n` +
          `3. Make second request with X-PAYMENT header\n` +
          `4. Server verifies and returns resource`
        );
      } else {
        const data = await firstRes.json();
        setResponse(`Status: ${firstRes.status}\n\nResponse:\n${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-zinc-900 border border-zinc-600 rounded">
        <p className="text-zinc-300 text-sm mb-4">
          Test the server endpoint that requires payment. The server will return
          402 Payment Required when no payment is provided.
        </p>

        <div className="space-y-2 mb-4">
          <label className="text-zinc-300 text-sm block">
            Endpoint:
          </label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full px-3 py-2 bg-black border border-zinc-600 text-white text-sm"
            placeholder="/api/demo-resource"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleTestEndpoint}
            disabled={loading}
            className="px-4 py-2 border border-zinc-400 text-white hover:bg-zinc-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Without Payment"}
          </button>
          <button
            onClick={handleTestWithPayment}
            disabled={loading}
            className="px-4 py-2 border border-zinc-400 text-white hover:bg-zinc-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Payment Flow"}
          </button>
        </div>
      </div>

      {response && (
        <div className="p-4 bg-zinc-900 border border-zinc-600 rounded">
          <p className="text-zinc-300 text-xs mb-2">
            <strong>Response:</strong>
          </p>
          <pre className="text-xs text-zinc-400 whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
            {response}
          </pre>
        </div>
      )}

      <div className="p-4 bg-zinc-900 border border-zinc-600 rounded">
        <p className="text-zinc-300 text-xs">
          <strong>Server Implementation:</strong>
          <br />
          • Next.js API route at /api/demo-resource
          <br />
          • Returns 402 Payment Required for protected resources
          <br />
          • Verifies X-PAYMENT header using @q402/core
          <br />
          • Returns resource with payment info when valid
          <br />
          • Uses @q402/core verifyPayment() function
        </p>
      </div>
    </div>
  );
}
