import { ListUserOrderedsService } from "../../../services/ordered/ListUserOrderedsService";
import { IOrderedsRepository } from "../../../repositories/ordered/IOrderedsRepository";

const orderedsRepositoryMock = {
  create: jest.fn(),
  findByUserId: jest.fn(),
};

describe("ListUserOrderedsService", () => {
  let listUserOrderedsService: ListUserOrderedsService;

  beforeEach(() => {
    listUserOrderedsService = new ListUserOrderedsService(
      orderedsRepositoryMock as unknown as IOrderedsRepository
    );
    jest.clearAllMocks();
  });

  it("deve listar os pedidos de um usuário específico", async () => {
    const userId = "user-123";
    const userOrders = [
      { id: "order-1", total: 100, user_id: userId },
      { id: "order-2", total: 50, user_id: userId },
    ];

    orderedsRepositoryMock.findByUserId.mockResolvedValue(userOrders);

    const result = await listUserOrderedsService.execute(userId);

    expect(result).toEqual(userOrders);
    expect(orderedsRepositoryMock.findByUserId).toHaveBeenCalledWith(userId);
    expect(orderedsRepositoryMock.findByUserId).toHaveBeenCalledTimes(1);
  });

  it("deve retornar uma lista vazia se o usuário não tiver pedidos", async () => {
    orderedsRepositoryMock.findByUserId.mockResolvedValue([]);

    const result = await listUserOrderedsService.execute("user-sem-pedidos");

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});