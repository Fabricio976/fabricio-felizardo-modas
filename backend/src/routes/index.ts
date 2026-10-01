import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { productsRoutes } from "./products.routes";
import { SessionsController } from "../controllers/user/SessionsController";
import { orderedsRoutes } from "./ordereds.routes";

const router = Router();
const sessionsController = new SessionsController();

router.post("/sessions", sessionsController.handle); // Rota de Login
router.use("/users", usersRoutes);
router.use("/products", productsRoutes);
router.use("/ordereds", orderedsRoutes);
router.use("/image", orderedsRoutes);

export { router };