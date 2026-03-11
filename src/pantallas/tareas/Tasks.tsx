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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { TareaForm, tareaSchema } from "../../schema/tasksSchema";
import { createTareasServices } from "../../../services/takstServices";
import InputText from "../../components/InputField";
import SelectField from "../../components/tareas/SelectField";
import { Ionicons } from "@expo/vector-icons";

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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#4A7BAF" }}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <View style={styles.screen}>

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.logoRow}>
                  <Ionicons name="flash" size={26} color="#F5A623" />
                  <Text style={styles.logoText}>iKompras</Text>
                </View>
                <Text style={styles.titulo}>Agregar Tarea</Text>
                <Text style={styles.subtitulo}>Asigna una tarea a un empleado</Text>
              </View>

              {/* Card */}
              <View style={styles.card}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <View>
                      <InputText
                        label="Nombre de la tarea"
                        placeholder="Ingresa el nombre de la tarea"
                        icon="document-text-outline"
                        autoCapitalize="none"
                        onChangeText={field.onChange}
                        value={field.value}
                      />
                      {fieldState.error && (
                        <Text style={styles.errorText}>{fieldState.error?.message}</Text>
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
                        icon="create-outline"
                        onChangeText={field.onChange}
                        value={field.value}
                      />
                      {fieldState.error && (
                        <Text style={styles.errorText}>{fieldState.error?.message}</Text>
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
                  style={[styles.button, isSubmitting && { opacity: 0.7 }]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  <Ionicons name="flash" size={16} color="#F5A623" style={{ marginRight: 8 }} />
                  <Text style={styles.textButton}>
                    {isSubmitting ? "Guardando..." : "Registrar Tarea"}
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