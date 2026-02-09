import { createUserSchema } from "../../schemas/user.schema";

describe("Validação de Schema de Usuário", () => {
  
  it("deve validar com sucesso um usuário correto", () => {
    const validData = {
      name: "Usuario 1",
      email: "usuario1@exemplo.com",
      password: "123456", // a senha tem que ter mais de 6 caracteres
      birth_date: "2000-01-01",
    };

    const result = createUserSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("deve falhar se o e-mail for inválido", () => {
    const invalidData = {
      name: "Usuario 2",
      email: "eusuario1exemplo.comm", // não tem @
      password: "123456",
      birth_date: "2000-01-01",
    };

    const result = createUserSchema.safeParse(invalidData);
    
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.error.issues[0].message).toBe("Formato de email inválido"); // verifica se a mensagem de erro específica
    }
  });

  it("deve falhar se a senha tiver menos de 6 caracteres", () => {
    const invalidData = {
      name: "Usuario 3",
      email: "usuario3@teste.com",
      password: "123", // menos de 6 caracteres
      birth_date: "2000-01-01",
    };

    const result = createUserSchema.safeParse(invalidData);
    
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.error.issues[0].message).toBe("A senha deve ter no mínimo 6 caracteres");
    }
  });

  it("deve falhar se a data de nascimento for inválida", () => {
    const invalidData = {
        name: "Usuairo 4",
        email: "usuairo4@teste.com",
        password: "123456",
        birth_date: "data-invalida", // string que não vira data
      };
  
      const result = createUserSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
  });
});