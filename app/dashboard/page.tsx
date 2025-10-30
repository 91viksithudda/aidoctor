"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Activity, 
  Droplets,
  Thermometer,
  Wind,
  Stethoscope
} from "lucide-react";
import { useRouter } from "next/navigation";

interface HealthReport {
  id: number;
  date: string;
  age: string;
  gender: string;
  temperature: string;
  duration: string;
  symptoms: string;
  allergies: string;
  medications: string;
  result: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("month");
  const [healthHistory, setHealthHistory] = useState<HealthReport[]>([]);
  const [symptomTrends, setSymptomTrends] = useState([
    { name: "Headaches", value: 75, color: "bg-blue-500" },
    { name: "Fatigue", value: 60, color: "bg-green-500" },
    { name: "Cough", value: 45, color: "bg-yellow-500" },
    { name: "Fever", value: 30, color: "bg-red-500" },
    { name: "Allergies", value: 80, color: "bg-purple-500" }
  ]);

  useEffect(() => {
    // Load health reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem('healthReports') || '[]');
    setHealthHistory(savedReports);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Get severity based on symptoms
  const getSeverity = (symptoms: string) => {
    const severeSymptoms = ["chest pain", "difficulty breathing", "high fever", "severe headache"];
    const mediumSymptoms = ["fever", "cough", "body pain", "sore throat"];
    
    const lowerSymptoms = symptoms.toLowerCase();
    
    if (severeSymptoms.some(symptom => lowerSymptoms.includes(symptom))) {
      return { level: "High", color: "bg-red-100 text-red-800" };
    } else if (mediumSymptoms.some(symptom => lowerSymptoms.includes(symptom))) {
      return { level: "Medium", color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { level: "Low", color: "bg-green-100 text-green-800" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center">
            <Stethoscope className="text-blue-500 mr-3" />
            DoctorAI Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Track your health journey and wellness trends
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Checkups</p>
                <p className="text-2xl font-bold text-gray-900">{healthHistory.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Wellness Score</p>
                <p className="text-2xl font-bold text-gray-900">84%</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Thermometer className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Temp</p>
                <p className="text-2xl font-bold text-gray-900">
                  {healthHistory.length > 0 
                    ? `${Math.round(healthHistory.reduce((sum, report) => sum + (parseFloat(report.temperature) || 0), 0) / healthHistory.length)}°F` 
                    : "N/A"}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Wind className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Improvement</p>
                <p className="text-2xl font-bold text-gray-900">+12%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Symptom Trends */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-lg p-6 mb-10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Droplets className="mr-2 text-blue-500" />
              Common Symptoms Over Time
            </h2>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              {["week", "month", "year"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    timeRange === range
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {symptomTrends.map((symptom, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {symptom.name}
                  </span>
                  <span className="text-sm text-gray-500">{symptom.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    className={`h-2.5 rounded-full ${symptom.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${symptom.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Health History */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Calendar className="mr-2 text-green-500" />
              Health History
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/health-form")}
              className="mt-3 sm:mt-0 flex items-center gradient-button"
            >
              <Plus className="mr-1 h-4 w-4" />
              New Checkup
            </motion.button>
          </div>

          {healthHistory.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No health history</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first health checkup.
              </p>
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/health-form")}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none gradient-button"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  New Checkup
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Symptoms
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Temperature
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {healthHistory.map((record) => {
                    const severity = getSeverity(record.symptoms);
                    return (
                      <motion.tr
                        key={record.id}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        className="cursor-pointer"
                        onClick={() => {
                          // Save the selected report to localStorage for the results page
                          const savedReports = JSON.parse(localStorage.getItem('healthReports') || '[]');
                          const updatedReports = [record, ...savedReports.filter((r: HealthReport) => r.id !== record.id)];
                          localStorage.setItem('healthReports', JSON.stringify(updatedReports));
                          router.push("/results");
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.symptoms.substring(0, 30)}{record.symptoms.length > 30 ? '...' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.temperature}°F
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${severity.color}`}
                          >
                            {severity.level}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          ⚕️ DoctorAI provides general health information only. Not a substitute for professional medical advice.
        </motion.div>
      </div>
    </div>
  );
}