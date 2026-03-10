import { z } from "zod";

const tareaSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z.string().min(3, "La descripción debe tener al menos 3 caracteres"),
  userId: z.number().min(1, "El ID del usuario es requerido"),
});

type TareaForm = z.infer<typeof tareaSchema>;

export { tareaSchema }
export type { TareaForm };