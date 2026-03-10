import { TareaForm } from "../src/schema/tasksSchema";

const createTareasServices = async (data: TareaForm) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/tareas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear la tarea");
    return await response.json();
  } catch (error) {
    console.error("Error en createTareasServices:", error);
    throw error;
  }
};

const getTareasServices = async () => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/tareas`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Error al obtener las tareas");
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error en getTareasServices:", error);
    throw error;
  }
};

const getTareasByIdServices = async (userId: number) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/tareas/byUser/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Error al obtener las tareas");
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error en getTareasByIdServices:", error);
    throw error;
  }
};

const getTareaByIdServices = async (id: number) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/tareas/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Error al obtener la tarea");
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error en getTareaByIdServices:", error);
    throw error;
  }
};

const updateTareaServices = async (id: number, data: { name: string; descripcion: string; completada: boolean }) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/tareas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar la tarea");
    return await response.json();
  } catch (error) {
    console.error("Error en updateTareaServices:", error);
    throw error;
  }
};

const deleteTareaServices = async (id: number) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/tareas/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Error al eliminar la tarea");
    return await response.json();
  } catch (error) {
    console.error("Error en deleteTareaServices:", error);
    throw error;
  }
};

export {
  createTareasServices,
  getTareasServices,
  getTareasByIdServices,
  getTareaByIdServices,
  updateTareaServices,
  deleteTareaServices,
};