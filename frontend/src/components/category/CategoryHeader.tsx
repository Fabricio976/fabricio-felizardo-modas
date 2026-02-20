import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CategoryHeaderProps {
  category: string;
}

const categoryTranslations: Record<string, string> = {
  'shop': 'Loja',
  'masculino': 'Masculino',
  'feminino': 'Feminino',
  'blazers': 'Blazers',
  'jaquetas': 'Jaquetas',
  'vestidos': 'Vestidos',
  'camisas': 'Camisas',
  'calças': 'Calças',
  'casacos': 'Casacos',
  'saias': 'Saias',
  'polos': 'Polos',
  'blusas': 'Blusas',
  'new-in': 'Novidades',
};

const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  const translatedCategory = categoryTranslations[category.toLowerCase()] || category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <section className="w-full px-6 mb-8">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Início</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{translatedCategory}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-foreground">
            {translatedCategory}
          </h1>
        </div>
    </section>
  );
};

export default CategoryHeader;
