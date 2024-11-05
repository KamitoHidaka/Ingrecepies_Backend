import {z} from "zod";

export const recipeSchema = z.object({
    name: z
    .string({
        required_error: "El nombre de la receta es obligatorio"
    })
    .min(3,{
        message: "El nombre de la receta debe tener al menos 3 caracteres",
    }),

    category: z.string({
        required_error: "La categoria es obligatoria",
    }),

    image: z.string({
        required_error: "La foto es obligatoria",
    }),

    description: z.string().max(500, {
        message: "La descripción debe ser menor a 500 caracteres",
    }),

    steps: z.array(
        z.object({
            step: z
                .string({
                    required_error: "El paso a seguir es obligatorio",
                })
                .min(4, {
                    message: "El paso debe tener al menos 4 caracteres",
                }),
        })
    ),
    ingredients: z.array(
        z.object({
            ingredientName: z.string({
                required_error: "El ingrediente es obligatorio",
            }),
            quantity: z.string({
                required_error: "La cantidad es obligatoria",
            })
            .min(1, {
                message: "La cantidad debe ser mayor o igual a 1",
            }),
            unit: z.string({
                required_error: "La unidad es obligatoria",
            }),
        })
    ),


})