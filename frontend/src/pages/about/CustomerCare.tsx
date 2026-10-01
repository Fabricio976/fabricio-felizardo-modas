import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import AboutSidebar from "../../components/about/AboutSidebar";

const CustomerCare = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
        <PageHeader 
          title="Atendimento ao Cliente" 
          subtitle="Estamos aqui para ajudar com todas as suas necessidades de moda"
        />
        
        <ContentSection title="Informações de Contato">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-light text-foreground">Telefone</h3>
              <p className="text-muted-foreground">+55 (11) 3333-4567</p>
              <p className="text-sm text-muted-foreground">Seg-Sex: 9h-18h<br />Sáb: 10h-16h</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-light text-foreground">E-mail</h3>
              <p className="text-muted-foreground">fabricio.felizardo@email.com</p>
              <p className="text-sm text-muted-foreground">Resposta em até 24 horas</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-light text-foreground">Chat Online</h3>
              <Button variant="outline" className="rounded-none">
                Iniciar Chat
              </Button>
              <p className="text-sm text-muted-foreground">Disponível em horário comercial</p>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="Perguntas Frequentes">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="shipping" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Quais são as opções e prazos de entrega?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Oferecemos frete padrão gratuito (3-7 dias úteis) em pedidos acima de R$500. Frete expresso (1-3 dias úteis) está disponível por uma taxa adicional. Todos os pedidos são rastreáveis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Qual é a política de devolução e troca?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Oferecemos uma política de devolução de 30 dias para itens não usados, com etiquetas originais. Peças íntimas e personalizadas não podem ser devolvidas. A primeira troca é gratuita.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="quality" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Qual a garantia de qualidade das roupas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Todas as peças Fabricio Felizardo Modas passam por um rigoroso controle de qualidade. Garantimos a durabilidade e o acabamento de nossos produtos contra defeitos de fabricação por 90 dias.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Como devo cuidar das minhas roupas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Recomendamos seguir sempre as instruções na etiqueta de lavagem de cada peça. De modo geral, lavar com cores semelhantes e evitar secadora prolonga a vida útil dos tecidos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ContentSection>

        <ContentSection title="Formulário de Contato">
          <div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-light text-foreground">Nome</label>
                  <Input className="rounded-none" placeholder="Digite seu nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-light text-foreground">Sobrenome</label>
                  <Input className="rounded-none" placeholder="Digite seu sobrenome" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-light text-foreground">E-mail</label>
                <Input type="email" className="rounded-none" placeholder="Digite seu e-mail" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-light text-foreground">Número do Pedido (Opcional)</label>
                <Input className="rounded-none" placeholder="Digite o número do pedido se aplicável" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-light text-foreground">Como podemos ajudar?</label>
                <Textarea 
                  className="rounded-none min-h-[120px]" 
                  placeholder="Descreva sua solicitação em detalhes"
                />
              </div>
              
              <Button type="submit" className="w-full rounded-none">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerCare;