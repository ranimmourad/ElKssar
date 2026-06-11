import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";

export const metadata = {
  title: "Articles — EL KSSAR",
  description: "Catalogue complet de tous nos articles : meubles, décoration, cristal et porcelaine.",
};

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20">
      <SectionHeading
        eyebrow="Le Catalogue"
        title="Tous nos articles"
        subtitle="L'intégralité de nos pièces, classées par univers."
      />

      <div className="mt-16 space-y-20">
        {categories.map((cat) => {
          const items = products.filter((p) => p.category === cat.slug);
          if (items.length === 0) return null;
          return (
            <section key={cat.slug} id={cat.slug}>
              <div className="flex items-baseline justify-between border-b border-walnut-100 pb-3 mb-8">
                <h2 className="font-serif text-2xl text-walnut-900">
                  {cat.name}
                  <span className="font-arabic text-gold-500 text-base ml-3">{cat.nameAr}</span>
                </h2>
                <span className="text-sm text-walnut-400">{items.length} article{items.length > 1 ? "s" : ""}</span>
              </div>
              <div className="grid gap-x-5 gap-y-10 grid-cols-2 lg:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
