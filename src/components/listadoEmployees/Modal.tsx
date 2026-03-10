import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  deleteEmployeeByIdServices,
  getEmployeeByIdServices,
  getEmployeesServices,
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

  console.log("tareas:", tareas);

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
        Toast.show({
          type: "error",
          text1: "Error al eliminar el empleado",
        });
        return;
      }
      onClose();
      onDelete();
      setTimeout(
        () => Toast.show({ type: "success", text1: "Borrado exitosamente" }),
        300,
      );

      Toast.show({ type: "success", text1: "Borrado exitosamente" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity style={styles.conteiner} activeOpacity={1}>
          {/* Avatar y cerrar */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {empleado?.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Nombre y email */}
          <Text style={styles.titulo}>{empleado?.name}</Text>
          <Text style={styles.email}>{empleado?.email}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Cédula */}
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="card-outline" size={18} color="#4F86C6" />
            </View>
            <View>
              <Text style={styles.rowLabel}>CÉDULA</Text>
              <Text style={styles.rowValue}>{empleado?.cedula}</Text>
            </View>
          </View>

          {/* Teléfono */}
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="call-outline" size={18} color="#4F86C6" />
            </View>
            <View>
              <Text style={styles.rowLabel}>TELÉFONO</Text>
              <Text style={styles.rowValue}>{empleado?.telefono}</Text>
            </View>
          </View>

          {/* Sueldo */}
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="cash-outline" size={18} color="#4F86C6" />
            </View>
            <View>
              <Text style={styles.rowLabel}>SUELDO</Text>
              <Text style={styles.rowValue}>
                RD$ {Number(empleado?.sueldo).toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Dirección */}
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="location-outline" size={18} color="#4F86C6" />
            </View>
            <View>
              <Text style={styles.rowLabel}>DIRECCIÓN</Text>
              <Text style={styles.rowValue}>{empleado?.direccion}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="location-outline" size={18} color="#4F86C6" />
            </View>
            <View>
              <Text style={styles.rowLabel}>CIUDAD</Text>
              <Text style={styles.rowValue}>{empleado?.ciudad}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="calendar-outline" size={18} color="#4F86C6" />
            </View>
            <View>
              <Text style={styles.rowLabel}>FECHA DE NACIMIENTO</Text>
              <Text style={styles.rowValue}>
                {empleado?.cumpleaños
                  ? new Date(empleado.cumpleaños).toISOString().split("T")[0]
                  : ""}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="folder-outline" size={18} color="#4F86C6" />
            </View>
            <View>
              <Text style={styles.rowLabel}>TAREA ASIGNADA</Text>
              {tareas.length === 0 ? (
                <Text style={styles.rowValue}>Sin tareas</Text>
              ) : !tienePendientes ? (
                <Text style={{ color: "green" }}>Ultima Tarea completada</Text>
              ) : (
                tareas
                  .filter((tarea: any) => !tarea.completada)
                  .map((tarea: any) => (
                    <View key={tarea.id} style={{ flexDirection: "column" }}>
                      <Text>{tarea.name}</Text>
                      <Text
                        style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}
                        numberOfLines={2}
                      >
                        {tarea.descripcion} (Pendiente)
                      </Text>
                    </View>
                  ))
              )}
            </View>
          </View>

          {/* Botón cerrar */}
          <TouchableOpacity
            onPress={() => deleteEmployee(id)}
            style={styles.btnCerrar}
          >
            <Text style={styles.btnCerrarText}>Eliminar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setEditVisible(true)}
            style={styles.btnEditar}
          >
            <Text style={styles.btnEditarText}>Editar</Text>
          </TouchableOpacity>

          <ModalEditEmployee
            visible={editVisible}
            onClose={() => setEditVisible(false)}
            empleado={empleado}
            onSuccess={() => {
              getEmployees();
              onDelete();
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  conteiner: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4F86C6",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  closeBtn: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  email: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  rowIcon: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 10,
    marginRight: 14,
  },
  rowLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  rowValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  btnCerrar: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  btnCerrarText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 15,
  },

  btnEditar: {
    backgroundColor: "#1A73E8",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  btnEditarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ModalEmployee;
