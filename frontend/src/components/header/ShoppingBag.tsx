import { X, Minus, Plus, ShoppingBag as BagIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface ShoppingBagProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingBag = ({ isOpen, onClose }: ShoppingBagProps) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (!user) {
      onClose();
      navigate("/session"); // Redireciona para a página de login
      toast({ title: "Login necessário", description: "Faça login para finalizar a compra." });
      return;
    }

    setIsLoading(true);

    try {
      
      const payload = {
        items: cartItems.map(item => ({
          productId: item.id, 
          quantity: item.quantity,
          size: item.selectedSize
        }))
      };

      await api.post("/ordereds", payload);

      toast({
        title: "Sucesso!",
        description: "Pedido realizado com sucesso.",
        className: "bg-green-500 text-white",
      });

      clearCart(); 
      onClose();   

    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Erro ao processar pedido.";
      

      toast({
        title: "Erro no pedido",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 h-screen">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 h-screen"
        onClick={onClose}
      />
      
      {/* Off-canvas panel */}
      <div className="absolute right-0 top-0 h-screen w-full max-w-md bg-background border-l border-border animate-slide-in-right flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <BagIcon size={20} />
            <h2 className="text-lg font-light text-foreground">Sacola ({cartItems.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-foreground hover:text-muted-foreground transition-colors rounded-full hover:bg-gray-100"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <BagIcon size={48} className="text-gray-300" />
              <p className="text-muted-foreground text-sm text-center">
                Sua sacola está vazia.<br />
                Navegue pelas categorias para encontrar produtos.
              </p>
              <Button variant="outline" onClick={onClose}>
                Começar a comprar
              </Button>
            </div>
          ) : (
            <>
              {/* Cart items list */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex gap-4 group">
                    <div className="w-24 h-28 bg-muted/10 rounded-md overflow-hidden flex-shrink-0 relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-foreground line-clamp-2">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Tamanho: {item.selectedSize}</p>
                        <p className="text-xs text-muted-foreground">Ref: {item.category}</p>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center border border-border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        
                        <p className="text-sm font-medium">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer Actions */}
              <div className="border-t border-border pt-6 mt-4 space-y-4 bg-background z-10">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}</span>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Button 
                    className="w-full rounded-md py-6" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      "Finalizar Pedido Agora"
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full rounded-md" 
                    onClick={onClose}
                  >
                    Continuar Comprando
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;