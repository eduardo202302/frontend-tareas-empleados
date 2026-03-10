import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Form from "../Form";
import MenuHeader from "./MenuHeader";
import Tasks from "../../pantallas/tareas/Tasks";
import ListadoEmployees from "../../pantallas/empleados/ListadoEmployees";
import ListadoTareas from "../../pantallas/ListadoTarea/ListadoTareas";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1A73E8" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerLeft: () => <MenuHeader />,
        }}
      >
        <Stack.Screen name="Registro" component={Form} />
        <Stack.Screen name="Empleados" component={ListadoEmployees} />
        <Stack.Screen name="Crear Tarea" component={Tasks} />
        <Stack.Screen name="Tareas" component={ListadoTareas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}