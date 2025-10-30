"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Stethoscope, Heart, Pill, User } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 flex flex-col items-center justify-center p-4">
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20 text-2xl"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() > 0.5 ? -100 : 100],
              x: [null, Math.random() > 0.5 ? -100 : 100],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            {Math.random() > 0.6 ? "⚕️" : Math.random() > 0.5 ? "💊" : "🫀"}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-3xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Stethoscope className="h-12 w-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          DoctorAI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-white/90 mb-10"
        >
          Gemini-Powered Health Assistant
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/login")}
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/health-form")}
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Continue as Guest
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <Heart className="h-10 w-10 text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">AI Diagnosis</h3>
            <p className="text-white/80">Get instant medical advice powered by Gemini AI</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <Pill className="h-10 w-10 text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Medicine Advice</h3>
            <p className="text-white/80">Receive personalized OTC medicine recommendations</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <User className="h-10 w-10 text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Health Tracking</h3>
            <p className="text-white/80">Monitor your health history and trends over time</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 text-white/70 text-sm"
      >
        ⚕️ DoctorAI © 2025
      </motion.footer>
    </div>
  );
}