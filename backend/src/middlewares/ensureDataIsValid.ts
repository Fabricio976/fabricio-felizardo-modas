import { Request, Response, NextFunction } from "express";
import { ZodSchema, z } from "zod";

export const ensureDataIsValid =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = z.treeifyError(result.error);

      return res.status(400).json({
        message: "Erro de validação",
        errors,
      });
    }

    req.body = result.data;
    return next();
  };
