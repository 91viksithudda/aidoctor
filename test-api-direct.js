// Test the API route directly
async function testApiDirect() {
  try {
    console.log("Making direct API call to /api/gemini...");
    
    // Test form data
    const testData = {
      formData: {
        age: "30",
        gender: "male",
        temperature: "37.5",
        duration: "3-5 days",
        symptoms: "Headache and mild fever",
        allergies: "None",
        medications: "None"
      }
    };
    
    // Make the API call
    const response = await fetch('http://localhost:3001/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });
    
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    
    const responseText = await response.text();
    console.log("Response text:", responseText);
    
    if (response.ok) {
      const data = JSON.parse(responseText);
      console.log("Success! Response data:", data);
    } else {
      console.log("API returned error status");
    }
  } catch (error) {
    console.error("Test error:", error.message);
  }
}

// Run the test
testApiDirect();