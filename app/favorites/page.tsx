"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { useStore } from "@/components/StoreProvider";
import { products } from "@/lib/products";

export default function FavoritesPage() {
  const { favorites } = useStore();
  const items = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20">
      <SectionHeading eyebrow="Votre Sélection" title="Mes favoris" />

      {items.length === 0 ? (
        <div className="mt-16 text-center py-16 border border-walnut-100">
          <p className="text-walnut-500 mb-6">
            Vous n'avez pas encore de pièce favorite.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-rust hover:bg-rust-dark text-white px-8 py-3.5 text-sm tracking-wide transition-colors"
          >
            Parcourir la boutique
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-x-5 gap-y-10 grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
