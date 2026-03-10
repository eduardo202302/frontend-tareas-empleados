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
  <TouchableOpacity
    style={styles.overlay}
    onPress={onClose}
    activeOpacity={1}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%", justifyContent: "flex-end" }}
    >
      <TouchableOpacity style={[styles.container, { maxHeight: "90%" }]} activeOpacity={1}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Editar Empleado</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

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
                <SelectCiudad label="Ciudad" placeholder="San Pedro de Macorís" onValueChange={field.onChange} labelKey="label"
                  valueKey="value" value={field.value}/>
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

          <TouchableOpacity style={styles.btnGuardar} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
            <Text style={styles.btnGuardarText}>Guardar Cambios</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  closeBtn: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 8,
  },
  error: {
    color: "red",
    fontSize: 11,
    marginTop: -12,
    marginLeft: 16,
  },
  btnGuardar: {
    backgroundColor: "#1A73E8",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  btnGuardarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ModalEditEmployee;