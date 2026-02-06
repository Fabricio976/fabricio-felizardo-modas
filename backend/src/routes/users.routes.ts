import { Router } from "express";
import { UsersController } from "../controllers/user/UsersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { createUserSchema } from "../schemas/user.schema";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";

export const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", 
    ensureDataIsValid(createUserSchema),
    usersController.create
);
usersRoutes.get("/:id", ensureAuthenticated, usersController.show);

