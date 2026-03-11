import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  deleteEmployeeByIdServices,
  getEmployeeByIdServices,
} from "../../../services/empleadoServices";
import { employees } from "../../types/inputField";
import Toast from "react-native-toast-message";
import ModalEditEmployee from "./ModalEditEmployee";
import { getTareasByIdServices } from "../../../services/takstServices";

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  id: number;
  onDelete: () => void;
}

const ModalEmployee = ({ visible, onClose, id, onDelete }: MenuModalProps) => {
  const [empleado, setEmpleado] = useState<employees | null>(null);
  const [tareas, setTareas] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const tienePendientes = tareas.some((tarea: any) => !tarea.completada);

  useEffect(() => {
    if (id) getEmployees();
  }, [id]);

  const getEmployees = async () => {
    try {
      const data = await getEmployeeByIdServices(id);
      setEmpleado(data);
      const tareasData = await getTareasByIdServices(id);
      setTareas(tareasData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      const result = await deleteEmployeeByIdServices(id);
      if (!result) {
        Toast.show({ type: "error", text1: "Error al eliminar el empleado" });
        return;
      }
      onClose();
      onDelete();
      setTimeout(() => Toast.show({ type: "success", text1: "Borrado exitosamente" }), 300);
    } catch (error) {
      console.log(error);
    }
  };

  const iniciales = empleado?.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <TouchableOpacity style={styles.conteiner} activeOpacity={1}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{iniciales}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.titulo}>{empleado?.name}</Text>
              <Text style={styles.email}>{empleado?.email}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#7BA7C7" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Info rows */}
          {[
            { icon: "card-outline", label: "CÉDULA", value: empleado?.cedula },
            { icon: "call-outline", label: "TELÉFONO", value: empleado?.telefono },
            { icon: "cash-outline", label: "SUELDO", value: `RD$ ${Number(empleado?.sueldo).toLocaleString()}` },
            { icon: "location-outline", label: "DIRECCIÓN", value: empleado?.direccion },
            { icon: "map-outline", label: "CIUDAD", value: empleado?.ciudad },
            {
              icon: "calendar-outline", label: "FECHA DE NACIMIENTO",
              value: empleado?.cumpleaños ? new Date(empleado.cumpleaños).toISOString().split("T")[0] : ""
            },
          ].map((item) => (
            <View key={item.label} style={styles.row}>
              <View style={styles.rowIcon}>
                <Ionicons name={item.icon as any} size={18} color="#1A73E8" />
              </View>
              <View>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowValue}>{item.value}</Text>
              </View>
            </View>
          ))}

          {/* Tareas */}
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="folder-outline" size={18} color="#F5A623" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>TAREA ASIGNADA</Text>
              {tareas.length === 0 ? (
                <Text style={styles.rowValue}>Sin tareas</Text>
              ) : !tienePendientes ? (
                <Text style={{ color: "#22C55E", fontWeight: "600" }}>✓ Última tarea completada</Text>
              ) : (
                tareas.filter((tarea: any) => !tarea.completada).map((tarea: any) => (
                  <View key={tarea.id} style={styles.tareaItem}>
                    <Text style={styles.tareaNombre}>{tarea.name}</Text>
                    <Text style={styles.tareaDesc} numberOfLines={2}>
                      {tarea.descripcion} · Pendiente
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Botones */}
          <View style={styles.botonesRow}>
            <TouchableOpacity onPress={() => deleteEmployee(id)} style={styles.btnEliminar}>
              <Ionicons name="trash-outline" size={16} color="#EF4444" />
              <Text style={styles.btnEliminarText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditVisible(true)} style={styles.btnEditar}>
              <Ionicons name="flash" size={16} color="#F5A623" />
              <Text style={styles.btnEditarText}>Editar</Text>
            </TouchableOpacity>
          </View>

          <ModalEditEmployee
            visible={editVisible}
            onClose={() => setEditVisible(false)}
            empleado={empleado}
            onSuccess={() => { getEmployees(); onDelete(); }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 30, 60, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  conteiner: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    shadowColor: "#1A4F7A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  headerInfo: {
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1A4F7A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1A4F7A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
  closeBtn: {
    backgroundColor: "#D6E8F7",
    borderRadius: 20,
    padding: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A4F7A",
  },
  email: {
    fontSize: 13,
    color: "#7BA7C7",
  },
  divider: {
    height: 1,
    backgroundColor: "#D6E8F7",
    marginBottom: 14,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  rowIcon: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 9,
    marginRight: 14,
  },
  rowLabel: {
    fontSize: 10,
    color: "#93C5FD",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  rowValue: {
    fontSize: 14,
    color: "#1E3A5F",
    fontWeight: "500",
    marginTop: 1,
  },
  tareaItem: {
    marginTop: 4,
  },
  tareaNombre: {
    fontSize: 14,
    color: "#1E3A5F",
    fontWeight: "600",
  },
  tareaDesc: {
    fontSize: 12,
    color: "#7BA7C7",
    marginTop: 2,
  },
  botonesRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  btnEliminar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  btnEliminarText: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 15,
  },
  btnEditar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#1A4F7A",
    borderRadius: 12,
    paddingVertical: 13,
    shadowColor: "#1A4F7A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  btnEditarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ModalEmployee;