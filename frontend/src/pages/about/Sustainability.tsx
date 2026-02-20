import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import AboutSidebar from "../../components/about/AboutSidebar";

const Sustainability = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
        <PageHeader 
          title="Sustentabilidade" 
          subtitle="Criando moda consciente enquanto protegemos nosso planeta para as futuras gerações"
        />
        
        <ContentSection title="Nosso Compromisso Ambiental">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-xl font-light text-foreground">Fornecimento Ético</h3>
              <p className="text-muted-foreground leading-relaxed">
                Trabalhamos apenas com fornecedores que compartilham nosso compromisso com práticas éticas. Cada tecido e material em nossa coleção é obtido de forma responsável, com total transparência em nossa cadeia de suprimentos.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-light text-foreground">Materiais Sustentáveis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mais de 80% dos nossos tecidos provêm de fontes sustentáveis ou recicladas, reduzindo o impacto ambiental da produção têxtil enquanto mantemos os mais altos padrões de qualidade para nossas roupas.
              </p>
            </div>
          </div>

          <div className="bg-muted/10 rounded-lg p-8">
            <h3 className="text-2xl font-light text-foreground mb-6">Nossas Metas de Impacto</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-light text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Operações neutras em carbono até 2025</p>
              </div>
              <div>
                <div className="text-3xl font-light text-primary mb-2">90%</div>
                <p className="text-sm text-muted-foreground">Embalagens recicladas e recicláveis</p>
              </div>
              <div>
                <div className="text-3xl font-light text-primary mb-2">Zero</div>
                <p className="text-sm text-muted-foreground">Desperdício têxtil em aterros</p>
              </div>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Economia Circular">
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Acreditamos no poder do design circular - criando roupas que podem ser amadas, reparadas e eventualmente recicladas em novas peças.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Cuidado Vitalício</h3>
                <p className="text-muted-foreground">
                  Oferecemos guias de cuidados para prolongar a vida útil de suas peças, além de serviços de reparo para itens selecionados.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Programa de Retorno</h3>
                <p className="text-muted-foreground">
                  Quando você estiver pronto para algo novo, aceitamos suas peças antigas da Fabricio Felizardo Modas para serem recicladas ou doadas.
                </p>
              </div>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Certificações & Parcerias">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Nosso compromisso com a sustentabilidade é verificado através de parcerias com organizações líderes e certificações que nos mantêm responsáveis pelos mais altos padrões.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8 items-center">
              <div className="h-16 w-32 bg-muted/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Algodão Orgânico</span>
              </div>
              <div className="h-16 w-32 bg-muted/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">B Corp</span>
              </div>
              <div className="h-16 w-32 bg-muted/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Fair Trade</span>
              </div>
              <div className="h-16 w-32 bg-muted/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">OEKO-TEX</span>
              </div>
            </div>
          </div>
        </ContentSection>

        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sustainability;