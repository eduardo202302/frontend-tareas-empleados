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
    console.log("Datos del formulario:", data);
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
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.screen}>
              <Text style={styles.titulo}>Formulario de Registro</Text>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText
                      label="Nombre Completo"
                      placeholder="Ingresa tu nombre completo"
                      icon="person-outline"
                      autoCapitalize="none"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                    {fieldState.error && (
                      <Text style={{ color: "red", fontSize: 11, marginTop: -12, marginLeft: 16 }}>
                        {fieldState.error?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText
                      label="Correo Electrónico"
                      placeholder="correo@ejemplo.com"
                      icon="mail-outline"
                      keyboardType="email-address"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                    {fieldState.error && (
                      <Text style={{ color: "red", fontSize: 11, marginTop: -12, marginLeft: 16 }}>
                        {fieldState.error?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="telefono"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText
                      label="Teléfono"
                      placeholder="809-000-0000"
                      icon="call-outline"
                      autoCapitalize="none"
                      keyboardType="phone-pad"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                    {fieldState.error && (
                      <Text style={{ color: "red", fontSize: 11, marginTop: -12, marginLeft: 16 }}>
                        {fieldState.error?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="cedula"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText
                      label="Cédula"
                      placeholder="001-0000000-0"
                      autoCapitalize="none"
                      icon="card-outline"
                      keyboardType="numeric"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                    {fieldState.error && (
                      <Text style={{ color: "red", fontSize: 11, marginTop: -12, marginLeft: 16 }}>
                        {fieldState.error?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="cumpleaños"
                render={({ field, fieldState }) => (
                  <View>
                    <DateField
                      label="Fecha de Nacimiento"
                      placeholder="Selecciona tu fecha de nacimiento"
                      autoCapitalize="none"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                    {fieldState.error && (
                      <Text style={{ color: "red", fontSize: 11, marginTop: -12, marginLeft: 16 }}>
                        {fieldState.error?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="direccion"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText
                      label="Direccion"
                      placeholder="San Pedro de Macoris"
                      icon="location-outline"
                      autoCapitalize="none"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                    {fieldState.error && (
                      <Text style={{ color: "red", fontSize: 11, marginTop: -12, marginLeft: 16 }}>
                        {fieldState.error?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="ciudad"
                render={({ field, fieldState }) => (
                  <SelectCiudad
                    label="Ciudad"
                    placeholder="Selecciona tu ciudad"
                    onValueChange={field.onChange}
                    value={field.value}
                    error={fieldState.error?.message}
                    labelKey="label"
                    valueKey="value"
                  />
                )}
              />
              <Controller
                control={control}
                name="sueldo"
                render={({ field, fieldState }) => (
                  <View>
                    <InputText
                      label="Sueldo"
                      placeholder="45000"
                      icon="cash-outline"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                    {fieldState.error && (
                      <Text style={{ color: "red", fontSize: 11, marginTop: -12, marginLeft: 16 }}>
                        {fieldState.error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                <Text style={styles.textButton}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Toast />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  textButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  screen: {
    marginTop: 26,
    marginHorizontal: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#111827",
  },
  wrapper: {
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    position: "absolute",
    top: -9,
    left: 12,
    backgroundColor: "white",
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#6B7280",
    zIndex: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  icono: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1A73E8",
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default Form;