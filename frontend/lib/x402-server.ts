import type { PaymentRequiredResponse, PaymentDetails } from "@q402/core";
import { PaymentScheme, NetworkConfigs } from "@q402/core";
import type { Address } from "viem";

interface DemoConfig {
  network: "bsc-testnet" | "bsc-mainnet";
  recipientAddress: Address;
  implementationContract: Address;
  verifyingContract: Address;
  token: Address;
  amount: string;
}

/**
 * Create 402 Payment Required response
 */
export function create402Response(config: DemoConfig): PaymentRequiredResponse {
  const networkConfig = NetworkConfigs[config.network];

  const paymentDetails: PaymentDetails = {
    scheme: PaymentScheme.EIP7702_DELEGATED,
    networkId: config.network,
    token: config.token,
    amount: config.amount,
    to: config.recipientAddress,
    implementationContract: config.implementationContract,
    witness: {
      domain: {
        name: "q402",
        version: "1",
        chainId: networkConfig.chainId,
        verifyingContract: config.verifyingContract,
      },
      types: {
        Witness: [
          { name: "owner", type: "address" },
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "to", type: "address" },
          { name: "deadline", type: "uint256" },
          { name: "paymentId", type: "bytes32" },
          { name: "nonce", type: "uint256" },
        ],
      },
      primaryType: "Witness",
      message: {
        owner: "0x0000000000000000000000000000000000000000", // Placeholder - will be replaced by client
        token: config.token,
        amount: BigInt(config.amount),
        to: config.recipientAddress,
        deadline: BigInt(Math.floor(Date.now() / 1000) + 900), // 15 minutes
        paymentId: "0x0000000000000000000000000000000000000000000000000000000000000000",
        nonce: BigInt(0),
      },
    },
    authorization: {
      chainId: networkConfig.chainId,
      address: config.implementationContract,
      nonce: 0,
    },
  };

  return {
    x402Version: 1,
    accepts: [paymentDetails],
  };
}
