import { EmpleadoForm } from "../src/schema/empleadoSchema";

const createEmployeesServices = async (data: EmpleadoForm) => {
  try {
    const payload = {
      ...data,
      ciudad: data.ciudad,
      sueldo: Number(data.sueldo),
      cumpleaños: Date.parse(data.cumpleaños)
        ? new Date(data.cumpleaños)
        : null,
    };

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error("Error al crear el empleado");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en createEmployeesServices:", error);
    throw error;
  }
};

const getEmployeesServices = async () => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error al obtener los empleados");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error en getEmployeesServices:", error);
    throw error;
  }
};

const getEmployeeByIdServices = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error al obtener el empleado");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error en getEmployeeByIdServices:", error);
    throw error;
  }
};

const updateEmployeeByIdServices = async (id: number, data: EmpleadoForm) => {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      telefono: data.telefono,
      cedula: data.cedula,
      ciudad: data.ciudad,
      sueldo: Number(data.sueldo),
      direccion: data.direccion,
      cumpleaños: data.cumpleaños ? new Date(data.cumpleaños) : null,
    };

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/user/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) throw new Error("Error al actualizar el empleado");
    return await response.json();
  } catch (error) {
    console.error("Error en updateEmployeeByIdServices:", error);
    throw error;
  }
};

const deleteEmployeeByIdServices = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/user/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el empleado");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error en deleteEmployeeByIdServices:", error);
    throw error;
  }
};

export {
  createEmployeesServices,
  getEmployeesServices,
  getEmployeeByIdServices,
  updateEmployeeByIdServices,
  deleteEmployeeByIdServices,
};
