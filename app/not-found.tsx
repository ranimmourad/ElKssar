import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-32 text-center">
      <p className="font-arabic text-gold-500 text-3xl mb-3">قصر الأثاث</p>
      <h1 className="font-serif text-5xl text-walnut-900">404</h1>
      <p className="mt-4 text-walnut-700/80">Cette page est introuvable.</p>
      <Link
        href="/"
        className="mt-8 inline-block bg-rust hover:bg-rust-dark text-white px-8 py-3.5 text-sm tracking-wide transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
