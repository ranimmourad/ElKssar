import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export const metadata = {
  title: "Boutique — EL KSSAR",
  description: "Catalogue complet de meubles et décoration de luxe : meubles égyptiens, turcs, cristal, porcelaine et mobilier de jardin.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-5 py-24 text-walnut-500">Chargement…</div>}>
      <ShopClient />
    </Suspense>
  );
}
