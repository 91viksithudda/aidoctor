# DoctorAI - Your Personal AI for Health

A Next.js web application powered by Google's Gemini API that provides AI-powered health diagnosis and medicine advice.

## Features

- 🎨 **Animated Login/Register Pages** with validation and success transitions
- 📝 **Health Form** for entering symptoms, age, temperature, and other health information
- 🤖 **AI Result Page** showing diagnosis, medicines, and visit advice from Gemini AI
- 📊 **Dashboard** for tracking health history and symptom trends
- 🎯 **Professional medical-style UI** with glassmorphism and gradient effects
- 📱 **Fully responsive** design that works on mobile and desktop

## Tech Stack

- **Next.js 14+** (App Router)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Google Gemini API** for AI-powered health analysis
- **TypeScript** for type safety

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
  ├── login/page.tsx          # Login and registration page
  ├── health-form/page.tsx    # Health information form
  ├── results/page.tsx        # AI analysis results
  ├── dashboard/page.tsx      # Health history and trends
  ├── api/gemini/route.ts     # Gemini API integration
  └── layout.tsx              # Root layout with navigation
components/
  └── Navigation.tsx          # Navigation component
lib/
  ├── types.ts                # TypeScript interfaces
  └── gemini.ts               # Gemini API utility functions
```

## Color Palette

- **Primary**: #3b82f6 (Doctor Blue)
- **Secondary**: #10b981 (Healthy Green)
- **Accent**: #f97316 (Warning Orange)
- **Background**: #f9fafb

## Pages

### 1. Login/Register Page
- Animated form with glassmorphism effect
- Email and password validation
- Toggle between login and registration
- "Continue as Guest" option

### 2. Health Form Page
- Comprehensive health information form
- Fields for age, gender, temperature, symptoms, etc.
- Animated input fields with staggered delays
- Submit button with loading state

### 3. AI Result Page
- Detailed health analysis from Gemini AI
- Diagnosis, medicines, and visit advice
- Self-care tips
- Download and share options

### 4. Dashboard Page
- Health history tracking
- Symptom trend visualization
- Health statistics overview
- Quick access to new checkups

## API Integration

The application uses Google's Gemini API to generate health analysis based on user input. The API route is located at `/app/api/gemini/route.ts`.

## Disclaimer

⚕️ DoctorAI provides general health information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## License

This project is licensed under the MIT License.