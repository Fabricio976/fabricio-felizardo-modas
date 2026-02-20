import { ListUserOrderedsService } from "../../../services/ordered/ListUserOrderedsService";

let listUserOrderedsService: ListUserOrderedsService;
let orderedsRepositorySpy: any;

describe("List User Ordereds", () => {
  beforeEach(() => {
    orderedsRepositorySpy = {
      listByUser: jest.fn(),
    };
    listUserOrderedsService = new ListUserOrderedsService(orderedsRepositorySpy);
  });

  it("deve ser possível listar todos os pedidos de um usuário.", async () => {
    const mockOrders = [
      {
        id: "order-1",
        total: 100,
        items: [
          { 
            id: "item-1", 
            name: "Camisa", 
            size: "M", 
            price: 100, 
            quantity: 1 
          }
        ]
      }
    ];

    orderedsRepositorySpy.listByUser.mockResolvedValue(mockOrders);

    const orders = await listUserOrderedsService.execute("user-id");

    expect(orders).toHaveLength(1);
    expect(orders[0].items[0].size).toBe("M");
    expect(orderedsRepositorySpy.listByUser).toHaveBeenCalledWith("user-id");
  });
});