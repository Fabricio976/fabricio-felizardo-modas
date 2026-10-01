import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "../types/product"; // Certifique-se que o caminho está correto

// Interface estendida para o item do carrinho (produto + quantidade + tamanho)
export interface CartItem extends Product {
  cartId: string; // ID único para diferenciar (Ex: Camisa M vs Camisa G)
  quantity: number;
  selectedSize: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // 1. Ao iniciar, tenta pegar do localStorage para persistir dados
    const storedCart = localStorage.getItem("@felizardo:cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // 2. Sempre que o carrinho mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem("@felizardo:cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      // Verifica se já existe esse produto COM ESSE TAMANHO
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingItem) {
        // Se existe, só aumenta a quantidade
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Se não existe, cria um novo item no carrinho
      return [
        ...prev,
        {
          ...product,
          cartId: `${product.id}-${size}-${Date.now()}`, // ID único gerado
          quantity: 1,
          selectedSize: size,
        },
      ];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Cálculos automáticos
  const cartTotal = cartItems.reduce((acc, item) => {
    // Tratamento para garantir que price seja número
    const priceNum = typeof item.price === 'string' 
      ? parseFloat(item.price) // Se for string "100.00"
      : item.price;
      
    return acc + (priceNum * item.quantity);
  }, 0);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        cartTotal, 
        cartCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};