// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Test the Gemini API directly
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testAPI() {
  try {
    // Make sure we have the API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("API key not found in environment variables");
      console.log("Available environment variables:", Object.keys(process.env));
      return;
    }
    
    console.log("API Key found, testing connection...");
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use the correct model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Test with a simple prompt
    const prompt = "Say hello in 3 different languages";
    
    console.log("Sending request to Gemini API...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Success! API Response:");
    console.log(text);
  } catch (error) {
    console.error("API Test Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Details:", await error.response.text());
    }
  }
}

// Run the test
testAPI();