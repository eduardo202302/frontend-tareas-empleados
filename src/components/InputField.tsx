import { Ionicons } from "@expo/vector-icons";
import { InputFieldProps } from "../types/inputField";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputText = ({ label, placeholder, icon, keyboardType, onChangeText, value, autoCapitalize }: InputFieldProps) => {
    return (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.container}>
      <Ionicons name={icon} size={20} color="#6B7280" style={styles.icono} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        onChangeText={onChangeText}  
        value={value}                
        autoCapitalize={autoCapitalize} 
      />
    </View>
  </View>
)
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    position: "absolute",
    top: -9,
    left: 12,
    backgroundColor: "white",
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#6B7280",
    zIndex: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  icono: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
});

export default InputText;