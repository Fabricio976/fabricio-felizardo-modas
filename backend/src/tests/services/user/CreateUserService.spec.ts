import { CreateUserService } from "../../../services/user/CreateUserService";
import { IUsersRepository } from "../../../repositories/user/IUsersRepository";

const usersRepositoryMock = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
};

describe("CreateUserService", () => {
  let createUserService: CreateUserService;

  beforeEach(() => {
    createUserService = new CreateUserService(usersRepositoryMock as unknown as IUsersRepository);
    jest.clearAllMocks();
  });

  // cenario de caminho feliz
  it("deve criar um novo usuario", async () => {
    // Configura o mock para não encontrar usuário existente
    usersRepositoryMock.findByEmail.mockResolvedValue(null);
    
    const userMock = {
      id: "id-aleatorio",
      name: "Usuario de Teste",
      email: "teste@email.com",
      password_hash: "hash-da-senha",
      birth_date: new Date(),
    };
    usersRepositoryMock.create.mockReturnValue(userMock);
    usersRepositoryMock.save.mockResolvedValue(userMock);

    const result = await createUserService.execute({
      name: "Usuario 1",
      email: "user1@email.com",
      password: "123456",
      birth_date: new Date(),
    });

    expect(result).toHaveProperty("id");
    expect(usersRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.save).toHaveBeenCalledTimes(1);
  });

  it("não deve permitir criar um usuário com email já existente", async () => {
    usersRepositoryMock.findByEmail.mockResolvedValue({
      id: "id-existente",
      name: "User Exists",
      email: "teste@email.com",
    });

    await expect(
      createUserService.execute({
        name: "Teste User",
        email: "teste@email.com",
        password: "123",
        birth_date: new Date(),
      })
    ).rejects.toEqual(new Error("O usuário já existe!")); // aq verifica a mensagem exata

    expect(usersRepositoryMock.create).not.toHaveBeenCalled();
    expect(usersRepositoryMock.save).not.toHaveBeenCalled();
  });
});