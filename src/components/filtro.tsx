import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FilterConfig {
  key: string;
  label: string;
  type: "text" | "select";
  options?: { label: string; value: string }[];
}

interface FilterBarProps {
  filters: FilterConfig[];
  onFilterChange: (filters: Record<string, string>) => void;
}

const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterConfig | null>(null);

  const handleChange = (key: string, value: string) => {
    const updated = { ...values, [key]: value };
    setValues(updated);
    onFilterChange(updated);
  };

  const handleSelectOpen = (filter: FilterConfig) => {
    setActiveFilter(filter);
    setModalVisible(true);
  };

  const handleSelectOption = (value: string) => {
    if (activeFilter) {
      handleChange(activeFilter.key, value);
    }
    setModalVisible(false);
  };

  const clearFilter = (key: string) => {
    const updated = { ...values, [key]: "" };
    setValues(updated);
    onFilterChange(updated);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {filters.map((filter) => (
          <View key={filter.key} style={styles.filterItem}>
            {filter.type === "text" ? (
              <View style={styles.inputContainer}>
                <Ionicons name="search-outline" size={16} color="#9CA3AF" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder={filter.label}
                  placeholderTextColor="#9CA3AF"
                  value={values[filter.key] || ""}
                  onChangeText={(val) => handleChange(filter.key, val)}
                />
                {values[filter.key] ? (
                  <TouchableOpacity onPress={() => clearFilter(filter.key)}>
                    <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.selectContainer}
                onPress={() => handleSelectOpen(filter)}
              >
                <Text style={values[filter.key] ? styles.selectText : styles.selectPlaceholder}>
                  {values[filter.key] || filter.label}
                </Text>
                {values[filter.key] ? (
                  <TouchableOpacity onPress={() => clearFilter(filter.key)}>
                    <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                ) : (
                  <Ionicons name="chevron-down-outline" size={16} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <Modal transparent animationType="fade" visible={modalVisible}>
        <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)} activeOpacity={1}>
          <View style={styles.modal}>
            <Text style={styles.modalTitulo}>{activeFilter?.label}</Text>
            <FlatList
              data={activeFilter?.options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.opcion,
                    values[activeFilter?.key || ""] === item.value ? styles.opcionActiva : null,
                  ]}
                  onPress={() => handleSelectOption(item.value)}
                >
                  <Text style={[
                    styles.opcionText,
                    values[activeFilter?.key || ""] === item.value ? styles.opcionTextActiva : null,
                  ]}>
                    {item.label}
                  </Text>
                  {values[activeFilter?.key || ""] === item.value && (
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  filterItem: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "#F9FAFB",
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: "#111827",
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "#F9FAFB",
  },
  selectPlaceholder: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  selectText: {
    fontSize: 13,
    color: "#111827",
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
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 0.3,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 6,
  },
  opcionActiva: {
    backgroundColor: "#EFF6FF",
  },
  opcionText: {
    fontSize: 14,
    color: "#374151",
  },
  opcionTextActiva: {
    color: "#1A73E8",
    fontWeight: "600",
  },
});

export { FilterBar, FilterConfig };
export default FilterBar;