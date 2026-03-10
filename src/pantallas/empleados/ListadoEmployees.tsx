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
      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={18}
          color="#9CA3AF"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar empleado..."
          placeholderTextColor="#9CA3AF"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {busqueda.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color="#9CA3AF"
            onPress={() => setBusqueda("")}
          />
        )}
      </View>
      {empleadosFiltrados.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="people-outline" size={60} color="#E5E7EB" />
          <Text style={styles.emptyText}>No se encontraron empleados</Text>
        </View>
      ) : (
        <FlatList
          data={empleadosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card empleado={item} 
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
    backgroundColor: "#F9FAFB",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    color: "#9CA3AF",
    fontSize: 16,
  },
});
