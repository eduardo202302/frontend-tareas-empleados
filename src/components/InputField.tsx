import { Ionicons } from "@expo/vector-icons";
import { InputFieldProps } from "../types/inputField";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputText = ({ label, placeholder, icon, keyboardType, onChangeText, value, autoCapitalize }: InputFieldProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <Ionicons name={icon} size={20} color="#1A73E8" style={styles.icono} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#93C5FD"
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
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
    color: "#1A73E8",
    zIndex: 1,
    fontWeight: "600",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: "white",
    shadowColor: "#1A73E8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  icono: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1E3A5F",
  },
});

export default InputText;