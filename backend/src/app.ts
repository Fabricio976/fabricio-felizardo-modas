import "reflect-metadata";
import "express-async-errors"; 
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import { AppError } from "./shared/errors/AppError";
import cors from "cors";
import "./shared"; 

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err); 

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export { app };