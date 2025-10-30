"use client";

import { useState } from "react";
import { motion, Transition } from "framer-motion";
import { Thermometer, Clock, User, Heart, Droplets, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HealthForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    temperature: "",
    duration: "",
    symptoms: "",
    allergies: "",
    medications: "",
  });
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `The user is ${formData.age} years old, gender ${formData.gender}, has ${formData.symptoms} with temperature ${formData.temperature}°F. Duration: ${formData.duration}. Allergies: ${formData.allergies || 'None'}. Current medications: ${formData.medications || 'None'}. Suggest possible causes and safe OTC medicine.`,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI analysis');
      }
      
      const data = await response.json();
      setAiResult(data.reply);
      setLoading(false);
      
      // Save to localStorage
      const report = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...formData,
        result: data.reply
      };
      
      const savedReports = JSON.parse(localStorage.getItem('healthReports') || '[]');
      const updatedReports = [report, ...savedReports.slice(0, 2)]; // Keep only last 3
      localStorage.setItem('healthReports', JSON.stringify(updatedReports));
    } catch (error) {
      console.error("Error:", error);
      setAiResult("Sorry, we couldn't generate an analysis at this time. Please try again.");
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      } as Transition,
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      } as Transition,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center">
            <Heart className="text-red-500 mr-3" />
            🩺 DoctorAI Health Check
          </h1>
          <p className="text-lg text-gray-600">
            Enter your symptoms below for quick AI advice
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {!aiResult ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition form-input"
                      placeholder="Your age"
                      min="1"
                      max="120"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition form-input"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°F)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Thermometer className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition form-input"
                      placeholder="Current temperature"
                      step="0.1"
                      min="95"
                      max="110"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition form-input"
                    >
                      <option value="">Select duration</option>
                      <option value="1-2 days">1-2 days</option>
                      <option value="3-5 days">3-5 days</option>
                      <option value="1 week">1 week</option>
                      <option value="more than 1 week">More than 1 week</option>
                    </select>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Symptoms
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition form-input"
                  placeholder="Describe your symptoms in detail..."
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies (if any)
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition form-input"
                    placeholder="List any known allergies..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Medications
                  </label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition form-input"
                    placeholder="List any medications you're currently taking..."
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-button flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="spinner mr-2"></div>
                      Analyzing your symptoms...
                    </>
                  ) : (
                    <>
                      <Stethoscope className="mr-2 h-5 w-5" />
                      Generate AI Advice →
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  💊 Your Health Insight
                </h2>
                <p className="text-gray-600">
                  Here's what our AI suggests based on your symptoms
                </p>
              </div>

              <div className="prose max-w-none bg-blue-50 rounded-lg p-6 whitespace-pre-line">
                {aiResult}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAiResult("");
                    setFormData({
                      age: "",
                      gender: "",
                      temperature: "",
                      duration: "",
                      symptoms: "",
                      allergies: "",
                      medications: "",
                    });
                  }}
                  className="flex-1 gradient-button"
                >
                  Start New Checkup
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/results")}
                  className="flex-1 bg-white border-2 border-blue-500 text-blue-600 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition"
                >
                  View Detailed Results
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          ⚕️ DoctorAI provides general health information only. Not a substitute for professional medical advice.
        </motion.div>
      </div>
    </div>
  );
}