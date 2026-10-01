import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import ImageTextBlock from "../../components/about/ImageTextBlock";
import AboutSidebar from "../../components/about/AboutSidebar";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">

          <PageHeader 
            title="Nossa História" 
            subtitle="Uma jornada de paixão, estilo e elegância atemporal"
          />
          
          <ContentSection>
            <ImageTextBlock
              image="/founders.png"
              imageAlt="Fundadores da empresa"
              title="Fundada com Paixão"
              content="A Fabricio Felizardo Modas nasceu de uma visão compartilhada de criar peças de vestuário que transcendem tendências passageiras. Nossos fundadores, unidos pela paixão por cortes impecáveis e tecidos de alta qualidade, estabeleceram a marca com o compromisso de criar roupas que expressam sua personalidade e contam a sua história."
              imagePosition="left"
            />
          </ContentSection>

          <ContentSection title="Nossa Herança">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">Alfaiataria e Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cada peça em nossa coleção é desenhada com atenção meticulosa aos detalhes. Honramos a tradição da alta costura enquanto abraçamos a inovação moderna, garantindo que cada peça atenda aos nossos padrões exigentes de caimento, conforto e durabilidade.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">Futuro Sustentável</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Acreditamos que moda e sustentabilidade podem coexistir lindamente. Nosso compromisso com fornecimento ético de tecidos, processos de tingimento responsáveis e condições justas de trabalho garante que cada peça que você veste contribui para um futuro mais consciente.
                </p>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Nossos Valores">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Excelência</h3>
                <p className="text-muted-foreground">
                  Buscamos a perfeição em cada costura, desde o conceito inicial do design até o acabamento final.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Autenticidade</h3>
                <p className="text-muted-foreground">
                  Cada coleção reflete um estilo genuíno e conta uma história autêntica de expressão pessoal.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Inovação</h3>
                <p className="text-muted-foreground">
                  Evoluímos continuamente nossos designs e tecidos enquanto honramos a elegância atemporal.
                </p>
              </div>
            </div>
          </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default OurStory;
