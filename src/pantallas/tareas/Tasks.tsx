import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { TareaForm, tareaSchema } from "../../schema/tasksSchema";
import { createTareasServices } from "../../../services/takstServices";
import InputText from "../../components/InputField";
import SelectField from "../../components/tareas/SelectField";

const Form = () => {
  const registroDefaulValue: TareaForm = {
    name: "",
    descripcion: "",
    userId: 0,
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<TareaForm>({
    defaultValues: registroDefaulValue,
    resolver: zodResolver(tareaSchema),
  });

  const onSubmit = async (data: TareaForm) => {
    const response = await createTareasServices(data);
    if (!response) {
      Alert.alert("Error", "No se pudo registrar la tarea");
      return;
    }
    Toast.show({
      type: "success",
      text1: "✅ Tarea registrada",
      text2: "Los datos fueron guardados correctamente",
    });
    reset();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.screen}>
            <Text style={styles.titulo}>Agregar Tareas a Empleados</Text>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <View>
                  <InputText
                    label="Nombre de la tarea"
                    placeholder="Ingresa el nombre de la tarea"
                    icon="person-outline"
                    autoCapitalize="none"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                  {fieldState.error && (
                    <Text
                      style={{
                        color: "red",
                        fontSize: 11,
                        marginTop: -12,
                        marginLeft: 16,
                      }}
                    >
                      {fieldState.error?.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="descripcion"
              render={({ field, fieldState }) => (
                <View>
                  <InputText
                    label="Descripción"
                    placeholder="Describe la tarea"
                    icon="document-text-outline"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                  {fieldState && (
                    <Text
                      style={{
                        color: "red",
                        fontSize: 11,
                        marginTop: -12,
                        marginLeft: 16,
                      }}
                    >
                      {fieldState.error?.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="userId"
              render={({ field, fieldState }) => (
                <SelectField
                  label="Empleados"
                  value={field.value}
                  onValueChange={field.onChange}
                  labelKey="name"
                  valueKey="id"
                  error={fieldState.error?.message}
                />
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
