import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getEmployeesServices } from "../../../services/empleadoServices";
import { employees } from "../../types/inputField";
import Card from "../../components/listadoEmployees/Card";
import ModalEmployee from "../../components/listadoEmployees/Modal";

const ListadoEmployees = () => {
  const [busqueda, setBusqueda] = useState("");
  const [empleados, setEmpleados] = useState<employees[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<number>(0);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const data = await getEmployeesServices();
      setEmpleados(data);
    } catch (error) {
      console.log(error);
    }
  };

  const empleadosFiltrados = empleados.filter(
    (e) =>
      e.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.email.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="flash" size={20} color="#F5A623" />
        <Text style={styles.headerTitulo}>Empleados</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{empleadosFiltrados.length}</Text>
        </View>
      </View>

      {/* Buscador */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#1A73E8" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Buscar empleado..."
          placeholderTextColor="#93C5FD"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {busqueda.length > 0 && (
          <Ionicons name="close-circle" size={18} color="#93C5FD" onPress={() => setBusqueda("")} />
        )}
      </View>

      {empleadosFiltrados.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="people-outline" size={50} color="#93C5FD" />
          </View>
          <Text style={styles.emptyText}>No se encontraron empleados</Text>
          <Text style={styles.emptySubText}>Intenta con otro término de búsqueda</Text>
        </View>
      ) : (
        <FlatList
          data={empleadosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              empleado={item}
              onPress={() => {
                setEmpleadoSeleccionado(item.id);
                setModalVisible(true);
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <ModalEmployee
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        id={empleadoSeleccionado}
        onDelete={getEmployees}
      />
    </View>
  );
};

export default ListadoEmployees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F0F6FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  headerTitulo: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A4F7A",
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: "#1A73E8",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    shadowColor: "#1A73E8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#1E3A5F",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyIcon: {
    backgroundColor: "#D6E8F7",
    borderRadius: 50,
    padding: 20,
    marginBottom: 16,
  },
  emptyText: {
    color: "#1A4F7A",
    fontSize: 16,
    fontWeight: "600",
  },
  emptySubText: {
    color: "#7BA7C7",
    fontSize: 13,
    marginTop: 4,
  },
});