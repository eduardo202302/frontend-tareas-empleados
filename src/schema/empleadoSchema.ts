import { z } from "zod";

const empleadoSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  cedula: z.string().min(11, "Cédula inválida"),
  email: z.string().email("Correo inválido"),
  telefono: z.string().min(10, "Teléfono inválido"),
  sueldo: z.string().min(1, "El sueldo es requerido"),
  ciudad: z.string().min(1, "La ciudad es requerida"),
  cumpleaños: z.string().min(1, "La fecha es requerida"),
  direccion: z.string().min(3, "La dirección debe tener al menos 3 caracteres"),
});

type EmpleadoForm = z.infer<typeof empleadoSchema>;

export { empleadoSchema}
export type { EmpleadoForm };