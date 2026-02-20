import { CreateOrderedService } from "../../../services/ordered/CreateOrderedService";
import { AppError } from "../../../shared/errors/AppError";

let createOrderedService: CreateOrderedService;
let orderedsRepositorySpy: any;
let productsRepositorySpy: any;

describe("Create Ordered", () => {
  beforeEach(() => {
    orderedsRepositorySpy = {
      create: jest.fn(),
    };
    productsRepositorySpy = {
      findById: jest.fn(),
      save: jest.fn(),
    };
    createOrderedService = new CreateOrderedService(
      orderedsRepositorySpy,
      productsRepositorySpy
    );
  });

  it("deve ser possível criar um novo pedido", async () => {
    // Produto tem P e M
    const productMock = {
      id: "prod-1",
      name: "Vestido",
      price: 1000,
      stock: 5,
      sizes: ["P", "M"],
      image: "img.jpg"
    };

    productsRepositorySpy.findById.mockResolvedValue(productMock);
    
    orderedsRepositorySpy.create.mockResolvedValue({
      id: "order-1",
      user_id: "user-1",
      total: 2000,
      status: "pending",
      items: [
        { product_id: "prod-1", quantity: 2, size: "M", price: 1000 }
      ]
    });

    const order = await createOrderedService.execute({
      items: [
        { 
          productId: "prod-1", 
          quantity: 2, 
          size: "M" 
        }
      ]
    }, "user-1");

    expect(order).toHaveProperty("id");
    expect(productsRepositorySpy.save).toHaveBeenCalled(); // Deve salvar para baixar estoque
    expect(productMock.stock).toBe(3); 
  });

  it("não deveria ser possível criar um pedido se o tamanho do produto não estiver disponível", async () => {
    const productMock = {
      id: "prod-1",
      name: "Vestido",
      stock: 5,
      sizes: ["P"] // Só tem P
    };

    productsRepositorySpy.findById.mockResolvedValue(productMock);

    await expect(
      createOrderedService.execute({
        items: [{ productId: "prod-1", quantity: 1, size: "GG" }] // Tentando GG
      }, "user-1")
    ).rejects.toEqual(
      expect.objectContaining({
        message: expect.stringContaining("tamanho 'GG' não está disponível"),
        statusCode: 400 
      })
    );
  });

  it("não deveria ser possível criar um pedido com estoque insuficiente", async () => {
    const productMock = {
      id: "prod-1",
      name: "Vestido",
      stock: 1,
      sizes: ["P"]
    };

    productsRepositorySpy.findById.mockResolvedValue(productMock);

    await expect(
      createOrderedService.execute({
        items: [{ productId: "prod-1", quantity: 5, size: "P" }]
      }, "user-1")
    ).rejects.toBeInstanceOf(AppError);
  });
});