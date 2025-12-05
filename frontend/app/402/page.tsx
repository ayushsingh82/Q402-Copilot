"use client";

import Navbar from "@/components/Navbar";
import Client from "@/components/x402/Client";
import Server from "@/components/x402/Server";

export default function X402Page() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 text-white" style={{ fontFamily: "'Georgia', 'Palatino', serif" }}>
              x402 Payment Protocol Demo
            </h1>
            <p className="text-xl text-zinc-300">
              Experience gasless payments powered by EIP-7702 delegated execution
            </p>
          </div>

          {/* Client and Server Demos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Client */}
            <div className="border border-zinc-400 p-6">
              <h2 className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: "'Georgia', 'Palatino', serif" }}>
                Client
              </h2>
              <p className="text-zinc-300 mb-6">
                Create and sign payments. Request resources from the server with X-PAYMENT header.
              </p>
              <Client />
            </div>

            {/* Server */}
            <div className="border border-zinc-400 p-6">
              <h2 className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: "'Georgia', 'Palatino', serif" }}>
                Server
              </h2>
              <p className="text-zinc-300 mb-6">
                Server endpoint that requires payment. Returns 402 Payment Required when no payment provided.
              </p>
              <Server />
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-12 border border-zinc-400 p-8">
            <h2 className="text-3xl font-bold mb-6 text-white" style={{ fontFamily: "'Georgia', 'Palatino', serif" }}>
              How x402 Works
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-zinc-400 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Request Resource</h3>
                  <p className="text-zinc-300">
                    Client requests a protected resource from the server.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-zinc-400 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">402 Payment Required</h3>
                  <p className="text-zinc-300">
                    Server responds with 402 status and payment details (amount, token, recipient).
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-zinc-400 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Create Payment</h3>
                  <p className="text-zinc-300">
                    Client creates EIP-712 witness signature and EIP-7702 authorization tuple, then combines them into X-PAYMENT header.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-zinc-400 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Send Payment</h3>
                  <p className="text-zinc-300">
                    Client sends request again with X-PAYMENT header containing signed payment proof.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-zinc-400 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Verify & Settle</h3>
                  <p className="text-zinc-300">
                    Server verifies payment via facilitator, then facilitator submits transaction (pays gas). Server returns resource with X-PAYMENT-RESPONSE.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

