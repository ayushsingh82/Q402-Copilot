import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, chatHistory } = body;

    if (!question) {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a ReadableStream for streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Note: In production, you would initialize the ChainGPT Smart Contracts Generator SDK here
          // const { SmartContractGenerator } = require('@chaingpt/smartcontractgenerator');
          // const generator = new SmartContractGenerator({ apiKey: process.env.CHAINGPT_API_KEY });
          // const stream = await generator.createSmartContractStream({ question, chatHistory });
          // 
          // stream.on('data', (chunk) => {
          //   controller.enqueue(new TextEncoder().encode(chunk.toString()));
          // });
          // stream.on('end', () => controller.close());
          // stream.on('error', (err) => controller.error(err));

          // Mock streaming response
          const mockResponse = "// Generated Smart Contract\n// Please configure ChainGPT API key to enable full functionality\n\npragma solidity ^0.8.0;\n\ncontract GeneratedContract {\n    // Your contract code will appear here once API key is configured\n}";
          
          // Simulate streaming by sending chunks
          const chunks = mockResponse.match(/.{1,50}/g) || [mockResponse];
          for (const chunk of chunks) {
            controller.enqueue(new TextEncoder().encode(chunk));
            await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
          }
          
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Streaming error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to start stream",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
