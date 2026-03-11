import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import {
  deleteTareaServices,
  getTareaByIdServices,
  updateTareaServices,
} from "../../../services/takstServices";
import { getEmployeeByIdServices } from "../../../services/empleadoServices";

interface Tarea {
  id: number;
  name: string;
  descripcion: string;
  userId: number;
}

interface ModalTareaProps {
  visible: boolean;
  onClose: () => void;
  id: number;
  onRefresh: () => void;
}

const ModalTarea = ({ visible, onClose, id, onRefresh }: ModalTareaProps) => {
  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [completada, setCompletada] = useState(false);

  useEffect(() => {
    if (id) fetchTarea();
  }, [id]);

  const fetchTarea = async () => {
    try {
      const data = await getTareaByIdServices(id);
      setTarea(data);
      setName(data.name);
      setDescripcion(data.descripcion);
      setCompletada(data.completada);
      const employeeData = await getEmployeeByIdServices(data.userId);
      setEmployeeName(employeeData.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTareaServices(id);
      onClose();
      onRefresh();
      setTimeout(() => Toast.show({ type: "success", text1: "Tarea eliminada" }), 300);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      await updateTareaServices(id, { name, descripcion, completada });
      setEditMode(false);
      fetchTarea();
      onRefresh();
      Toast.show({ type: "success", text1: "Tarea actualizada" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%" }}
        >
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <ScrollView showsVerticalScrollIndicator={false}>

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.iconBox}>
                  <Ionicons name="checkmark-circle-outline" size={28} color="#1A73E8" />
                </View>
                <Text style={styles.headerTitulo}>Detalle de Tarea</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color="#7BA7C7" />
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              {/* Nombre */}
              <Text style={styles.label}>NOMBRE</Text>
              {editMode ? (
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#93C5FD"
                />
              ) : (
                <Text style={styles.value}>{tarea?.name}</Text>
              )}

              <View style={styles.divider} />

              {/* Descripción */}
              <Text style={styles.label}>DESCRIPCIÓN</Text>
              {editMode ? (
                <TextInput
                  style={[styles.input, { height: 80, textAlignVertical: "top" }]}
                  value={descripcion}
                  onChangeText={setDescripcion}
                  multiline
                  placeholderTextColor="#93C5FD"
                />
              ) : (
                <Text style={styles.value}>{tarea?.descripcion}</Text>
              )}

              <View style={styles.divider} />

              {/* Empleado */}
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Ionicons name="person-outline" size={16} color="#1A73E8" />
                </View>
                <View>
                  <Text style={styles.label}>EMPLEADO</Text>
                  <Text style={styles.value}>{employeeName}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Completada */}
              <View style={styles.switchRow}>
                <View style={styles.switchLeft}>
                  <View style={styles.rowIcon}>
                    <Ionicons name="checkmark-done-outline" size={16} color={completada ? "#22C55E" : "#7BA7C7"} />
                  </View>
                  <Text style={styles.label}>COMPLETADA</Text>
                </View>
                <Switch
                  value={completada}
                  onValueChange={setCompletada}
                  trackColor={{ false: "#D6E8F7", true: "#22C55E" }}
                  thumbColor="white"
                  disabled={!editMode}
                />
              </View>

              <View style={styles.divider} />

              {/* Botones */}
              {editMode ? (
                <>
                  <TouchableOpacity style={styles.btnGuardar} onPress={handleEdit}>
                    <Ionicons name="flash" size={16} color="#F5A623" style={{ marginRight: 8 }} />
                    <Text style={styles.btnGuardarText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnCancelar} onPress={() => setEditMode(false)}>
                    <Text style={styles.btnCancelarText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              ) : completada ? (
                <View style={styles.completadaBox}>
                  <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.completadaText}>Tarea completada</Text>
                    <Text style={styles.completadaSubText}>No se puede editar ni eliminar</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.botonesRow}>
                  <TouchableOpacity style={styles.btnEliminar} onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={16} color="#EF4444" />
                    <Text style={styles.btnEliminarText}>Eliminar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnEditar} onPress={() => setEditMode(true)}>
                    <Ionicons name="flash" size={16} color="#F5A623" />
                    <Text style={styles.btnEditarText}>Editar</Text>
                  </TouchableOpacity>
                </View>
              )}

            </ScrollView>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  container: {
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
    marginBottom: 12,
    gap: 10,
  },
  headerTitulo: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A4F7A",
  },
  iconBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 10,
  },
  closeBtn: {
    backgroundColor: "#D6E8F7",
    borderRadius: 20,
    padding: 8,
  },
  label: {
    fontSize: 10,
    color: "#93C5FD",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: "#1E3A5F",
    fontWeight: "500",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1E3A5F",
    marginBottom: 12,
    backgroundColor: "#F0F6FF",
  },
  divider: {
    height: 1,
    backgroundColor: "#D6E8F7",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  rowIcon: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 8,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  switchLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  completadaBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  completadaText: {
    color: "#16A34A",
    fontWeight: "600",
    fontSize: 15,
  },
  completadaSubText: {
    color: "#7BA7C7",
    fontSize: 12,
    marginTop: 2,
  },
  botonesRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
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
  btnEditarText: { color: "white", fontWeight: "bold", fontSize: 15 },
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
  btnEliminarText: { color: "#EF4444", fontWeight: "600", fontSize: 15 },
  btnGuardar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A4F7A",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
    shadowColor: "#1A4F7A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  btnGuardarText: { color: "white", fontWeight: "bold", fontSize: 15 },
  btnCancelar: {
    backgroundColor: "#F0F6FF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#D6E8F7",
  },
  btnCancelarText: { color: "#1A4F7A", fontWeight: "600", fontSize: 15 },
});

export default ModalTarea;