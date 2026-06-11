"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { stores, openingHours, phone } from "@/lib/stores";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20">
      <div className="text-center mb-14">
        <p className="font-arabic text-gold-500 text-2xl mb-2">قصر الأثاث</p>
        <h1 className="font-serif text-4xl text-walnut-900">EL KSSAR</h1>
        <p className="mt-3 text-walnut-700/80">Meubles & Décoration de Luxe</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-14">
        {/* Info */}
        <div>
          <SectionHeading eyebrow="Nous Trouver" title="Nos adresses" />
          <ul className="mt-10 space-y-7">
            {stores.map((s) => (
              <li key={s.address} className="flex gap-4">
                <span className="text-rust mt-1">📍</span>
                <div>
                  <p className="font-serif text-lg text-walnut-900">{s.city}</p>
                  <p className="text-walnut-700/85">{s.address}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-walnut-100 pt-8 space-y-3 text-walnut-700">
            <p><span className="eyebrow text-xs text-walnut-400 mr-3">Téléphone</span>{phone}</p>
            <p><span className="eyebrow text-xs text-walnut-400 mr-3">Horaires</span>{openingHours}</p>
          </div>
        </div>

        {/* Form (UI only) */}
        <div className="bg-sand-50 p-8 md:p-10">
          <h2 className="font-serif text-2xl text-walnut-900 mb-6">Écrivez-nous</h2>
          {sent ? (
            <div className="py-12 text-center">
              <p className="text-rust text-lg font-serif mb-2">Merci !</p>
              <p className="text-walnut-700/80 text-sm">
                Votre message a bien été pris en compte. Nous vous répondrons rapidement.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5"
            >
              <Field label="Nom complet" type="text" required />
              <Field label="Email" type="email" required />
              <Field label="Téléphone" type="tel" />
              <div>
                <label className="block text-sm text-walnut-700 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full border border-walnut-200 bg-white px-4 py-3 text-walnut-800 focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-rust hover:bg-rust-dark text-white px-8 py-3.5 text-sm tracking-wide transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, required }: { label: string; type: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm text-walnut-700 mb-2">{label}</label>
      <input
        type={type}
        required={required}
        className="w-full border border-walnut-200 bg-white px-4 py-3 text-walnut-800 focus:outline-none focus:border-gold-500"
      />
    </div>
  );
}
