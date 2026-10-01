import { z } from "zod";

export const createOrderSchema = z.object({
  products: z.array(
    z.object({
      product_id: z.string().uuid("ID do produto inválido"),
      quantity: z.number().int().positive("A quantidade deve ser positiva"),
    })
  ).min(1, "O pedido deve ter pelo menos um produto!"),
});

export type ICreateOrderedDTO = z.infer<typeof createOrderSchema>;