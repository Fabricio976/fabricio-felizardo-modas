import menswearCollection from "@/assets/menswear-collection.jpg";
import womenswearCollection from "@/assets/womenswear-collection.jpg";
import { Link } from "react-router-dom";

const FiftyFiftySection = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Link to="/category/masculino" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden">
              <img 
                src={menswearCollection} 
                alt="Coleção Masculina" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="">
            <h3 className="text-sm font-normal text-foreground mb-1">
              Coleção Masculina
            </h3>
            <p className="text-sm font-light text-foreground">
              Alfaiataria impecável e peças contemporâneas das maiores maisons
            </p>
          </div>
        </div>

        <div>
          <Link to="/category/feminino" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden">
              <img 
                src={womenswearCollection} 
                alt="Coleção Feminina" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="">
            <h3 className="text-sm font-normal text-foreground mb-1">
              Coleção Feminina
            </h3>
            <p className="text-sm font-light text-foreground">
              Elegância atemporal em vestidos, saias e peças de alta costura
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFiftySection;
