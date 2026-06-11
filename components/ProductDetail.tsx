"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { categoryMap } from "@/lib/categories";
import { formatPrice } from "@/lib/utils";
import { useStore } from "./StoreProvider";

const originLabel: Record<string, string> = {
  egypt: "Égypte 🇪🇬",
  turkey: "Turquie 🇹🇷",
  other: "Importé",
};

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const fav = isFavorite(product.id);

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
      {/* Gallery */}
      <div>
        <div className="relative aspect-[4/5] bg-sand-50 overflow-hidden">
          <Image
            src={product.images[active]}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActive(i)}
                className={`relative h-20 w-16 overflow-hidden border ${
                  i === active ? "border-gold-500" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <Link
          href={`/shop?category=${product.category}`}
          className="eyebrow text-xs text-rust hover:text-rust-dark"
        >
          {categoryMap[product.category]?.name}
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl text-walnut-900 mt-3 leading-tight">
          {product.name}
        </h1>
        <p className="mt-4 text-2xl text-walnut-800 font-medium">
          {formatPrice(product.price)}
        </p>

        <div className="mt-3">
          {product.inStock ? (
            <span className="text-sm text-green-700">● En stock</span>
          ) : (
            <span className="text-sm text-rust">● Épuisé</span>
          )}
        </div>

        <p className="mt-6 text-walnut-700/90 leading-relaxed">
          {product.description}
        </p>

        <dl className="mt-8 border-t border-walnut-100 divide-y divide-walnut-100">
          <Row label="Matières" value={product.material} />
          <Row label="Dimensions" value={product.dimensions} />
          <Row label="Origine" value={originLabel[product.origin]} />
        </dl>

        <div className="mt-9 flex flex-wrap gap-4">
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className="bg-rust hover:bg-rust-dark disabled:bg-walnut-200 disabled:cursor-not-allowed text-white px-8 py-3.5 text-sm tracking-wide transition-colors"
          >
            {added ? "✓ Ajouté au panier" : product.inStock ? "Ajouter au panier" : "Indisponible"}
          </button>
          <button
            onClick={() => toggleFavorite(product.id)}
            className="border border-walnut-300 hover:border-rust text-walnut-800 hover:text-rust px-8 py-3.5 text-sm tracking-wide transition-colors flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s-7.5-4.6-10-9.2C.6 9 1.6 5.5 4.8 4.8 7 4.3 8.8 5.4 12 8.4c3.2-3 5-4.1 7.2-3.6 3.2.7 4.2 4.2 2.8 7C19.5 16.4 12 21 12 21z" strokeLinejoin="round" />
            </svg>
            {fav ? "Dans vos favoris" : "Ajouter aux favoris"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 text-sm">
      <dt className="text-walnut-400 eyebrow text-xs">{label}</dt>
      <dd className="text-walnut-800 text-right max-w-[60%]">{value}</dd>
    </div>
  );
}
