import { CancelOrderedService } from "../../../services/ordered/CancelOrderedService";

const orderedsRepositoryMock = {};
const productsRepositoryMock = {};

const queryRunnerMock = {
  connect: jest.fn(),
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  release: jest.fn(),
  manager: {
    findOne: jest.fn(),
    save: jest.fn(),
  },
};


jest.mock("../../../config/DataSource", () => ({
  AppDataSource: {
    createQueryRunner: jest.fn(() => queryRunnerMock),
  },
}));

describe("CancelOrderedService", () => {
  let cancelOrderedService: CancelOrderedService;

  beforeEach(() => {
    cancelOrderedService = new CancelOrderedService(
      orderedsRepositoryMock as any,
      productsRepositoryMock as any
    );
    jest.clearAllMocks();
  });

  // caminho feliz e consistência para estorno de estoque
  it("deve cancelar um pedido e estornar o estoque dos produtos", async () => {
    // Cenario: Pedido com 1 item de qtd 5. Produto tem 10 no estoque.
    const productMock = {
      id: "prod-1",
      stock_quantity: 10, // estoque atual
    };

    const orderedMock = {
      id: "pedido-1",
      user_id: "user-1",
      status: "PAID",
      items: [
        {
          product: productMock,
          quantity: 5,          // quantidade para ser devolvida
        },
      ],
    };

    queryRunnerMock.manager.findOne.mockResolvedValue(orderedMock);

    await cancelOrderedService.execute("pedido-1", "user-1");

    expect(queryRunnerMock.startTransaction).toHaveBeenCalled();
    
    // verifica se o estoque foi somado (10 + 5 = 15)
    const savedProducts = queryRunnerMock.manager.save.mock.calls[0][0];
    expect(savedProducts[0].stock_quantity).toBe(15); 

    // verifica se o status do pedido mudou
    const savedOrder = queryRunnerMock.manager.save.mock.calls[1][0];
    expect(savedOrder.status).toBe("CANCELED");

    expect(queryRunnerMock.commitTransaction).toHaveBeenCalled();
  });

  it("não deve permitir cancelar um pedido que já está cancelado", async () => {
    const orderedMock = {
      id: "pedido-1",
      status: "CANCELED", // cancelado
    };

    queryRunnerMock.manager.findOne.mockResolvedValue(orderedMock);

    await expect(cancelOrderedService.execute("pedido-1", "user-1"))
      .rejects
      .toEqual(new Error("Este pedido já foi cancelado."));

    expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
    expect(queryRunnerMock.manager.save).not.toHaveBeenCalled();
  });

  // cenario de falha
  it("deve retornar erro se o pedido não existir", async () => {
    queryRunnerMock.manager.findOne.mockResolvedValue(null);

    await expect(cancelOrderedService.execute("order-inexistente", "user-1"))
      .rejects
      .toEqual(new Error("Pedido não encontrado."));

    expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
  });
});