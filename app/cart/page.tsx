"use client";

import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { useStore } from "@/components/StoreProvider";
import { getProductById } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, setQuantity, removeFromCart, clearCart } = useStore();

  const lines = cart
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as { product: ReturnType<typeof getProductById> & object; quantity: number }[];

  const subtotal = lines.reduce(
    (sum, l) => sum + (l.product as any).price * l.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20">
      <SectionHeading eyebrow="Votre Panier" title="Récapitulatif" />

      {lines.length === 0 ? (
        <div className="mt-16 text-center py-16 border border-walnut-100">
          <p className="text-walnut-500 mb-6">Votre panier est vide.</p>
          <Link
            href="/shop"
            className="inline-block bg-rust hover:bg-rust-dark text-white px-8 py-3.5 text-sm tracking-wide transition-colors"
          >
            Découvrir nos pièces
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid lg:grid-cols-[1fr_340px] gap-12">
          {/* Lines */}
          <div className="divide-y divide-walnut-100 border-t border-walnut-100">
            {lines.map(({ product, quantity }) => {
              const p = product as any;
              return (
                <div key={p.id} className="flex gap-5 py-6">
                  <Link href={`/shop/${p.id}`} className="relative h-28 w-24 shrink-0 bg-sand-50 overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <Link href={`/shop/${p.id}`} className="font-serif text-lg text-walnut-900 hover:text-rust">
                      {p.name}
                    </Link>
                    <p className="text-walnut-700 mt-1">{formatPrice(p.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-walnut-200">
                        <button
                          onClick={() => setQuantity(p.id, quantity - 1)}
                          className="px-3 py-1.5 text-walnut-600 hover:text-rust"
                          aria-label="Diminuer"
                        >
                          −
                        </button>
                        <span className="px-4 text-sm text-walnut-800">{quantity}</span>
                        <button
                          onClick={() => setQuantity(p.id, quantity + 1)}
                          className="px-3 py-1.5 text-walnut-600 hover:text-rust"
                          aria-label="Augmenter"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(p.id)}
                        className="text-sm text-walnut-400 hover:text-rust"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                  <p className="font-medium text-walnut-900 hidden sm:block">
                    {formatPrice(p.price * quantity)}
                  </p>
                </div>
              );
            })}
            <div className="pt-6">
              <button onClick={clearCart} className="text-sm text-walnut-400 hover:text-rust">
                Vider le panier
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-sand-50 p-8 h-fit">
            <h3 className="font-serif text-2xl text-walnut-900 mb-6">Total</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-walnut-700">
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-walnut-700">
                <span>Livraison</span>
                <span>À convenir</span>
              </div>
            </div>
            <div className="border-t border-walnut-200 mt-5 pt-5 flex justify-between text-lg font-medium text-walnut-900">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/contact"
              className="mt-7 block text-center bg-rust hover:bg-rust-dark text-white px-8 py-3.5 text-sm tracking-wide transition-colors"
            >
              Finaliser ma commande
            </Link>
            <p className="mt-4 text-xs text-walnut-400 text-center leading-relaxed">
              Contactez-nous pour confirmer votre commande et organiser la livraison.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
