import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token ausente!");
  }

  // Formato: "Bearer"
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as IPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error("Token inválido!");
  }
}