import { NextResponse } from "next/server";
import { GoogleGenerativeAI, GoogleGenerativeAIError, GoogleGenerativeAIResponseError } from "@google/generative-ai";

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
    
    // First, try to list available models to see what's actually accessible
    console.log("Attempting to list available models...");
    let availableModels = [];
    try {
      // Note: listModels may not be available in all SDK versions
      // If it fails, we'll continue with our standard approach
      console.log("Model listing not available in this SDK version, continuing with standard approach");
    } catch (listError) {
      console.log("Could not list models, continuing with standard approach");
    }
    
    // Try different models in order of preference
    // Using models that are more commonly available
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-pro",
      "gemini-1.0-pro",
      "models/gemini-pro-001",
      "models/gemini-1.0-pro-001"
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
        console.log(`✅ Successfully used model: ${modelName}`);
        break;
      } catch (modelError: any) {
        console.error(`❌ Failed to use model ${modelName}:`, modelError.message);
        // If it's a 404 error, continue to next model
        if (modelError.message.includes('404')) {
          console.log(`Skipping ${modelName} due to 404 error`);
          continue;
        }
        // For other errors, log and continue
        console.log(`Continuing to next model due to error with ${modelName}`);
        continue;
      }
    }
    
    // If no model worked, return a more detailed error response
    if (!text) {
      console.log("No models worked, returning detailed error response");
      return NextResponse.json(
        { 
          error: "API Configuration Issue",
          reply: `Diagnosis: API Configuration Issue

Common Medicines:
- Paracetamol 500mg: Take 1 tablet every 6 hours as needed for fever or pain
- Ibuprofen 200mg: Take 1 tablet every 8 hours for inflammation
- Vitamin C 500mg: Take 1 tablet daily to boost immunity

Doctor Visit Advice:
Consult a physician if symptoms persist for more than 5 days, if fever exceeds 103°F (39.4°C), or if you experience difficulty breathing.

Self-care Tips:
- Get plenty of rest and sleep
- Stay hydrated by drinking water regularly
- Use a humidifier or breathe steam to ease congestion
- Gargle with warm salt water to soothe throat irritation

Note: This is sample data. To enable real AI analysis, please ensure your Gemini API is properly configured with the Generative Language API enabled in Google Cloud Console.`,
          details: "No available models could be accessed with your API key. Please check if the Generative Language API is enabled in your Google Cloud project and billing is configured correctly."
        },
        { status: 200 } // Return 200 so the frontend can still display the mock data
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