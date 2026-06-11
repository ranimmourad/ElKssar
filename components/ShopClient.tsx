"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import type { CategorySlug, Origin } from "@/types";

type SortKey = "newest" | "popular" | "price-asc" | "price-desc";

const materials = Array.from(new Set(products.map((p) => p.material)));

export default function ShopClient() {
  const params = useSearchParams();
  const initialCategory = params.get("category") || "all";

  const [category, setCategory] = useState<string>(initialCategory);
  const [origin, setOrigin] = useState<string>("all");
  const [material, setMaterial] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(13000);
  const [sort, setSort] = useState<SortKey>("popular");

  useEffect(() => {
    setCategory(params.get("category") || "all");
  }, [params]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === (category as CategorySlug));
    if (origin !== "all") list = list.filter((p) => p.origin === (origin as Origin));
    if (material !== "all") list = list.filter((p) => p.material === material);
    list = list.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "newest":
        list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case "popular":
        list.sort((a, b) => b.popularity - a.popularity);
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
    }
    return list;
  }, [category, origin, material, maxPrice, sort]);

  const resetFilters = () => {
    setCategory("all");
    setOrigin("all");
    setMaterial("all");
    setMaxPrice(13000);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20">
      <SectionHeading
        eyebrow="La Boutique"
        title="Notre catalogue"
        subtitle="Filtrez par univers, origine, matière et budget pour trouver la pièce idéale."
      />

      <div className="mt-12 grid lg:grid-cols-[260px_1fr] gap-10">
        {/* Filters */}
        <aside className="space-y-8">
          <FilterGroup title="Catégorie">
            <RadioOption label="Toutes" value="all" name="cat" checked={category === "all"} onChange={() => setCategory("all")} />
            {categories.map((c) => (
              <RadioOption
                key={c.slug}
                label={c.name}
                value={c.slug}
                name="cat"
                checked={category === c.slug}
                onChange={() => setCategory(c.slug)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Origine">
            <RadioOption label="Toutes" value="all" name="origin" checked={origin === "all"} onChange={() => setOrigin("all")} />
            <RadioOption label="Égypte 🇪🇬" value="egypt" name="origin" checked={origin === "egypt"} onChange={() => setOrigin("egypt")} />
            <RadioOption label="Turquie 🇹🇷" value="turkey" name="origin" checked={origin === "turkey"} onChange={() => setOrigin("turkey")} />
            <RadioOption label="Autres" value="other" name="origin" checked={origin === "other"} onChange={() => setOrigin("other")} />
          </FilterGroup>

          <FilterGroup title="Matière">
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full border border-walnut-200 bg-white px-3 py-2 text-sm text-walnut-800 focus:outline-none focus:border-gold-500"
            >
              <option value="all">Toutes les matières</option>
              {materials.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup title={`Prix max — ${maxPrice.toLocaleString("fr")} TND`}>
            <input
              type="range"
              min={500}
              max={13000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-rust"
            />
          </FilterGroup>

          <button
            onClick={resetFilters}
            className="text-sm text-rust border-b border-rust/40 pb-0.5 hover:text-rust-dark"
          >
            Réinitialiser les filtres
          </button>
        </aside>

        {/* Products */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-walnut-100 pb-4 mb-8">
            <p className="text-sm text-walnut-500">
              {filtered.length} produit{filtered.length > 1 ? "s" : ""}
            </p>
            <label className="flex items-center gap-3 text-sm text-walnut-600">
              Trier par
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-walnut-200 bg-white px-3 py-1.5 text-walnut-800 focus:outline-none focus:border-gold-500"
              >
                <option value="popular">Les plus populaires</option>
                <option value="newest">Nouveautés</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <p className="text-walnut-500 py-20 text-center">
              Aucun produit ne correspond à ces critères.
            </p>
          ) : (
            <div className="grid gap-x-5 gap-y-10 grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow text-xs text-walnut-900 mb-4">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function RadioOption({
  label, value, name, checked, onChange,
}: {
  label: string; value: string; name: string; checked: boolean; onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer text-sm text-walnut-700 hover:text-rust">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="accent-rust" />
      {label}
    </label>
  );
}
