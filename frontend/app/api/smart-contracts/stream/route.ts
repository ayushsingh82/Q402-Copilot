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
          const { SmartContractGenerator } = require('@chaingpt/smartcontractgenerator');
          const apiKey = process.env.CHAINGPT_API_KEY;
          
          if (!apiKey) {
            controller.error(new Error("ChainGPT API key is not configured"));
            return;
          }

          const generator = new SmartContractGenerator({ apiKey });
          const stream = await generator.createSmartContractStream({ question, chatHistory });
          
          stream.on('data', (chunk: any) => {
            controller.enqueue(new TextEncoder().encode(chunk.toString()));
          });
          
          stream.on('end', () => {
            controller.close();
          });
          
          stream.on('error', (err: any) => {
            controller.error(err);
          });
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
