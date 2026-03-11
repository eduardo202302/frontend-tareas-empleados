import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getEmployeesServices } from "../../../services/empleadoServices";

interface SelectFieldProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  labelKey: string;
  valueKey: string;
  error?: string;
}

const SelectField = ({ label, value, onValueChange, labelKey, valueKey, error }: SelectFieldProps) => {
  const [opciones, setOpciones] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Selecciona...");

  useEffect(() => {
    fetchOpciones();
  }, []);

  const fetchOpciones = async () => {
    try {
      const response = await getEmployeesServices();
      setOpciones(response);
    } catch (error) {
      console.log("Error al cargar opciones:", error);
    }
  };

  const handleSelect = (item: any) => {
    onValueChange(item[valueKey]);
    setSelectedLabel(item[labelKey]);
    setVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[styles.container, error ? { borderColor: "#EF4444" } : null]}
        onPress={() => setVisible(true)}
      >
        <Text style={value ? styles.selectedText : styles.placeholder}>
          {selectedLabel}
        </Text>
        <Ionicons name="chevron-down-outline" size={18} color="#93C5FD" />
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      <Modal transparent animationType="fade" visible={visible}>
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)} activeOpacity={1}>
          <TouchableOpacity style={styles.modal} activeOpacity={1}>

            {/* Header */}
            <View style={styles.modalHeader}>
              <Ionicons name="people-outline" size={18} color="white" />
              <Text style={styles.modalTitulo}>{label}</Text>
            </View>

            <FlatList
              data={opciones}
              keyExtractor={(item) => item[valueKey].toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.opcion, item[valueKey] === value ? styles.opcionActiva : null]}
                  onPress={() => handleSelect(item)}
                >
                  <View style={styles.opcionLeft}>
                    <View style={styles.opcionAvatar}>
                      <Text style={styles.opcionAvatarText}>
                        {item[labelKey]?.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <Text style={[styles.opcionText, item[valueKey] === value ? styles.opcionTextActiva : null]}>
                      {item[labelKey]}
                    </Text>
                  </View>
                  {item[valueKey] === value && (
                    <Ionicons name="checkmark-circle" size={20} color="white" />
                  )}
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
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
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    borderRadius: 10,
    backgroundColor: "white",
    height: 52,
    paddingHorizontal: 12,
    shadowColor: "#1A73E8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  placeholder: {
    fontSize: 14,
    color: "#93C5FD",
  },
  selectedText: {
    fontSize: 14,
    color: "#1E3A5F",
    fontWeight: "500",
  },
  error: {
    color: "#EF4444",
    fontSize: 11,
    marginTop: 4,
    marginLeft: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 30, 60, 0.6)",
    justifyContent: "center",
    padding: 24,
  },
  modal: {
    backgroundColor: "#1A4F7A",
    borderRadius: 20,
    padding: 20,
    maxHeight: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
  },
  opcion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  opcionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  opcionAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  opcionAvatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  opcionActiva: {
    backgroundColor: "white",
    borderColor: "white",
  },
  opcionText: {
    fontSize: 15,
    color: "white",
    fontWeight: "400",
  },
  opcionTextActiva: {
    color: "#1A73E8",
    fontWeight: "700",
  },
});

export default SelectField;