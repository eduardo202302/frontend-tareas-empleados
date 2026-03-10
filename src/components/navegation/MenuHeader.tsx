import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const menuItems = [
  { label: "Registro Empleado", screen: "Registro", icon: "person-add-outline" },
  { label: "Empleados", screen: "Empleados", icon: "people-outline" },
  { label: "Crear Tareas", screen: "Crear Tarea", icon: "document-text-outline" },
  { label: "Listado Tareas", screen: "Tareas", icon: "list-outline" },
];

export default function MenuHeader() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<any>();

  const navigate = (screen: string) => {
    setVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View>
      {/* Botón hamburguesa */}
      <TouchableOpacity onPress={() => setVisible(true)} style={{ marginLeft: 16 }}>
        <Ionicons name="menu-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal menú */}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.menu}>
            <Text style={styles.titulo}>Menú</Text>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.screen}
                style={styles.item}
                onPress={() => navigate(item.screen)}
              >
                <Ionicons name={item.icon as any} size={20} color="#1A73E8" />
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  menu: {
    backgroundColor: "#fff",
    width: 260,
    height: "100%",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  itemText: {
    fontSize: 15,
    color: "#374151",
    marginLeft: 12,
  },
});