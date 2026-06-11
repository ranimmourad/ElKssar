import Link from "next/link";
import Image from "next/image";
import { stores, openingHours } from "@/lib/stores";

export default function FooterContent() {
  return (
    <footer className="bg-walnut-900 text-sand-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/brand/logo.png"
              alt="EL KSSAR"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <div className="leading-none">
              <p className="font-serif text-xl tracking-[0.16em] text-gold-200">EL KSSAR</p>
              <p className="font-arabic text-gold-300 text-sm mt-1">قصر الأثاث</p>
            </div>
          </div>
          <p className="text-sand-100/70 text-sm leading-relaxed">
            Meubles et décoration de luxe. Élégance égyptienne et raffinement turc, au cœur de la Tunisie.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="eyebrow text-xs text-gold-300 mb-5">Navigation</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="text-sand-100/80 hover:text-gold-200 transition-colors">Accueil</Link></li>
            <li><Link href="/shop" className="text-sand-100/80 hover:text-gold-200 transition-colors">Boutique</Link></li>
            <li><Link href="/articles" className="text-sand-100/80 hover:text-gold-200 transition-colors">Articles</Link></li>
            <li><Link href="/favorites" className="text-sand-100/80 hover:text-gold-200 transition-colors">Favoris</Link></li>
            <li><Link href="/contact" className="text-sand-100/80 hover:text-gold-200 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h3 className="eyebrow text-xs text-gold-300 mb-5">Nos Showrooms</h3>
          <ul className="space-y-3 text-sm text-sand-100/80">
            {stores.map((s) => (
              <li key={s.address}>
                <span className="text-gold-200">{s.city}</span>
                <br />
                {s.address}
              </li>
            ))}
          </ul>
        </div>

        {/* Social / hours */}
        <div>
          <h3 className="eyebrow text-xs text-gold-300 mb-5">Suivez-nous</h3>
          <div className="flex gap-4 mb-6">
            <SocialDot label="Facebook" />
            <SocialDot label="Instagram" />
            <SocialDot label="TikTok" />
          </div>
          <p className="text-sand-100/70 text-sm">{openingHours}</p>
        </div>
      </div>

      <div className="border-t border-sand-100/15">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sand-100/55">
          <p>© {new Date().getFullYear()} EL KSSAR — قصر الأثاث. Tous droits réservés.</p>
          <p>Avenue 2 Mars 1934, Nabeul 8000</p>
        </div>
      </div>
    </footer>
  );
}

function SocialDot({ label }: { label: string }) {
  return (
    <span
      aria-label={label}
      className="h-9 w-9 rounded-full border border-sand-100/30 flex items-center justify-center text-gold-200 text-xs hover:border-gold-300 transition-colors cursor-default"
    >
      {label[0]}
    </span>
  );
}
