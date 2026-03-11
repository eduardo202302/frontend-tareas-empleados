import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import InputText from "./InputField";
import DateField from "./DateField";
import { EmpleadoForm, empleadoSchema } from "../schema/empleadoSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { createEmployeesServices } from "../../services/empleadoServices";
import SelectCiudad from "./SelectCiudad";
import { Ionicons } from "@expo/vector-icons";

const Form = () => {
  const registroDefaulValue: EmpleadoForm = {
    name: "",
    cedula: "",
    email: "",
    telefono: "",
    sueldo: "",
    cumpleaños: "",
    direccion: "",
    ciudad: "",
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<EmpleadoForm>({
    defaultValues: registroDefaulValue,
    resolver: zodResolver(empleadoSchema),
  });

  const onSubmit = async (data: EmpleadoForm) => {
    const response = await createEmployeesServices(data);
    if (!response) {
      Alert.alert("Error", "No se pudo registrar el empleado");
      return;
    }
    Toast.show({
      type: "success",
      text1: "✅ Empleado registrado",
      text2: "Los datos fueron guardados correctamente",
    });
    reset();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#82afe0" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.screen}>

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.logoRow}>
                  <Ionicons name="flash" size={26} color="#F5A623" />
                  <Text style={styles.logoText}>iKompras</Text>
                </View>
                <Text style={styles.titulo}>Registro de Empleado</Text>
                <Text style={styles.subtitulo}>Completa los datos del empleado</Text>
              </View>

              {/* Card */}
              <View style={styles.card}>
                <Controller
                  control={control} name="name"
                  render={({ field, fieldState }) => (
                    <View>
                      <InputText label="Nombre Completo" placeholder="Ingresa tu nombre completo" icon="person-outline" autoCapitalize="none" onChangeText={field.onChange} value={field.value} />
                      {fieldState.error && <Text style={styles.errorText}>{fieldState.error?.message}</Text>}
                    </View>
                  )}
                />
                <Controller
                  control={control} name="email"
                  render={({ field, fieldState }) => (
                    <View>
                      <InputText label="Correo Electrónico" placeholder="correo@ejemplo.com" icon="mail-outline" keyboardType="email-address" onChangeText={field.onChange} value={field.value} />
                      {fieldState.error && <Text style={styles.errorText}>{fieldState.error?.message}</Text>}
                    </View>
                  )}
                />
                <Controller
                  control={control} name="telefono"
                  render={({ field, fieldState }) => (
                    <View>
                      <InputText label="Teléfono" placeholder="809-000-0000" icon="call-outline" autoCapitalize="none" keyboardType="phone-pad" onChangeText={field.onChange} value={field.value} />
                      {fieldState.error && <Text style={styles.errorText}>{fieldState.error?.message}</Text>}
                    </View>
                  )}
                />
                <Controller
                  control={control} name="cedula"
                  render={({ field, fieldState }) => (
                    <View>
                      <InputText label="Cédula" placeholder="001-0000000-0" autoCapitalize="none" icon="card-outline" keyboardType="numeric" onChangeText={field.onChange} value={field.value} />
                      {fieldState.error && <Text style={styles.errorText}>{fieldState.error?.message}</Text>}
                    </View>
                  )}
                />
                <Controller
                  control={control} name="cumpleaños"
                  render={({ field, fieldState }) => (
                    <View>
                      <DateField label="Fecha de Nacimiento" placeholder="Selecciona tu fecha de nacimiento" autoCapitalize="none" onChangeText={field.onChange} value={field.value} />
                      {fieldState.error && <Text style={styles.errorText}>{fieldState.error?.message}</Text>}
                    </View>
                  )}
                />
                <Controller
                  control={control} name="direccion"
                  render={({ field, fieldState }) => (
                    <View>
                      <InputText label="Dirección" placeholder="San Pedro de Macorís" icon="location-outline" autoCapitalize="none" onChangeText={field.onChange} value={field.value} />
                      {fieldState.error && <Text style={styles.errorText}>{fieldState.error?.message}</Text>}
                    </View>
                  )}
                />
                <Controller
                  control={control} name="ciudad"
                  render={({ field, fieldState }) => (
                    <SelectCiudad
                      label="Ciudad"
                      placeholder="Selecciona tu ciudad"
                      onValueChange={field.onChange}
                      value={field.value}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  control={control} name="sueldo"
                  render={({ field, fieldState }) => (
                    <View>
                      <InputText label="Sueldo" placeholder="45000" icon="cash-outline" keyboardType="numeric" autoCapitalize="none" onChangeText={field.onChange} value={field.value} />
                      {fieldState.error && <Text style={styles.errorText}>{fieldState.error?.message}</Text>}
                    </View>
                  )}
                />

                <TouchableOpacity
                  style={[styles.button, isSubmitting && { opacity: 0.7 }]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  <Ionicons name="flash" size={16} color="#F5A623" style={{ marginRight: 8 }} />
                  <Text style={styles.textButton}>
                    {isSubmitting ? "Registrando..." : "Registrar Empleado"}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Toast />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 16,
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    paddingVertical: 28,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
  },
  subtitulo: {
    fontSize: 13,
    color: "#D6E8F7",
    marginTop: 4,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#1A4F7A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 10,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 11,
    marginTop: -12,
    marginLeft: 16,
    marginBottom: 4,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#1A4F7A",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1A4F7A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});

export default Form;