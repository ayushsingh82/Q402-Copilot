import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model, enhance, steps, width, height, chainId } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Initialize the ChainGPT NFT SDK
    const { Nft } = require('@chaingpt/nft');
    const apiKey = process.env.CHAINGPT_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "ChainGPT API key is not configured" },
        { status: 500 }
      );
    }

    const nft = new Nft({ apiKey });
    
    try {
      // Generate image (for now, just image generation)
      const result = await nft.generateImage({ 
        prompt, 
        model, 
        enhance, 
        steps, 
        width, 
        height 
      });

      // Convert image buffer to base64 data URL
      const imageBuffer = Buffer.from(result.data.data);
      const imageBase64 = imageBuffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

      return NextResponse.json({
        success: true,
        message: "NFT image generated successfully",
        imageUrl: imageUrl,
        chainId: chainId || 97,
      });
    } catch (sdkError: any) {
      console.error("ChainGPT SDK error:", sdkError);
      return NextResponse.json(
        {
          error: sdkError.message || "Failed to generate NFT image",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("NFT generation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate NFT",
      },
      { status: 500 }
    );
  }
}
