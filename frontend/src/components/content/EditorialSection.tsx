import editorialFashion from "@/assets/editorial-fashion.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EditorialSection = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 max-w-[630px]">
          <h2 className="text-2xl font-normal text-foreground leading-tight md:text-xl">
            Moda que Transcende Tendências
          </h2>
          <p className="text-sm font-light text-foreground leading-relaxed">
            A FModas nasceu da paixão por reunir as maiores maisons de moda do mundo em uma experiência de compra única. 
            Curadoria exclusiva de peças Louis Vuitton, Chanel, Gucci, Hermès e Prada para homens e mulheres que valorizam 
            qualidade, design e atemporalidade.
          </p>
          <Link to="/about/our-story" className="inline-flex items-center gap-1 text-sm font-light text-foreground hover:text-foreground/80 transition-colors duration-200">
            <span>Conheça a FModas</span>
            <ArrowRight size={12} />
          </Link>
        </div>
        
        <div className="order-first md:order-last">
          <div className="w-full aspect-square overflow-hidden">
            <img src={editorialFashion} alt="Editorial FModas - moda de luxo masculina e feminina" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
