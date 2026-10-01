import blazerLv from "@/assets/blazer-lv.jpg";
import editorialFashion from "@/assets/editorial-fashion.jpg";
import { Link } from "react-router-dom";

const OneThirdTwoThirdsSection = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Link to="/category/blazers" className="block">
            <div className="w-full h-[500px] lg:h-[800px] mb-3 overflow-hidden">
              <img 
                src={blazerLv} 
                alt="Blazer de luxo" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="">
            <h3 className="text-sm font-normal text-foreground mb-1">
              Alfaiataria
            </h3>
            <p className="text-sm font-light text-foreground">
              Cortes precisos e materiais nobres para o homem moderno
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Link to="/category/shop" className="block">
            <div className="w-full h-[500px] lg:h-[800px] mb-3 overflow-hidden">
              <img 
                src={editorialFashion} 
                alt="Editorial de moda de luxo" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="">
            <h3 className="text-sm font-normal text-foreground mb-1">
              Editorial
            </h3>
            <p className="text-sm font-light text-foreground">
              O encontro entre sofisticação masculina e elegância feminina
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneThirdTwoThirdsSection;
