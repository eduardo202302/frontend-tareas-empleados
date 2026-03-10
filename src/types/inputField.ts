import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  label: string;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  onChangeText?: (text: string) => void;  
  value?: string                         
  error?: string;       
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

interface employees {
  id: number;
  name: string;
  cedula: string;
  email: string;
  telefono: string;
  sueldo: number;
  cumpleaños: string;
  direccion: string;
  ciudad: string;
}

export type { InputFieldProps, employees };
