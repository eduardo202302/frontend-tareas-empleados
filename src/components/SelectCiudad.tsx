import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ciudades from "../../ciudades.json";

interface SelectFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  labelKey: string;
  valueKey: string;
  error?: string;
}

const SelectCiudad = ({ label, value, onValueChange, labelKey, valueKey, error }: SelectFieldProps) => {
  const [opciones, setOpciones] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Selecciona...");

  useEffect(() => {
    setOpciones(ciudades.ciudades.map((ciudad) => ({ label: ciudad, value: ciudad })));
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedLabel(value);
    }
  }, [value]);

  const handleSelect = (item: any) => {
    onValueChange(item[valueKey]);
    setSelectedLabel(item[labelKey]);
    setVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[styles.container, error ? { borderColor: "red" } : null]}
        onPress={() => setVisible(true)}
      >
        <Text style={value ? styles.selectedText : styles.placeholder}>
          {selectedLabel}
        </Text>
        <Ionicons name="chevron-down-outline" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      <Modal transparent animationType="fade" visible={visible}>
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)} activeOpacity={1}>
          <View style={styles.modal}>
            <Text style={styles.modalTitulo}>{label}</Text>
            <FlatList
              data={opciones}
              keyExtractor={(item) => item[valueKey].toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.opcion, item[valueKey] === value ? styles.opcionActiva : null]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.opcionText, item[valueKey] === value ? styles.opcionTextActiva : null]}>
                    {item[labelKey]}
                  </Text>
                  {item[valueKey] === value && (
                    <Ionicons name="checkmark" size={18} color="#1A73E8" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
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
    color: "#6B7280",
    zIndex: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "white",
    height: 52,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  placeholder: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  selectedText: {
    fontSize: 14,
    color: "#111827",
  },
  error: {
    color: "red",
    fontSize: 11,
    marginTop: 4,
    marginLeft: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    maxHeight: "60%",
  },
  modalTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  opcion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderColor: "#0b0d10",
    borderWidth: 0.3,
    borderRadius: 8,
    marginBottom: 8,
  },
  opcionActiva: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    borderBottomColor: "#F3F4F6",
  },
  opcionText: {
    fontSize: 15,
    color: "#374151",
    borderRadius: 8,
    paddingHorizontal: 8,
    borderBottomColor: "#F3F4F6",
  },
  opcionTextActiva: {
    color: "#1A73E8",
    fontWeight: "600",
    borderBottomColor: "#F3F4F6",
  },
});

export default SelectCiudad;