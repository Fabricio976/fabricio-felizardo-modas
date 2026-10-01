import { Router } from "express";
import { ProductsController } from "../controllers/product/ProductsController";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema";

const productsRoutes = Router();
const productsController = new ProductsController();

// Create
productsRoutes.post(
  "/",
  ensureDataIsValid(createProductSchema),
  productsController.create
);

// list All
productsRoutes.get("/", productsController.listAll);

// get by ud
productsRoutes.get("/:id", productsController.show);

// path
productsRoutes.put(
  "/:id",
  ensureDataIsValid(updateProductSchema), // Valida apenas o que foi enviado
  productsController.update
);

// delete
productsRoutes.delete("/:id", productsController.delete);

export { productsRoutes };