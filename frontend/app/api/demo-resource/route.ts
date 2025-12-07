import { NextRequest, NextResponse } from "next/server";
import { create402Response } from "@/lib/x402-server";
import { verifyPayment, settlePayment } from "@q402/core";
import { decodeBase64, encodeBase64 } from "@q402/core";

// Define the payment payload type locally
type SignedPaymentPayload = {
  paymentDetails: {
    amount: string;
    token: string;
    [key: string]: any;
  };
  signature: string;
  [key: string]: any;
};

const X_PAYMENT_HEADER = "x-payment";
const X_PAYMENT_RESPONSE_HEADER = "x-payment-response";

// Mock wallet client for settlement (in production, use actual wallet)
// For demo purposes, we'll skip actual settlement
const DEMO_CONFIG = {
  network: "bsc-testnet" as const,
  recipientAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" as const,
  implementationContract: "0x0000000000000000000000000000000000000000" as const, // Replace with actual
  verifyingContract: "0x0000000000000000000000000000000000000000" as const, // Replace with actual
  token: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd" as const, // USDT on BSC testnet
  amount: "1000000", // 1 USDT (6 decimals)
};

export async function GET(request: NextRequest) {
  try {
    // Check for X-PAYMENT header
    const paymentHeader = request.headers.get(X_PAYMENT_HEADER);

    if (!paymentHeader) {
      // No payment header - return 402
      const response = create402Response(DEMO_CONFIG);
      return NextResponse.json(response, { status: 402 });
    }

    // Decode payment payload
    let payload: SignedPaymentPayload;
    try {
      payload = decodeBase64(paymentHeader) as SignedPaymentPayload;
    } catch (error) {
      return NextResponse.json(
        {
          x402Version: 1,
          accepts: [],
          error: "Invalid payment header format",
        },
        { status: 400 }
      );
    }

    // Verify payment
    const verificationResult = await verifyPayment(payload);

    if (!verificationResult.isValid) {
      return NextResponse.json(
        {
          x402Version: 1,
          accepts: [],
          error: `Payment verification failed: ${verificationResult.invalidReason}`,
        },
        { status: 402 }
      );
    }

    // Payment verified - return resource
    // Note: In production, you would settle the payment here
    // For demo, we'll skip actual settlement since we don't have a wallet client
    
    const resource = {
      message: "🎉 Payment successful! Here's your protected resource.",
      payer: verificationResult.payer,
      amount: payload.paymentDetails.amount,
      token: payload.paymentDetails.token,
      timestamp: new Date().toISOString(),
    };

    // In production, you would add X-PAYMENT-RESPONSE header with settlement result
    const response = NextResponse.json(resource);
    
    // For demo, we'll add a mock response header
    // response.headers.set(X_PAYMENT_RESPONSE_HEADER, encodeBase64({
    //   txHash: "0x...",
    //   blockNumber: BigInt(12345678),
    //   status: "confirmed" as const,
    // }));

    return response;
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
