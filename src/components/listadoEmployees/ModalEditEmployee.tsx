import React, { useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { EmpleadoForm, empleadoSchema } from "../../schema/empleadoSchema";
import { updateEmployeeByIdServices } from "../../../services/empleadoServices";
import InputText from "../InputField";
import DateField from "../DateField";
import { employees } from "../../types/inputField";
import SelectCiudad from "../SelectCiudad";

interface ModalEditProps {
  visible: boolean;
  onClose: () => void;
  empleado: employees | null;
  onSuccess: () => void;
}

const ModalEditEmployee = ({ visible, onClose, empleado, onSuccess }: ModalEditProps) => {
  const { handleSubmit, control, reset, formState: { isSubmitting } } = useForm<EmpleadoForm>({
    resolver: zodResolver(empleadoSchema),
  });

  useEffect(() => {
    if (empleado) {
      reset({
        name: empleado.name,
        email: empleado.email,
        telefono: empleado.telefono,
        cedula: empleado.cedula,
        ciudad: empleado.ciudad,
        sueldo: String(empleado.sueldo),
        direccion: empleado.direccion,
        cumpleaños: empleado.cumpleaños ? new Date(empleado.cumpleaños).toISOString().split("T")[0] : "",
      });
    }
  }, [empleado]);

  const onSubmit = async (data: EmpleadoForm) => {
    try {
      await updateEmployeeByIdServices(empleado!.id, data);
      onClose();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%", justifyContent: "flex-end" }}
        >
          <TouchableOpacity style={styles.container} activeOpacity={1}>

            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Ionicons name="flash" size={20} color="#F5A623" />
                <Text style={styles.titulo}>Editar Empleado</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={20} color="#7BA7C7" />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Controller
                control={control} name="name"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText label="Nombre" placeholder="Nombre completo" icon="person-outline" onChangeText={field.onChange} value={field.value} />
                    {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                  </View>
                )}
              />
              <Controller
                control={control} name="email"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText label="Correo" placeholder="correo@ejemplo.com" icon="mail-outline" keyboardType="email-address" onChangeText={field.onChange} value={field.value} />
                    {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                  </View>
                )}
              />
              <Controller
                control={control} name="telefono"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText label="Teléfono" placeholder="809-000-0000" icon="call-outline" keyboardType="phone-pad" onChangeText={field.onChange} value={field.value} />
                    {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                  </View>
                )}
              />
              <Controller
                control={control} name="cedula"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText label="Cédula" placeholder="001-0000000-0" icon="card-outline" keyboardType="numeric" onChangeText={field.onChange} value={field.value} />
                    {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                  </View>
                )}
              />
              <Controller
                control={control} name="cumpleaños"
                render={({ field, fieldState }) => (
                  <View>
                    <DateField label="Fecha de Nacimiento" placeholder="Selecciona fecha" onChangeText={field.onChange} value={field.value} autoCapitalize="none" />
                    {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                  </View>
                )}
              />
              <Controller
                control={control} name="direccion"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText label="Dirección" placeholder="San Pedro de Macorís" icon="location-outline" onChangeText={field.onChange} value={field.value} />
                    {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                  </View>
                )}
              />
              <Controller
                control={control} name="ciudad"
                render={({ field, fieldState }) => (
                  <View>
                    <SelectCiudad label="Ciudad" placeholder="San Pedro de Macorís" onValueChange={field.onChange} value={field.value} />
                    {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                  </View>
                )}
              />
              <Controller
                control={control} name="sueldo"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText label="Sueldo" placeholder="45000" icon="cash-outline" keyboardType="numeric" onChangeText={field.onChange} value={field.value} />
                    {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                  </View>
                )}
              />

              <TouchableOpacity
                style={[styles.btnGuardar, isSubmitting && { opacity: 0.7 }]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                <Ionicons name="flash" size={16} color="#F5A623" style={{ marginRight: 8 }} />
                <Text style={styles.btnGuardarText}>
                  {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </Text>
              </TouchableOpacity>
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
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: "90%",
    shadowColor: "#1A4F7A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A4F7A",
  },
  closeBtn: {
    backgroundColor: "#D6E8F7",
    borderRadius: 20,
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#D6E8F7",
    marginBottom: 16,
  },
  error: {
    color: "#EF4444",
    fontSize: 11,
    marginTop: -12,
    marginLeft: 16,
  },
  btnGuardar: {
    backgroundColor: "#1A4F7A",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
    shadowColor: "#1A4F7A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnGuardarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ModalEditEmployee;