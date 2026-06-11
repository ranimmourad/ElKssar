export type Origin = "egypt" | "turkey" | "other";

export type CategorySlug =
  | "meubles-egyptiens"
  | "meubles-turcs"
  | "decoration-interieure"
  | "decoration-exterieure"
  | "cristal"
  | "porcelaine";

export interface Category {
  slug: CategorySlug;
  name: string;
  nameAr: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  origin: Origin;
  material: string;
  price: number;
  images: string[];
  description: string;
  dimensions: string;
  inStock: boolean;
  featured: boolean;
  popularity: number;
  createdAt: string; // ISO date — used for "Newest" sort
}

export interface CartItem {
  productId: string;
  quantity: number;
}
