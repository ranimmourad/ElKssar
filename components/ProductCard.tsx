"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { categoryMap } from "@/lib/categories";
import { formatPrice } from "@/lib/utils";
import { useStore } from "./StoreProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useStore();
  const fav = isFavorite(product.id);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-sand-50 aspect-[4/5]">
        <Link href={`/shop/${product.id}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-walnut-900/85 text-sand-100 text-[11px] tracking-wide px-2.5 py-1">
            Épuisé
          </span>
        )}

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="absolute top-3 right-3 h-9 w-9 bg-white/90 flex items-center justify-center text-rust hover:bg-white transition-colors"
        >
          <svg
            width="18" height="18" viewBox="0 0 24 24"
            fill={fav ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="1.6"
          >
            <path d="M12 21s-7.5-4.6-10-9.2C.6 9 1.6 5.5 4.8 4.8 7 4.3 8.8 5.4 12 8.4c3.2-3 5-4.1 7.2-3.6 3.2.7 4.2 4.2 2.8 7C19.5 16.4 12 21 12 21z" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="pt-4">
        <p className="eyebrow text-[10px] text-walnut-400 mb-1.5">
          {categoryMap[product.category]?.name}
        </p>
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-serif text-lg text-walnut-900 leading-snug group-hover:text-rust transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-walnut-700 font-medium">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
