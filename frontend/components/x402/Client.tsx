"use client";

import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { createPaymentHeaderWithWallet, selectPaymentDetails, SupportedNetworks } from "@q402/core";
import type { PaymentRequiredResponse } from "@q402/core";

export default function Client() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [serverUrl, setServerUrl] = useState("http://localhost:3001/api/premium-data");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [paymentHeader, setPaymentHeader] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const handleRequest = async () => {
    if (!isConnected || !walletClient || !address) {
      setResponse("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setResponse(null);
    setPaymentHeader(null);
    setPaymentDetails(null);

    try {
      // Step 1: Request resource (will get 402)
      const res = await fetch(serverUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 402) {
        const paymentData: PaymentRequiredResponse = await res.json();
        setPaymentDetails(paymentData);
        setResponse(`402 Payment Required\n\nPayment Details:\n${JSON.stringify(paymentData, null, 2)}`);

        // Step 2: Select payment details
        const selectedPayment = selectPaymentDetails(paymentData, {
          network: SupportedNetworks.BSC_TESTNET,
        });

        if (!selectedPayment) {
          setResponse("❌ No suitable payment method found");
          setLoading(false);
          return;
        }

        // Step 3: Create payment header using real x402 library
        try {
          const header = await createPaymentHeaderWithWallet(walletClient, selectedPayment);
          setPaymentHeader(header);
          setResponse(
            `✅ Payment Header Created!\n\nUsing:\n- Network: ${selectedPayment.networkId}\n- Token: ${selectedPayment.token}\n- Amount: ${selectedPayment.amount}\n- Recipient: ${selectedPayment.to}\n\nHeader: ${header.substring(0, 50)}...`
          );

          // Step 4: Request again with payment header
          setTimeout(async () => {
            try {
              const paidRes = await fetch(serverUrl, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "X-PAYMENT": header,
                },
              });

              if (paidRes.ok) {
                const data = await paidRes.json();
                const paymentResponse = paidRes.headers.get("X-PAYMENT-RESPONSE");
                setResponse(
                  `✅ Payment Successful!\n\nResource Data:\n${JSON.stringify(data, null, 2)}${
                    paymentResponse ? `\n\nX-PAYMENT-RESPONSE: ${paymentResponse}` : ""
                  }`
                );
                setPaymentHeader(null);
              } else {
                const errorData = await paidRes.json().catch(() => ({}));
                setResponse(
                  `❌ Payment failed: ${paidRes.status} ${paidRes.statusText}\n\n${JSON.stringify(errorData, null, 2)}`
                );
              }
            } catch (error: any) {
              setResponse(`❌ Error sending payment: ${error.message}`);
            } finally {
              setLoading(false);
            }
          }, 1000);
        } catch (error: any) {
          setResponse(`❌ Error creating payment: ${error.message}\n\n${error.stack || ""}`);
          setLoading(false);
        }
      } else if (res.ok) {
        const data = await res.json();
        setResponse(`✅ Resource received:\n${JSON.stringify(data, null, 2)}`);
        setLoading(false);
      } else {
        setResponse(`Error: ${res.status} ${res.statusText}`);
        setLoading(false);
      }
    } catch (error: any) {
      setResponse(`❌ Error: ${error.message}`);
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


