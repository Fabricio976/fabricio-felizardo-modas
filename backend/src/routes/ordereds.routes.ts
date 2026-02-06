import { Router } from "express";
import { OrderedsController } from "../controllers/ordered/OrderedsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const orderedsRoutes = Router();
const ordersController = new OrderedsController();

orderedsRoutes.post(
  "/",
  ensureAuthenticated,
  ordersController.create
);

orderedsRoutes.get("/me", ensureAuthenticated, ordersController.showByUser);

orderedsRoutes.patch(
  "/:id/cancel",
  ensureAuthenticated,
  ordersController.cancel
);

export { orderedsRoutes };