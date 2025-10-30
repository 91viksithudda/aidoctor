import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Check if API key is available
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey || "missing-api-key");

export async function POST(req: Request) {
  try {
    // Check if API key is available
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }
    
    // Parse the request body
    let body;
    try {
      body = await req.json();
    } catch (parseError: any) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body", details: parseError.message },
        { status: 400 }
      );
    }
    
    const { prompt } = body;
    
    // Validate prompt
    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt in request body" },
        { status: 400 }
      );
    }
    
    // Try different models in order of preference
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-1.0-pro",
      "gemini-pro"
    ];
    
    let result;
    let response;
    let text;
    let usedModel = "";
    
    // Try each model until one works
    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContent(prompt);
        response = await result.response;
        text = response.text();
        usedModel = modelName;
        console.log(`Successfully used model: ${modelName}`);
        break;
      } catch (modelError: any) {
        console.error(`Failed to use model ${modelName}:`, modelError.message);
        // Continue to next model
      }
    }
    
    // If no model worked, return error
    if (!text) {
      return NextResponse.json(
        { 
          error: "Failed to generate health analysis with any available model",
          details: "No available models could be accessed with your API key"
        },
        { status: 500 }
      );
    }
    
    console.log(`Successfully generated response using model: ${usedModel}`);
    
    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response status text:", error.response.statusText);
    }
    
    return NextResponse.json(
      { 
        error: "Failed to generate health analysis",
        details: error.message,
        name: error.name
      },
      { status: 500 }
    );
  }
}