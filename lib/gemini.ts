import { GoogleGenerativeAI } from "@google/generative-ai";
import { HealthFormData } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getHealthAdvice(formData: HealthFormData) {
  try {
    // Create a more detailed prompt for the AI
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

    // Try different models in order of preference
    const modelsToTry = [
      "gemini-pro-latest",
      "gemini-flash-latest",
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite"
    ];
    
    let result;
    let response;
    let text;
    
    // Try each model until one works
    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContent(prompt);
        response = await result.response;
        text = response.text();
        console.log(`Successfully used model: ${modelName}`);
        break;
      } catch (modelError: any) {
        console.error(`Failed to use model ${modelName}:`, modelError.message);
        // Continue to next model
      }
    }
    
    // If no model worked, throw error
    if (!text) {
      throw new Error("Failed to generate health analysis with any available model");
    }
    
    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate health analysis");
  }
}