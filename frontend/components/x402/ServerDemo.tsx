"use client";

import { useState } from "react";

export default function X402ServerDemo() {
  const [serverRunning, setServerRunning] = useState(false);
  const [serverPort, setServerPort] = useState("3001");
  const [endpoints, setEndpoints] = useState([
    {
      path: "/api/premium-data",
      amount: "1000000",
      token: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
      description: "Premium API access",
    },
  ]);

  const startServer = () => {
    // This is a demo - in real implementation, you would start an Express server
    setServerRunning(true);
  };

  const stopServer = () => {
    setServerRunning(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Server Port
        </label>
        <input
          type="text"
          value={serverPort}
          onChange={(e) => setServerPort(e.target.value)}
          disabled={serverRunning}
          className="w-full px-4 py-2 bg-black border border-zinc-400 text-white rounded focus:outline-none focus:border-white disabled:opacity-50"
          placeholder="3001"
        />
      </div>

      <div className="p-4 bg-zinc-900 border border-zinc-400 rounded">
        <h4 className="text-sm font-semibold text-white mb-2">Protected Endpoints:</h4>
        <ul className="space-y-2">
          {endpoints.map((endpoint, idx) => (
            <li key={idx} className="text-sm text-zinc-300">
              <code className="text-zinc-400">GET</code>{" "}
              <code className="text-white">{endpoint.path}</code>
              <br />
              <span className="text-zinc-400">
                {endpoint.description} - {endpoint.amount} tokens
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        <button
          onClick={startServer}
          disabled={serverRunning}
          className="flex-1 px-4 py-2 border border-zinc-400 text-white hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {serverRunning ? "Running..." : "Start Server"}
        </button>
        <button
          onClick={stopServer}
          disabled={!serverRunning}
          className="flex-1 px-4 py-2 border border-zinc-400 text-white hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Stop Server
        </button>
      </div>

      {serverRunning && (
        <div className="p-4 bg-green-900/20 border border-green-400 rounded">
          <p className="text-sm text-green-300">
            ✅ Server running on http://localhost:{serverPort}
          </p>
          <p className="text-xs text-green-400 mt-2">
            Note: This is a UI demo. To run a real x402 server, use the Express example from the examples folder.
          </p>
        </div>
      )}

      <div className="p-4 bg-zinc-900 border border-zinc-400 rounded">
        <h4 className="text-sm font-semibold text-white mb-2">Server Code Example:</h4>
        <pre className="text-xs text-zinc-300 overflow-x-auto">
          {`import { createX402BnbMiddleware } from "@q402/middleware-express";

app.use(createX402BnbMiddleware({
  network: SupportedNetworks.BSC_TESTNET,
  recipientAddress: "0x...",
  implementationContract: "0x...",
  verifyingContract: "0x...",
  walletClient,
  endpoints: [
    {
      path: "/api/premium-data",
      amount: "1000000",
      token: "0x3376...",
      description: "Premium API access",
    },
  ],
  autoSettle: true,
}));`}
        </pre>
      </div>
    </div>
  );
}

