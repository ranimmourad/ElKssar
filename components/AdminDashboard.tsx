"use client";

import { useEffect, useState } from "react";
import { products as seedProducts } from "@/lib/products";
import { categories as seedCategories } from "@/lib/categories";
import type { Product, Category, CategorySlug, Origin } from "@/types";
import { formatPrice } from "@/lib/utils";

const PKEY = "elkssar_admin_products";
const CKEY = "elkssar_admin_categories";

type Tab = "products" | "categories";

const emptyProduct = (): Product => ({
  id: "",
  name: "",
  category: "meubles-egyptiens",
  origin: "egypt",
  material: "",
  price: 0,
  images: ["/products/gold-side-table.jpg"],
  description: "",
  dimensions: "",
  inStock: true,
  featured: false,
  popularity: 50,
  createdAt: new Date().toISOString().slice(0, 10),
});

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem(PKEY);
      const c = localStorage.getItem(CKEY);
      setProducts(p ? JSON.parse(p) : seedProducts);
      setCategories(c ? JSON.parse(c) : seedCategories);
    } catch {
      setProducts(seedProducts);
      setCategories(seedCategories);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PKEY, JSON.stringify(products));
  }, [products, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(CKEY, JSON.stringify(categories));
  }, [categories, hydrated]);

  const saveProduct = (p: Product) => {
    const id = p.id || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const product = { ...p, id };
    setProducts((prev) => {
      const exists = prev.some((x) => x.id === id);
      return exists ? prev.map((x) => (x.id === id ? product : x)) : [product, ...prev];
    });
    setEditing(null);
  };

  const deleteProduct = (id: string) => {
    if (confirm("Supprimer ce produit ?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const toggleStock = (id: string) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)));

  const toggleFeatured = (id: string) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));

  const updatePrice = (id: string, price: number) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, price } : p)));

  const resetAll = () => {
    if (confirm("Réinitialiser toutes les données aux valeurs d'origine ?")) {
      setProducts(seedProducts);
      setCategories(seedCategories);
    }
  };

  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-warmgray-100">
      {/* Top bar */}
      <header className="bg-walnut-900 text-sand-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl tracking-wide text-gold-200">EL KSSAR — Administration</h1>
            <p className="text-xs text-sand-100/60 mt-0.5">Gestion du catalogue · données locales</p>
          </div>
          <button onClick={resetAll} className="text-xs border border-sand-100/30 px-4 py-2 hover:border-gold-300">
            Réinitialiser
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Stat label="Produits" value={products.length} />
          <Stat label="En stock" value={products.filter((p) => p.inStock).length} />
          <Stat label="En vedette" value={products.filter((p) => p.featured).length} />
          <Stat label="Catégories" value={categories.length} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-walnut-200 mb-6">
          {(["products", "categories"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm ${
                tab === t
                  ? "bg-white text-walnut-900 border border-b-white border-walnut-200 -mb-px"
                  : "text-walnut-500 hover:text-walnut-800"
              }`}
            >
              {t === "products" ? "Produits" : "Catégories"}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <ProductsPanel
            products={products}
            categories={categories}
            onNew={() => setEditing(emptyProduct())}
            onEdit={setEditing}
            onDelete={deleteProduct}
            onToggleStock={toggleStock}
            onToggleFeatured={toggleFeatured}
            onUpdatePrice={updatePrice}
          />
        )}

        {tab === "categories" && (
          <CategoriesPanel categories={categories} setCategories={setCategories} />
        )}
      </div>

      {editing && (
        <ProductEditor
          product={editing}
          categories={categories}
          onSave={saveProduct}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-walnut-100 p-5">
      <p className="text-3xl font-serif text-walnut-900">{value}</p>
      <p className="text-xs text-walnut-400 eyebrow mt-1">{label}</p>
    </div>
  );
}

function ProductsPanel({
  products, categories, onNew, onEdit, onDelete, onToggleStock, onToggleFeatured, onUpdatePrice,
}: {
  products: Product[];
  categories: Category[];
  onNew: () => void;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onToggleStock: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onUpdatePrice: (id: string, price: number) => void;
}) {
  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name || slug;

  return (
    <div className="bg-white border border-walnut-100">
      <div className="flex items-center justify-between p-4 border-b border-walnut-100">
        <h2 className="font-medium text-walnut-800">Produits ({products.length})</h2>
        <button onClick={onNew} className="bg-rust hover:bg-rust-dark text-white px-4 py-2 text-sm">
          + Nouveau produit
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-warmgray-100 text-walnut-500 text-xs eyebrow">
            <tr>
              <th className="text-left px-4 py-3">Produit</th>
              <th className="text-left px-4 py-3">Catégorie</th>
              <th className="text-left px-4 py-3">Prix</th>
              <th className="text-center px-4 py-3">Stock</th>
              <th className="text-center px-4 py-3">Vedette</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-walnut-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-sand-50/50">
                <td className="px-4 py-3 text-walnut-900">{p.name}</td>
                <td className="px-4 py-3 text-walnut-500">{catName(p.category)}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={p.price}
                    onChange={(e) => onUpdatePrice(p.id, Number(e.target.value))}
                    className="w-24 border border-walnut-200 px-2 py-1 text-walnut-800"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onToggleStock(p.id)}
                    className={`px-2.5 py-1 text-xs ${p.inStock ? "bg-green-100 text-green-700" : "bg-rust/10 text-rust"}`}
                  >
                    {p.inStock ? "En stock" : "Épuisé"}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" checked={p.featured} onChange={() => onToggleFeatured(p.id)} className="accent-rust" />
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button onClick={() => onEdit(p)} className="text-rust hover:underline">Modifier</button>
                  <button onClick={() => onDelete(p.id)} className="text-walnut-400 hover:text-rust">Suppr.</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoriesPanel({
  categories, setCategories,
}: {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");

  const add = () => {
    if (!name.trim()) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") as CategorySlug;
    setCategories((prev) => [
      ...prev,
      { slug, name, nameAr, image: "/products/gold-side-table.jpg", description: "" },
    ]);
    setName("");
    setNameAr("");
  };

  const update = (slug: string, field: keyof Category, value: string) =>
    setCategories((prev) => prev.map((c) => (c.slug === slug ? { ...c, [field]: value } : c)));

  const remove = (slug: string) => {
    if (confirm("Supprimer cette catégorie ?")) setCategories((prev) => prev.filter((c) => c.slug !== slug));
  };

  return (
    <div className="bg-white border border-walnut-100">
      <div className="p-4 border-b border-walnut-100 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs text-walnut-400 mb-1">Nom (FR)</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="border border-walnut-200 px-3 py-2 text-sm" placeholder="Nouvelle catégorie" />
        </div>
        <div>
          <label className="block text-xs text-walnut-400 mb-1">Nom (AR)</label>
          <input value={nameAr} onChange={(e) => setNameAr(e.target.value)} className="border border-walnut-200 px-3 py-2 text-sm" placeholder="الاسم" />
        </div>
        <button onClick={add} className="bg-rust hover:bg-rust-dark text-white px-4 py-2 text-sm">+ Ajouter</button>
      </div>
      <ul className="divide-y divide-walnut-50">
        {categories.map((c) => (
          <li key={c.slug} className="p-4 flex flex-wrap items-center gap-3">
            <input value={c.name} onChange={(e) => update(c.slug, "name", e.target.value)} className="border border-walnut-200 px-3 py-1.5 text-sm flex-1 min-w-[160px]" />
            <input value={c.nameAr} onChange={(e) => update(c.slug, "nameAr", e.target.value)} className="border border-walnut-200 px-3 py-1.5 text-sm font-arabic w-32" />
            <span className="text-xs text-walnut-400">{c.slug}</span>
            <button onClick={() => remove(c.slug)} className="text-walnut-400 hover:text-rust text-sm ml-auto">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductEditor({
  product, categories, onSave, onClose,
}: {
  product: Product;
  categories: Category[];
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Product>(product);

  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="fixed inset-0 bg-walnut-900/60 z-50 flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-white w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-walnut-100">
          <h3 className="font-serif text-xl text-walnut-900">
            {product.id ? "Modifier le produit" : "Nouveau produit"}
          </h3>
          <button onClick={onClose} className="text-walnut-400 hover:text-rust text-xl">×</button>
        </div>

        <div className="p-5 space-y-4">
          <L label="Nom"><input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} /></L>

          <div className="grid grid-cols-2 gap-4">
            <L label="Catégorie">
              <select value={form.category} onChange={(e) => set("category", e.target.value as CategorySlug)} className={inputCls}>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </L>
            <L label="Origine">
              <select value={form.origin} onChange={(e) => set("origin", e.target.value as Origin)} className={inputCls}>
                <option value="egypt">Égypte</option>
                <option value="turkey">Turquie</option>
                <option value="other">Autre</option>
              </select>
            </L>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <L label="Prix (TND)"><input type="number" value={form.price} onChange={(e) => set("price", Number(e.target.value))} className={inputCls} /></L>
            <L label="Popularité (0-100)"><input type="number" value={form.popularity} onChange={(e) => set("popularity", Number(e.target.value))} className={inputCls} /></L>
          </div>

          <L label="Matières"><input value={form.material} onChange={(e) => set("material", e.target.value)} className={inputCls} /></L>
          <L label="Dimensions"><input value={form.dimensions} onChange={(e) => set("dimensions", e.target.value)} className={inputCls} /></L>
          <L label="Image (chemin)"><input value={form.images[0]} onChange={(e) => set("images", [e.target.value])} className={inputCls} placeholder="/products/..." /></L>
          <L label="Description"><textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className={`${inputCls} resize-none`} /></L>

          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm text-walnut-700">
              <input type="checkbox" checked={form.inStock} onChange={(e) => set("inStock", e.target.checked)} className="accent-rust" /> En stock
            </label>
            <label className="flex items-center gap-2 text-sm text-walnut-700">
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="accent-rust" /> En vedette (page d'accueil)
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-walnut-100">
          <button onClick={onClose} className="px-5 py-2.5 text-sm text-walnut-600 hover:text-walnut-900">Annuler</button>
          <button onClick={() => onSave(form)} disabled={!form.name.trim()} className="bg-rust hover:bg-rust-dark disabled:bg-walnut-200 text-white px-6 py-2.5 text-sm">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full border border-walnut-200 px-3 py-2 text-sm text-walnut-800 focus:outline-none focus:border-gold-500";

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-walnut-400 eyebrow mb-1.5">{label}</label>
      {children}
    </div>
  );
}
