import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductDescription from "../components/product/ProductDescription";
import ProductCarousel from "../components/content/ProductCarousel";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext"; 
import { toast } from "@/hooks/use-toast"; 
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = getProductById(Number(productId));
  const { addToCart } = useCart();
  
  // Estado para controlar o tamanho selecionado pelo usuário
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-6 px-6">
          <p className="text-muted-foreground">Produto não encontrado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Tamanho obrigatório",
        description: "Por favor, selecione um tamanho antes de adicionar à sacola.",
        variant: "destructive",
      });
      return;
    }

    // O Context espera price como number, mas o objeto product atual tem price como string.
    addToCart({ ...product, price: product.priceNum }, selectedSize);

    toast({
      title: "Adicionado à sacola!",
      description: `${product.name} (Tam: ${selectedSize}) foi adicionado.`,
      className: "bg-green-500 text-white border-none",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-6">
        <section className="w-full px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Galeria de Imagens */}
            <ProductImageGallery product={product} />
            
            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              {/* Informações do Produto e Seleção de Tamanho */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-medium">{product.name}</h1>
                  <p className="text-lg text-muted-foreground mt-2">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.priceNum)}
                  </p>
                </div>

                {/* Seletor de Tamanhos */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Tamanho</h3>
                  <div className="flex gap-2">
                    {product.sizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 border rounded-full flex items-center justify-center text-sm transition-all
                          ${selectedSize === size 
                            ? "bg-black text-white border-black" 
                            : "bg-white text-black border-gray-200 hover:border-black"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botão de Adicionar */}
                <Button 
                  onClick={handleAddToCart} 
                  size="lg" 
                  className="w-full text-base py-6"
                >
                  Adicionar à Sacola
                </Button>
              </div>

              <div className="mt-8">
                <ProductDescription product={product} />
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full mt-16 lg:mt-24">
          <div className="mb-4 px-6">
            <h2 className="text-sm font-light text-foreground">Você também pode gostar</h2>
          </div>
          <ProductCarousel />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;