"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "./StoreProvider";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Boutique" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, favoritesCount } = useStore();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Hidden admin area renders without public chrome.
  if (pathname.startsWith("/EL-KSSAR")) return null;

  return (
    // Navbar background matches the EL KSSAR logo background (#939393) exactly,
    // so the logo merges naturally into the bar with no visible rectangle.
    <header
      className="sticky top-0 z-50 border-b border-black/10"
      style={{ backgroundColor: "#939393" }}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="EL KSSAR — Accueil">
            <Image
              src="/brand/logo.png"
              alt="EL KSSAR"
              width={52}
              height={52}
              priority
              className="h-12 w-12 object-contain"
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-serif text-rust text-2xl tracking-[0.18em] font-semibold">
                EL KSSAR
              </span>
              <span className="font-arabic text-rust/90 text-base mt-0.5">
                قصر الأثاث
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive(l.href)
                      ? "text-rust font-medium"
                      : "text-walnut-900/80 hover:text-rust"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <Link
              href="/favorites"
              className="relative text-walnut-900/85 hover:text-rust transition-colors"
              aria-label="Favoris"
            >
              <HeartIcon />
              {favoritesCount > 0 && <Badge count={favoritesCount} />}
            </Link>
            <Link
              href="/cart"
              className="relative text-walnut-900/85 hover:text-rust transition-colors"
              aria-label="Panier"
            >
              <BagIcon />
              {cartCount > 0 && <Badge count={cartCount} />}
            </Link>
            <button
              className="lg:hidden text-walnut-900/85 hover:text-rust"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-black/10" style={{ backgroundColor: "#939393" }}>
          <ul className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 text-base ${
                    isActive(l.href) ? "text-rust font-medium" : "text-walnut-900/85"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -top-2 -right-2 bg-rust text-white text-[10px] font-medium h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
      {count}
    </span>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-7.5-4.6-10-9.2C.6 9 1.6 5.5 4.8 4.8 7 4.3 8.8 5.4 12 8.4c3.2-3 5-4.1 7.2-3.6 3.2.7 4.2 4.2 2.8 7C19.5 16.4 12 21 12 21z" strokeLinejoin="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 7h12l1 13H5L6 7z" strokeLinejoin="round" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
