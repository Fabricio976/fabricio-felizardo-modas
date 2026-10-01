const Footer = () => {
  return (
    <footer className="w-full bg-white text-black pt-8 pb-2 px-6 border-t border-[#e5e5e5] mt-48">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* Brand - Left side */}
          <div>
            <h2 className="text-2xl font-light tracking-widest mb-4">FMODAS</h2>
            <p className="text-sm font-light text-black/70 leading-relaxed max-w-md mb-6">
              Moda de luxo masculina e feminina — curadoria das maiores maisons do mundo
            </p>
            
            {/* Contact Information */}
            <div className="space-y-2 text-sm font-light text-black/70">
              <div>
                <p className="font-normal text-black mb-1">Visite-nos</p>
                <p>Rua do Pagode, 123</p>
                <p>Baia da Traição, PB 01426-001</p>
              </div>
              <div>
                <p className="font-normal text-black mb-1 mt-3">Contato</p>
                <p>+55 (11) 3456-7890</p>
                <p>fabricio@fmodas.com.br</p>
              </div>
            </div>
          </div>

          {/* Link lists - Right side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shop */}
            <div>
              <h4 className="text-sm font-normal mb-4">Loja</h4>
              <ul className="space-y-2">
                <li><a href="/category/new-in" className="text-sm font-light text-black/70 hover:text-black transition-colors">Novidades</a></li>
                <li><a href="/category/masculino" className="text-sm font-light text-black/70 hover:text-black transition-colors">Masculino</a></li>
                <li><a href="/category/feminino" className="text-sm font-light text-black/70 hover:text-black transition-colors">Feminino</a></li>
                <li><a href="/category/blazers" className="text-sm font-light text-black/70 hover:text-black transition-colors">Blazers</a></li>
                <li><a href="/category/vestidos" className="text-sm font-light text-black/70 hover:text-black transition-colors">Vestidos</a></li>
              </ul>
            </div>

            {/* Brands */}
            <div>
              <h4 className="text-sm font-normal mb-4">Marcas</h4>
              <ul className="space-y-2">
                <li><a href="/category/shop" className="text-sm font-light text-black/70 hover:text-black transition-colors">Louis Vuitton</a></li>
                <li><a href="/category/shop" className="text-sm font-light text-black/70 hover:text-black transition-colors">Chanel</a></li>
                <li><a href="/category/shop" className="text-sm font-light text-black/70 hover:text-black transition-colors">Gucci</a></li>
                <li><a href="/category/shop" className="text-sm font-light text-black/70 hover:text-black transition-colors">Hermès</a></li>
                <li><a href="/category/shop" className="text-sm font-light text-black/70 hover:text-black transition-colors">Prada</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-normal mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li><a href="/about/size-guide" className="text-sm font-light text-black/70 hover:text-black transition-colors">Guia de Tamanhos</a></li>
                <li><a href="/about/customer-care" className="text-sm font-light text-black/70 hover:text-black transition-colors">Trocas e Devoluções</a></li>
                <li><a href="/about/our-story" className="text-sm font-light text-black/70 hover:text-black transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#e5e5e5] -mx-6 px-6 pt-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-light text-black mb-1 md:mb-0">
            © 2024 FModas. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Política de Privacidade
            </a>
            <a href="/terms-of-service" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
