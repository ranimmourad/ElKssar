"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="/brand/hero.jpg"
        alt="Showroom de meubles de luxe EL KSSAR"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Warm gradient for legibility — no blur, no glass */}
      <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/80 via-walnut-900/30 to-walnut-900/40" />

      <div className="relative h-full max-w-7xl mx-auto px-5 lg:px-8 flex items-end pb-20 md:items-center md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="eyebrow text-xs md:text-sm text-gold-200 mb-5">
            Meubles & Décoration de Luxe
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05]">
            L'art de vivre,
            <br />
            <span className="text-gold-200">à la mesure des palais.</span>
          </h1>
          <p className="mt-6 text-sand-100/90 text-base md:text-lg leading-relaxed max-w-md">
            Une collection d'exception entre élégance égyptienne et raffinement
            turc. Pièces sculptées, dorées et tapissées à la main.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3.5 text-sm tracking-wide transition-colors"
            >
              Découvrir la collection
            </Link>
            <Link
              href="/contact"
              className="border border-sand-100/60 text-sand-100 hover:bg-sand-100/10 px-8 py-3.5 text-sm tracking-wide transition-colors"
            >
              Visiter nos showrooms
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
