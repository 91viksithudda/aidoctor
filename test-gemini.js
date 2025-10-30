const { GoogleGenerativeAI } = require("@google/generative-ai");

// Use the new API key
const API_KEY = "AIzaSyDGfu-1oUK4sEzvL34gE42o7Wm74Hquzuc";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGemini() {
  try {
    console.log("Testing Gemini API with new key...");
    
    // Try the gemini-pro model first
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = "Hello, this is a test. Please respond with 'Test successful' if you receive this message.";
    
    console.log("Sending test prompt...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Response from Gemini API:");
    console.log(text);
  } catch (error) {
    console.error("Error testing Gemini API:", error.message);
    
    // Try other models if gemini-pro fails
    const modelsToTry = ["gemini-1.0-pro", "gemini-1.5-pro-latest", "gemini-1.0-pro-latest"];
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, this is a test.");
        const response = await result.response;
        const text = response.text();
        console.log(`Success with model ${modelName}:`, text.substring(0, 100) + "...");
        break;
      } catch (modelError) {
        console.error(`Failed with model ${modelName}:`, modelError.message);
      }
    }
  }
}

testGemini();