import { z } from "zod";

export const createProductSchema = z.object({
  brand: z
    .string()
    .min(2, { message: "A marca deve ter pelo menos 2 caracteres" }),

  description: z
    .string()
    .min(3, { message: "A descrição deve ter detalhes do produto" }),

  price: z
    .number()
    .positive({ message: "O preço deve ser positivo" }),

  category: z
    .string()
    .min(1, { message: "A categoria é obrigatória" }),

  size: z
    .string()
    .min(1, { message: "O tamanho é obrigatório" }),

  color: z
    .string()
    .min(1, { message: "A cor é obrigatória" }),

  stock_quantity: z
    .number()
    .int({ message: "A quantidade deve ser um número inteiro" })
    .nonnegative({ message: "A quantidade não pode ser negativa" }),

  image_url: z
    .string()
    .url({ message: "URL da imagem inválida" })
    .optional(),
});

export type ICreateProductDTO = z.infer<typeof createProductSchema>;
export type IUpdateProductDTO = z.infer<typeof updateProductSchema>;

export const updateProductSchema = createProductSchema.partial();
