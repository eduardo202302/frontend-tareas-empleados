import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ciudades from "../../ciudades.json";

interface SelectFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const SelectCiudad = ({ label, value, onValueChange, error }: SelectFieldProps) => {
  const [opciones, setOpciones] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Selecciona...");
  const [search, setSearch] = useState("");
  const [isActivo, setIsActivo] = useState(false);

  useEffect(() => {
    const lista = ciudades.ciudades
      .sort((a, b) => a.localeCompare(b))
      .map((ciudad) => ({ label: ciudad, value: ciudad }));
    if (value) {
      const seleccionada = lista.filter((c) => c.value === value);
      const resto = lista.filter((c) => c.value !== value);
      setOpciones([...seleccionada, ...resto]);
    } else {
      setOpciones(lista);
    }
  }, [value]);

  useEffect(() => {
    if (value) setSelectedLabel(value);
  }, [value]);

  const opcionesFiltradas = opciones.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item: any) => {
    onValueChange(item.value);
    setSelectedLabel(item.label);
    setVisible(false);
    setSearch("");
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
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => { setVisible(false); setSearch(""); }}
          activeOpacity={1}
        >
          <TouchableOpacity style={styles.modal} activeOpacity={1}>

            {/* Header */}
            <View style={styles.modalHeader}>
              <Ionicons name="location" size={18} color="white" />
              <Text style={styles.modalTitulo}>{label}</Text>
              <Switch
                value={isActivo}
                onValueChange={setIsActivo}
                trackColor={{ false: "rgba(255,255,255,0.3)", true: "#F5A623" }}
                thumbColor="white"
              />
            </View>

            {isActivo && (
              <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={16} color="rgba(255,255,255,0.7)" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar ciudad..."
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={search}
                  onChangeText={setSearch}
                />
                {search ? (
                  <TouchableOpacity onPress={() => setSearch("")}>
                    <Ionicons name="close-circle" size={16} color="rgba(255,255,255,0.7)" />
                  </TouchableOpacity>
                ) : null}
              </View>
            )}

            <FlatList
              data={opcionesFiltradas}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.opcion, item.value === value ? styles.opcionActiva : null]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.opcionText, item.value === value ? styles.opcionTextActiva : null]}>
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Ionicons name="checkmark" size={18} color="#1A73E8" />
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
  wrapper: { marginBottom: 20, marginTop: 10 },
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
  placeholder: { fontSize: 14, color: "#93C5FD" },
  selectedText: { fontSize: 14, color: "#1E3A5F", fontWeight: "500" },
  error: { color: "#EF4444", fontSize: 11, marginTop: 4, marginLeft: 16 },
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
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 42,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginBottom: 12,
  },
  searchInput: { flex: 1, fontSize: 13, color: "white" },
  opcion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  opcionActiva: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderColor: "white",
  },
  opcionText: { fontSize: 15, color: "white", fontWeight: "400" },
  opcionTextActiva: { color: "#1A73E8", fontWeight: "700" },
});

export default SelectCiudad;