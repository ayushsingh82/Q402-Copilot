"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

export default function X402ClientDemo() {
  const { address, isConnected } = useAccount();
  const [serverUrl, setServerUrl] = useState("http://localhost:3001/api/premium-data");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [paymentHeader, setPaymentHeader] = useState<string | null>(null);

  const handleRequest = async () => {
    if (!isConnected) {
      setResponse("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      // Step 1: Request resource (will get 402)
      const res = await fetch(serverUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 402) {
        const paymentData = await res.json();
        setResponse(`402 Payment Required\n\nPayment Details:\n${JSON.stringify(paymentData, null, 2)}`);

        // Step 2: Create payment header (simplified - in real app, use @q402/core)
        const mockPaymentHeader = "mock_payment_header_" + Date.now();
        setPaymentHeader(mockPaymentHeader);

        // Step 3: Request again with payment header
        setTimeout(async () => {
          try {
            const paidRes = await fetch(serverUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-PAYMENT": mockPaymentHeader,
              },
            });

            if (paidRes.ok) {
              const data = await paidRes.json();
              setResponse(`✅ Payment Successful!\n\nResource Data:\n${JSON.stringify(data, null, 2)}`);
              setPaymentHeader(null);
            } else {
              setResponse(`❌ Payment failed: ${paidRes.status} ${paidRes.statusText}`);
            }
          } catch (error: any) {
            setResponse(`❌ Error: ${error.message}`);
          }
        }, 1000);
      } else if (res.ok) {
        const data = await res.json();
        setResponse(`✅ Resource received:\n${JSON.stringify(data, null, 2)}`);
      } else {
        setResponse(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (error: any) {
      setResponse(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Server URL
        </label>
        <input
          type="text"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
          className="w-full px-4 py-2 bg-black border border-zinc-400 text-white rounded focus:outline-none focus:border-white"
          placeholder="http://localhost:3001/api/premium-data"
        />
      </div>

      <button
        onClick={handleRequest}
        disabled={loading || !isConnected}
        className="w-full px-6 py-3 border border-zinc-400 text-white hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : !isConnected ? "Connect Wallet First" : "Request Resource"}
      </button>

      {paymentHeader && (
        <div className="p-4 bg-zinc-900 border border-zinc-400 rounded">
          <p className="text-sm text-zinc-400 mb-2">X-PAYMENT Header Created:</p>
          <code className="text-xs text-zinc-300 break-all">{paymentHeader}</code>
        </div>
      )}

      {response && (
        <div className="p-4 bg-zinc-900 border border-zinc-400 rounded">
          <p className="text-sm text-zinc-400 mb-2">Response:</p>
          <pre className="text-xs text-zinc-300 whitespace-pre-wrap break-all">
            {response}
          </pre>
        </div>
      )}

      {!isConnected && (
        <p className="text-sm text-zinc-400 text-center">
          Connect your wallet to create payments
        </p>
      )}
    </div>
  );
}

