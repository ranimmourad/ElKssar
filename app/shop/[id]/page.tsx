import { notFound } from "next/navigation";
import Link from "next/link";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { products, getProductById } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Produit introuvable — EL KSSAR" };
  return {
    title: `${product.name} — EL KSSAR`,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 md:py-16">
      <nav className="text-sm text-walnut-400 mb-8">
        <Link href="/" className="hover:text-rust">Accueil</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-rust">Boutique</Link>
        <span className="mx-2">/</span>
        <span className="text-walnut-700">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mt-24">
          <SectionHeading eyebrow="Vous aimerez aussi" title="Dans le même esprit" />
          <div className="mt-10 grid gap-x-5 gap-y-10 grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
