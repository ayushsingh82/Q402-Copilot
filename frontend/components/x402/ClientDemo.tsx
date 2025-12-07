"use client";

import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { createPaymentHeaderWithWallet, selectPaymentDetails, PaymentRequiredResponseSchema, PaymentDetailsSchema } from "@q402/core";
import type { z } from "zod";

// Define types from schemas
type PaymentRequiredResponse = z.infer<typeof PaymentRequiredResponseSchema>;
type PaymentDetails = z.infer<typeof PaymentDetailsSchema>;

export default function X402ClientDemo() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [status, setStatus] = useState<string>("");
  const [paymentHeader, setPaymentHeader] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleRequestResource = async () => {
    if (!isConnected || !address || !walletClient) {
      setStatus("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setStatus("Requesting resource...");
    setResponse("");
    setPaymentHeader("");

    try {
      // First request - should get 402 Payment Required
      const firstResponse = await fetch("/api/demo-resource");
      
      if (firstResponse.status === 402) {
        const paymentRequired: PaymentRequiredResponse = await firstResponse.json();
        setStatus("Received 402 Payment Required. Creating payment...");
        setResponse(`Status: ${firstResponse.status}\n\nResponse:\n${JSON.stringify(paymentRequired, null, 2)}`);
        
        // Select payment details
        const paymentDetails = selectPaymentDetails(paymentRequired, {
          network: "bsc-testnet",
        });

        if (!paymentDetails) {
          setStatus("No suitable payment method found");
          return;
        }

        // Update payment details with user's address
        const updatedPaymentDetails: PaymentDetails = {
          ...paymentDetails,
          witness: {
            ...paymentDetails.witness,
            message: {
              ...paymentDetails.witness.message,
              owner: address,
            },
          },
        };

        try {
          // Create payment header
          const header = await createPaymentHeaderWithWallet(walletClient, updatedPaymentDetails);
          setPaymentHeader(header);
          setStatus("Payment created. Sending request with payment...");

          // Make second request with payment
          const secondResponse = await fetch("/api/demo-resource", {
            headers: {
              "X-PAYMENT": header,
            },
          });

          const result = await secondResponse.json();
          
          if (secondResponse.ok) {
            setStatus("✅ Payment successful! Resource received.");
            setResponse(`Status: ${secondResponse.status}\n\nResponse:\n${JSON.stringify(result, null, 2)}`);
          } else {
            setStatus(`❌ Payment failed: ${result.error || "Unknown error"}`);
            setResponse(`Status: ${secondResponse.status}\n\nResponse:\n${JSON.stringify(result, null, 2)}`);
          }
        } catch (error) {
          setStatus(`Error creating payment: ${error instanceof Error ? error.message : "Unknown error"}`);
          setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      } else {
        const data = await firstResponse.json();
        setResponse(`Status: ${firstResponse.status}\n\nResponse:\n${JSON.stringify(data, null, 2)}`);
        setStatus("Resource received (no payment required)");
      }
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      setResponse(`Error occurred: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!isConnected && (
        <div className="p-4 bg-zinc-900 border border-zinc-600 rounded">
          <p className="text-zinc-300 text-sm">
            Connect your wallet to create and send payments
          </p>
        </div>
      )}

      {isConnected && (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900 border border-zinc-600 rounded">
            <p className="text-zinc-300 text-sm mb-2">
              <strong>Connected:</strong> {address}
            </p>
          </div>

          <button
            onClick={handleRequestResource}
            disabled={loading}
            className="w-full px-4 py-2 border border-zinc-400 text-white hover:bg-zinc-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Request Protected Resource"}
          </button>

          {status && (
            <div className="p-4 bg-zinc-900 border border-zinc-600 rounded">
              <p className="text-zinc-300 text-sm">
                <strong>Status:</strong> {status}
              </p>
            </div>
          )}

          {paymentHeader && (
            <div className="p-4 bg-zinc-900 border border-zinc-600 rounded">
              <p className="text-zinc-300 text-xs mb-2">
                <strong>X-PAYMENT Header:</strong>
              </p>
              <pre className="text-xs text-zinc-400 break-all">
                {paymentHeader.substring(0, 100)}...
              </pre>
            </div>
          )}

          {response && (
            <div className="p-4 bg-zinc-900 border border-zinc-600 rounded">
              <p className="text-zinc-300 text-xs mb-2">
                <strong>Server Response:</strong>
              </p>
              <pre className="text-xs text-zinc-400 whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
                {response}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
