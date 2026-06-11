import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "meubles-egyptiens",
    name: "Meubles Égyptiens",
    nameAr: "أثاث مصري",
    image: "/products/gold-dining-set.jpg",
    description:
      "L'élégance intemporelle de l'artisanat égyptien, mêlant dorures à la feuille et boiseries sculptées à la main.",
  },
  {
    slug: "meubles-turcs",
    name: "Meubles Turcs",
    nameAr: "أثاث تركي",
    image: "/products/burgundy-gold-settee.jpg",
    description:
      "Le raffinement du luxe turc, velours profonds et finitions ornementales pour un intérieur royal.",
  },
  {
    slug: "decoration-interieure",
    name: "Décoration Intérieure",
    nameAr: "ديكور داخلي",
    image: "/products/marquetry-console-desk.jpg",
    description:
      "Consoles, vitrines et pièces d'exception pour sublimer chaque espace de vie.",
  },
  {
    slug: "decoration-exterieure",
    name: "Décoration Extérieure",
    nameAr: "ديكور خارجي",
    image: "/products/rattan-swing-balcony.jpg",
    description:
      "Mobilier de jardin et balançoires en rotin pour des extérieurs accueillants et raffinés.",
  },
  {
    slug: "cristal",
    name: "Cristal",
    nameAr: "كريستال",
    image: "/products/crystal-collection.jpg",
    description:
      "Cristallerie taillée à la main, coupes et vases qui captent et reflètent la lumière.",
  },
  {
    slug: "porcelaine",
    name: "Porcelaine",
    nameAr: "خزف",
    image: "/products/porcelain-collection.jpg",
    description:
      "Porcelaine peinte à la main, rehaussée d'or, pour une touche d'art classique.",
  },
];

export const categoryMap: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c])
);
