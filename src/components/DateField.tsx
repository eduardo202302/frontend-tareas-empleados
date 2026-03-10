import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

interface DateFieldProps {
  label: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;  
  value?: string;                         
  error?: string;    
  autoCapitalize: "none" | "sentences" | "words" | "characters";
}

const DateField = ({ label, placeholder = "Selecciona una fecha",onChangeText, value  }: DateFieldProps) => {
  const [visible, setVisible] = useState(false);
  const [fecha, setFecha] = useState("");

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
        <Ionicons name="calendar-outline" size={20} color="#6B7280" style={styles.icono} />
        <Text style={value  ? styles.fechaTexto : styles.placeholder}>
          {value  || placeholder}
        </Text>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Calendar
              onDayPress={(day) => {
                setFecha(day.dateString);
                onChangeText?.(day.dateString);
                setVisible(false);
              }}
              markedDates={{
                [fecha]: { selected: true, selectedColor: "#6B7280" },
              }}
              theme={{
                todayTextColor: "#6B7280",
                selectedDayBackgroundColor: "#6B7280",
                arrowColor: "#6B7280",
              }}
            />
            <TouchableOpacity style={styles.cerrar} onPress={() => setVisible(false)}>
              <Text style={styles.cerrarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  placeholder: {
    flex: 1,
    fontSize: 15,
    color: "#9CA3AF",
  },
  fechaTexto: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
  },
  cerrar: {
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  cerrarTexto: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default DateField;