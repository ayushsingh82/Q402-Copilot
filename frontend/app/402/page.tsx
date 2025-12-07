"use client";

import Navbar from "@/components/Navbar";
import X402ClientDemo from "@/components/x402/ClientDemo";
import X402ServerDemo from "@/components/x402/ServerDemo";
import { useState } from "react";

export default function X402Page() {
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'cursive' }}>
              x402 Payment Protocol Demo
            </h1>
            <p className="text-xl text-zinc-300">
              Experience gasless payments powered by EIP-7702 delegated execution
            </p>
          </div>

          {/* Client and Server Demos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Client Demo */}
            <div className="frame-border p-6 relative">
              <div className="corner-top-left"></div>
              <div className="corner-top-right"></div>
              <div className="corner-bottom-left"></div>
              <div className="corner-bottom-right"></div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>
                Client Demo
              </h2>
              <p className="text-zinc-300 mb-6">
                Create and sign payments. Request resources from the server with X-PAYMENT header.
              </p>
              <X402ClientDemo />
            </div>

            {/* Server Demo */}
            <div className="frame-border p-6 relative">
              <div className="corner-top-left"></div>
              <div className="corner-top-right"></div>
              <div className="corner-bottom-left"></div>
              <div className="corner-bottom-right"></div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>
                Server Demo
              </h2>
              <p className="text-zinc-300 mb-6">
                Server endpoint that requires payment. Returns 402 Payment Required when no payment provided.
              </p>
              <X402ServerDemo />
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-12 frame-border p-8 relative">
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'cursive' }}>
              How x402 Works
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-white rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Request Resource</h3>
                  <p className="text-zinc-300">
                    Client requests a protected resource from the server.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-white rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">402 Payment Required</h3>
                  <p className="text-zinc-300">
                    Server responds with 402 status and payment details (amount, token, recipient).
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-white rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create Payment</h3>
                  <p className="text-zinc-300">
                    Client creates EIP-712 witness signature and EIP-7702 authorization tuple, then combines them into X-PAYMENT header.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-white rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Send Payment</h3>
                  <p className="text-zinc-300">
                    Client sends request again with X-PAYMENT header containing signed payment proof.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-white rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Verify & Settle</h3>
                  <p className="text-zinc-300">
                    Server verifies payment via facilitator, then facilitator submits transaction (pays gas). Server returns resource with X-PAYMENT-RESPONSE.
                  </p>
                </div>
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

