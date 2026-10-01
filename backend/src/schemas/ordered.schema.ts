import { z } from "zod";

export const createOrderedSchema = z.object({
  items: z.array(
    z.object({
      productId: z.uuid("ID do produto inválido"),
      quantity: z.number().int().positive("A quantidade deve ser positiva"),
      size: z.string().min(1, "O tamanho é obrigatório"), // Validação do tamanho
    })
  ).min(1, "O pedido deve ter pelo menos um item"),
});

export type ICreateOrderedDTO = z.infer<typeof createOrderedSchema>;