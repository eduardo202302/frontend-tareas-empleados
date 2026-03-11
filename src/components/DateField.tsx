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

const DateField = ({ label, placeholder = "Selecciona una fecha", onChangeText, value }: DateFieldProps) => {
  const [visible, setVisible] = useState(false);
  const [fecha, setFecha] = useState("");

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
        <Ionicons name="calendar-outline" size={20} color="#1A73E8" style={styles.icono} />
        <Text style={value ? styles.fechaTexto : styles.placeholder}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down-outline" size={16} color="#93C5FD" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {/* Header del modal */}
            <View style={styles.modalHeader}>
              <Ionicons name="calendar" size={20} color="white" />
              <Text style={styles.modalTitulo}>{label}</Text>
            </View>

            <Calendar
              onDayPress={(day) => {
                setFecha(day.dateString);
                onChangeText?.(day.dateString);
                setVisible(false);
              }}
              markedDates={{
                [fecha]: { selected: true, selectedColor: "#1A73E8" },
              }}
              theme={{
                todayTextColor: "#F5A623",
                todayBackgroundColor: "#FFF8EC",
                selectedDayBackgroundColor: "#1A73E8",
                selectedDayTextColor: "white",
                arrowColor: "#1A4F7A",
                monthTextColor: "#1A4F7A",
                textMonthFontWeight: "bold",
                dayTextColor: "#1E3A5F",
                textDayFontSize: 14,
                calendarBackground: "white",
                textSectionTitleColor: "#7BA7C7",
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
  placeholder: {
    flex: 1,
    fontSize: 15,
    color: "#93C5FD",
  },
  fechaTexto: {
    flex: 1,
    fontSize: 15,
    color: "#1E3A5F",
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 30, 60, 0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHeader: {
    backgroundColor: "#1A4F7A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  modalTitulo: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  cerrar: {
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#D6E8F7",
    backgroundColor: "#F0F6FF",
  },
  cerrarTexto: {
    color: "#1A4F7A",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default DateField;