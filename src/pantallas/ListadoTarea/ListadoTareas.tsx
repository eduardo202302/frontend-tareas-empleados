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

  const pendientes = tareas.filter((t) => !t.completada).length;
  const completadas = tareas.filter((t) => t.completada).length;

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="flash" size={20} color="#F5A623" />
        <Text style={styles.headerTitulo}>Tareas</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badgePendiente}>
            <Text style={styles.badgeText}>{pendientes} pendientes</Text>
          </View>
          <View style={styles.badgeCompletada}>
            <Text style={styles.badgeText}>{completadas} ✓</Text>
          </View>
        </View>
      </View>

      {/* Buscador */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#1A73E8" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Buscar tarea..."
          placeholderTextColor="#93C5FD"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {busqueda.length > 0 && (
          <Ionicons name="close-circle" size={18} color="#93C5FD" onPress={() => setBusqueda("")} />
        )}
      </View>

      {tareasFiltradas.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="folder-open-outline" size={50} color="#93C5FD" />
          </View>
          <Text style={styles.emptyText}>No se encontraron tareas</Text>
          <Text style={styles.emptySubText}>Intenta con otro término de búsqueda</Text>
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

const CardTarea = ({ tarea, onPress }: { tarea: Tarea; onPress: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    <View style={[styles.cardIcon, tarea.completada && styles.cardIconCompletado]}>
      <Ionicons
        name={tarea.completada ? "checkmark-circle" : "checkmark-circle-outline"}
        size={24}
        color={tarea.completada ? "#22C55E" : "#1A73E8"}
      />
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardName}>{tarea.name}</Text>
      <Text style={styles.cardDesc} numberOfLines={1}>{tarea.descripcion}</Text>
      {tarea.completada && (
        <View style={styles.completadaBadge}>
          <Text style={styles.completadaText}>✓ Completada</Text>
        </View>
      )}
    </View>
    <Ionicons name="chevron-forward" size={18} color="#93C5FD" />
  </TouchableOpacity>
);

export default ListadoTareas;

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
  badgeRow: {
    flexDirection: "row",
    gap: 6,
  },
  badgePendiente: {
    backgroundColor: "#1A73E8",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeCompletada: {
    backgroundColor: "#22C55E",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: "white",
    fontSize: 11,
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D6E8F7",
    shadowColor: "#1A73E8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 10,
    marginRight: 14,
  },
  cardIconCompletado: {
    backgroundColor: "#F0FDF4",
  },
  cardInfo: { flex: 1 },
  cardName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1A4F7A",
  },
  cardDesc: {
    fontSize: 13,
    color: "#7BA7C7",
    marginTop: 2,
  },
  completadaBadge: {
    marginTop: 4,
    alignSelf: "flex-start",
    backgroundColor: "#F0FDF4",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  completadaText: {
    color: "#22C55E",
    fontSize: 11,
    fontWeight: "600",
  },
});