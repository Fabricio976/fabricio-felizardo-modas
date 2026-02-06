import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ProductsController } from "../controllers/product/ProductsController";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ProductImageController } from "../controllers/product/ProductImageController";

const productsRoutes = Router();
const productsController = new ProductsController();
const upload = multer(uploadConfig);
const productImageController = new ProductImageController();

// Create
productsRoutes.post(
  "/",
  ensureAuthenticated,
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
  ensureAuthenticated,
  ensureDataIsValid(updateProductSchema), // Valida apenas o que foi enviado
  productsController.update
);

// delete
productsRoutes.delete("/:id", ensureAuthenticated,productsController.delete);

productsRoutes.patch(
  "/image/:id",
  ensureAuthenticated, 
  upload.single("image"),
  productImageController.update
);

export { productsRoutes };