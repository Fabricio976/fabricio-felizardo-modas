import heroFashion from "@/assets/hero-fashion.jpg";

const LargeHero = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="w-full aspect-[16/9] mb-3 overflow-hidden">
        <img 
          src={heroFashion} 
          alt="Coleção de moda de luxo" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="">
        <h2 className="text-sm font-normal text-foreground mb-1">
          Alta Costura
        </h2>
        <p className="text-sm font-light text-foreground">
          As maiores maisons do mundo reunidas em um só lugar
        </p>
      </div>
    </section>
  );
};

export default LargeHero;
