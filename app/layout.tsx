import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Amiri } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EL KSSAR — قصر الأثاث | Meubles & Décoration de Luxe",
  description:
    "EL KSSAR, boutique de meubles et décoration de luxe en Tunisie. Meubles égyptiens et turcs, cristal, porcelaine, mobilier de jardin. Nabeul & Hammamet.",
  keywords: [
    "meubles de luxe",
    "EL KSSAR",
    "قصر الأثاث",
    "meubles égyptiens",
    "meubles turcs",
    "décoration Tunisie",
    "Nabeul",
    "Hammamet",
  ],
  openGraph: {
    title: "EL KSSAR — قصر الأثاث",
    description: "Meubles & Décoration de Luxe — Nabeul & Hammamet, Tunisie",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable} ${amiri.variable}`}>
      <body className="font-sans bg-white text-walnut-900 min-h-screen flex flex-col">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
