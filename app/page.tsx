import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";
import { stores, openingHours } from "@/lib/stores";

export default function HomePage() {
  const bestSellers = products
    .filter((p) => p.featured)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  return (
    <>
      <Hero />

      {/* Featured categories */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20 md:py-28">
        <SectionHeading
          eyebrow="Nos Univers"
          title="Explorez nos collections"
          subtitle="Du mobilier d'apparat aux objets précieux, chaque pièce est choisie pour son authenticité et sa finition."
          center
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative overflow-hidden aspect-[3/4] block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/85 via-walnut-900/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-arabic text-gold-200/90 text-sm mb-1">{cat.nameAr}</p>
                <h3 className="font-serif text-2xl text-white">{cat.name}</h3>
                <span className="mt-2 inline-block text-sand-100/80 text-xs eyebrow opacity-0 group-hover:opacity-100 transition-opacity">
                  Découvrir →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Les Incontournables"
              title="Pièces d'exception"
            />
            <Link
              href="/shop"
              className="text-sm text-rust hover:text-rust-dark border-b border-rust/40 pb-0.5 transition-colors"
            >
              Voir toute la boutique →
            </Link>
          </div>

          <div className="mt-12 grid gap-x-5 gap-y-10 grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Store locations */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20 md:py-28">
        <SectionHeading
          eyebrow="Nous Rencontrer"
          title="Nos showrooms"
          subtitle="Venez découvrir nos collections en personne, dans un cadre à la hauteur de nos pièces."
          center
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stores.map((s) => (
            <div
              key={s.address}
              className="border border-gold-200/60 p-8 text-center bg-white"
            >
              <div className="h-px w-10 bg-gold-400 mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-walnut-900">{s.city}</h3>
              <p className="mt-2 text-walnut-400 text-sm eyebrow">{s.label}</p>
              <p className="mt-4 text-walnut-700/90 leading-relaxed">{s.address}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-walnut-700/80">{openingHours}</p>
      </section>
    </>
  );
}
