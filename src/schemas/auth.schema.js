import { z } from "zod";

export const signupSchema = z.object({
  userName: z.string({
    required_error: "El nombre de usuario es necesario",
  }),

  email: z
    .string({
      required_error: "El email es necesario",
    })
    .email({
      message: "Correo inválido",
    }),

  password: z
    .string({
      required_error: "La contraseña es necesaria",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),

  phoneNumber: z
    .string({
      required_error: "El número de teléfono es necesario",
    })
    .min(10, {
      message: "El número de celular debe tener al menos 10 dígitos",
    })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "El número de celular solo puede contener dígitos",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es necesario",
    })
    .email({
      message: "Correo inválido",
    }),

  password: z
    .string({
      required_error: "La contraseña es necesaria",
    })
});
