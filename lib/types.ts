export interface HealthFormData {
  age: string;
  gender: string;
  temperature: string;
  duration: string;
  symptoms: string;
  allergies: string;
  medications: string;
}

export interface HealthRecord {
  id: number;
  date: string;
  diagnosis: string;
  symptoms: string;
  severity: "Low" | "Medium" | "High";
}

export interface SymptomTrend {
  name: string;
  value: number;
  color: string;
}

export interface AiHealthResponse {
  diagnosis: string;
  medicines: string[];
  visitAdvice: string;
  selfCare: string[];
}