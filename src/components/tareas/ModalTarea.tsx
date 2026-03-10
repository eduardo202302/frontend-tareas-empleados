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
      setTimeout(
        () => Toast.show({ type: "success", text1: "Tarea eliminada" }),
        300,
      );
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
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%" }}
        >
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.iconBox}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={28}
                    color="#4F86C6"
                  />
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Nombre */}
              <Text style={styles.label}>NOMBRE</Text>
              {editMode ? (
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              ) : (
                <Text style={styles.value}>{tarea?.name}</Text>
              )}

              <View style={styles.divider} />

              {/* Descripción */}
              <Text style={styles.label}>DESCRIPCIÓN</Text>
              {editMode ? (
                <TextInput
                  style={[styles.input, { height: 80 }]}
                  value={descripcion}
                  onChangeText={setDescripcion}
                  multiline
                />
              ) : (
                <Text style={styles.value}>{tarea?.descripcion}</Text>
              )}

              <View style={styles.divider} />

              <Text style={styles.label}>EMPLEADO</Text>
              <Text style={styles.value}>{employeeName}</Text>

              <View style={styles.divider} />

              <View style={styles.divider} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text style={styles.label}>COMPLETADA</Text>
                <Switch
                  value={completada}
                  onValueChange={setCompletada}
                  trackColor={{ false: "#D1D5DB", true: "#1A73E8" }}
                  disabled={!editMode}
                />
              </View>

              {editMode ? (
                <>
                  <TouchableOpacity
                    style={styles.btnGuardar}
                    onPress={handleEdit}
                  >
                    <Text style={styles.btnGuardarText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnCancelar}
                    onPress={() => setEditMode(false)}
                  >
                    <Text style={styles.btnCancelarText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              ) : completada ? (
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 8,
                    padding: 14,
                    backgroundColor: "#F0FDF4",
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#16A34A",
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    Tarea completada
                  </Text>
                  <Text
                    style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}
                  >
                    No se puede editar ni eliminar
                  </Text>
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.btnEditar}
                    onPress={() => setEditMode(true)}
                  >
                    <Text style={styles.btnEditarText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnEliminar}
                    onPress={handleDelete}
                  >
                    <Text style={styles.btnEliminarText}>Eliminar</Text>
                  </TouchableOpacity>
                </>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
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
  iconBox: { backgroundColor: "#EFF6FF", borderRadius: 12, padding: 10 },
  closeBtn: { backgroundColor: "#F3F4F6", borderRadius: 20, padding: 8 },
  label: { fontSize: 11, color: "#9CA3AF", marginBottom: 6 },
  value: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111827",
    marginBottom: 12,
  },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginBottom: 12 },
  btnEditar: {
    backgroundColor: "#1A73E8",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  btnEditarText: { color: "white", fontWeight: "bold", fontSize: 15 },
  btnEliminar: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  btnEliminarText: { color: "#374151", fontWeight: "600", fontSize: 15 },
  btnGuardar: {
    backgroundColor: "#1A73E8",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  btnGuardarText: { color: "white", fontWeight: "bold", fontSize: 15 },
  btnCancelar: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  btnCancelarText: { color: "#374151", fontWeight: "600", fontSize: 15 },
});

export default ModalTarea;
