// Test the API route like the frontend would call it
const { spawn } = require('child_process');

// Start the Next.js development server in the background
console.log("Starting Next.js development server...");
const server = spawn('npm', ['run', 'dev'], {
  cwd: process.cwd(),
  stdio: 'pipe',
  shell: true
});

// Capture server output
server.stdout.on('data', (data) => {
  process.stdout.write(data);
});

server.stderr.on('data', (data) => {
  process.stderr.write(data);
});

// After a few seconds, make a test API call
setTimeout(async () => {
  try {
    console.log("\nMaking test API call...");
    
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
    const response = await fetch('http://localhost:3002/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });
    
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    
    if (response.ok) {
      const data = await response.json();
      console.log("Success! Response data:", data);
    } else {
      console.log("API returned error status");
      const errorText = await response.text();
      console.log("Error response:", errorText);
    }
  } catch (error) {
    console.error("Test error:", error.message);
  }
  
  // Close the server after testing
  setTimeout(() => {
    server.kill();
    console.log("Test completed");
  }, 2000);
}, 5000);