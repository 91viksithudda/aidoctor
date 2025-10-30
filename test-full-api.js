// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Test the full API flow like the frontend would
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testFullAPI() {
  try {
    // Make sure we have the API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("API key not found in environment variables");
      return;
    }
    
    console.log("API Key found, testing full API flow...");
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use the correct model (same as in our Next.js app)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Create test form data (same structure as HealthFormData)
    const formData = {
      age: "30",
      gender: "male",
      temperature: "37.5",
      duration: "3-5 days",
      symptoms: "Headache and mild fever",
      allergies: "None",
      medications: "None"
    };
    
    // Create the same prompt as in our Next.js app
    const prompt = `You are a medical AI assistant. Based on the following patient information, provide a detailed health analysis:

Patient Information:
- Age: ${formData.age} years old
- Gender: ${formData.gender}
- Temperature: ${formData.temperature || 'Not provided'}°C
- Duration of symptoms: ${formData.duration || 'Not specified'}
- Symptoms: ${formData.symptoms}
- Allergies: ${formData.allergies || 'None reported'}
- Current medications: ${formData.medications || 'None reported'}

Please provide the following information in a clear, structured format:
1. Diagnosis: A brief explanation of what the patient might be experiencing
2. Common Medicines: A list of 2-3 over-the-counter medicines that might help (with dosages)
3. Doctor Visit Advice: When the patient should consult a physician
4. Self-care Tips: 3-4 recommendations for at-home care

Format your response as follows:
Diagnosis: [Your diagnosis here]

Common Medicines:
- [Medicine 1 with dosage]
- [Medicine 2 with dosage]
- [Medicine 3 with dosage]

Doctor Visit Advice:
[When to see a doctor]

Self-care Tips:
- [Tip 1]
- [Tip 2]
- [Tip 3]
- [Tip 4]

Important: Do not provide any medical advice that could be harmful. Always recommend consulting with a healthcare professional for serious conditions.`;
    
    console.log("Sending request to Gemini API with test form data...");
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
testFullAPI();