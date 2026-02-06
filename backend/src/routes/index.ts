import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { productsRoutes } from "./products.routes";
import { SessionsController } from "../controllers/user/SessionsController";

const router = Router();
const sessionsController = new SessionsController();

router.use("/users", usersRoutes);
router.post("/sessions", sessionsController.handle); // Rota de Login
router.use("/products", productsRoutes);

export { router };