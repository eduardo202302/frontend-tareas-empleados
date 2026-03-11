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
      <TouchableOpacity onPress={() => setVisible(true)} style={{ marginLeft: 16 }}>
        <Ionicons name="menu-outline" size={33} color="#fff" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)} activeOpacity={1}>
          <TouchableOpacity style={styles.menu} activeOpacity={1}>

            {/* Header del menú */}
            <View style={styles.menuHeader}>
              <View style={styles.logoContainer}>
                <Ionicons name="flash" size={22} color="#F5A623" />
                <Text style={styles.logoText}>iKompras</Text>
              </View>
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={20} color="#7BA7C7" />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Items */}
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.screen}
                style={styles.item}
                onPress={() => navigate(item.screen)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon as any} size={19} color="#2B6CB0" />
                </View>
                <Text style={styles.itemText}>{item.label}</Text>
                <Ionicons name="chevron-forward-outline" size={16} color="#7BA7C7" />
              </TouchableOpacity>
            ))}

            {/* Footer */}
            <View style={styles.footer}>
              <Ionicons name="flash" size={14} color="#F5A623" />
              <Text style={styles.footerText}>iKompras v1.0</Text>
            </View>

          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 30, 60, 0.55)",
  },
  menu: {
    backgroundColor: "#EAF2FB",
    width: 270,
    height: "100%",
    paddingTop: 56,
    paddingHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A4F7A",
    letterSpacing: 0.5,
  },
  closeBtn: {
    backgroundColor: "#D6E8F7",
    borderRadius: 20,
    padding: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#B8D4EA",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D6E8F7",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#D6E8F7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: "#1A4F7A",
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    color: "#7BA7C7",
    fontWeight: "500",
  },
});