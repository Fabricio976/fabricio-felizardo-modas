import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  brand: z.string().min(2, "A marca é obrigatória"),
  category: z.string().min(1, "A categoria é obrigatória"),
  gender: z.enum(["Masculino", "Feminino", "Unissex"]).catch("Masculino"),
  price: z.number().positive("O preço deve ser positivo"),
  image: z.string().optional(),
  hoverImage: z.string().optional(),
  
  sizes: z.array(z.string()).min(1, "Selecione pelo menos um tamanho"),
  
  stock: z.number().int().nonnegative(),
  description: z.string().min(10, "A descrição deve ser mais detalhada"),
  material: z.string().min(2, "Informe o material do produto"),
  isNew: z.boolean().optional(),
});

export type ICreateProductDTO = z.infer<typeof createProductSchema>;
export type IUpdateProductDTO = z.infer<typeof updateProductSchema>;

export const updateProductSchema = createProductSchema.partial();