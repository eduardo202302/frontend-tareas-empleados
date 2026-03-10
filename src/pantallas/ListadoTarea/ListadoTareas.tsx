import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getTareasServices } from "../../../services/takstServices";
import ModalTarea from "../../components/tareas/ModalTarea";

interface Tarea {
  id: number;
  name: string;
  descripcion: string;
  userId: number;
  completada: boolean;
}

const ListadoTareas = () => {
  const [busqueda, setBusqueda] = useState("");
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<number>(0);

  useEffect(() => {
    getTareas();
  }, []);

  const getTareas = async () => {
    try {
      const data = await getTareasServices();
      setTareas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const tareasFiltradas = tareas.filter(
    (t) =>
      t.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(busqueda.toLowerCase()),
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
          placeholder="Buscar tarea..."
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

      {tareasFiltradas.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="folder-open-outline" size={60} color="#E5E7EB" />
          <Text style={styles.emptyText}>No se encontraron tareas</Text>
        </View>
      ) : (
        <FlatList
          data={tareasFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardTarea
              tarea={item}
              onPress={() => {
                setTareaSeleccionada(item.id);
                setModalVisible(true);
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <ModalTarea
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        id={tareaSeleccionada}
        onRefresh={getTareas}
      />
    </View>
  );
};

const CardTarea = ({
  tarea,
  onPress,
}: {
  tarea: Tarea;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Ionicons name="checkmark-circle-outline" size={24} color="#4F86C6" />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{tarea.name}</Text>
        <Text style={styles.cardDesc} numberOfLines={1}>
          {tarea.descripcion}
        </Text>
        {tarea.completada && (
          <Text style={styles.completada}>Completada</Text>
        )}
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color="#D1D5DB"
        onPress={onPress}
      />
    </View>
  </TouchableOpacity>
);

export default ListadoTareas;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
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
  input: { flex: 1, fontSize: 14, color: "#111827" },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  completada: { color: "#10B981", fontWeight: "bold" },
  emptyText: { marginTop: 10, color: "#9CA3AF", fontSize: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardIcon: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 10,
    marginRight: 14,
  },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: "bold", color: "#111827" },
  cardDesc: { fontSize: 13, color: "#6B7280", marginTop: 2 },
});
