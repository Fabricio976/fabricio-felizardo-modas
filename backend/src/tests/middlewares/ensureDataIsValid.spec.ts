import { ensureDataIsValid } from "../../middlewares/ensureDataIsValid";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

describe("ensureDataIsValid Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(), // permite encadear .status().json()
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it("deve chamar next() se os dados forem válidos", () => {
    // cria um schema simples só para testar o middleware
    const testSchema = z.object({
      name: z.string(),
    });

    mockRequest.body = { name: "Teste" };

    const middleware = ensureDataIsValid(testSchema);
    middleware(
      mockRequest as Request, 
      mockResponse as Response, 
      nextFunction
    );

    // Espera que o next() seja chamado e nenhum erro seja retornado
    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it("deve retornar status 400 e erros se os dados forem inválidos", () => {
    const testSchema = z.object({
      email: z.email({ message: "Email inválido" }),
    });

    mockRequest.body = { email: "email-invalido" };

    const middleware = ensureDataIsValid(testSchema);
    middleware(
      mockRequest as Request, 
      mockResponse as Response, 
      nextFunction
    );

    // Espera que o next() não seja chamado
    expect(nextFunction).not.toHaveBeenCalled();
    // Espera status 400
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    // Espera que o json contenha a mensagem de erro
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Erro de validação",
      })
    );
  });
});