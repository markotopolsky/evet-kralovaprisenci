"use client";

import Link from "next/link";
import { Promotion } from "@/lib/models/Promotion";
import { formatDate } from "@/lib/utils";
import { Gift } from "lucide-react";

interface PromotionsPreviewProps {
  promotions: Promotion[];
}

export function PromotionsPreview({ promotions }: PromotionsPreviewProps) {
  if (!promotions.length) return null;

  return (
    <section className="section-padding bg-accent/10" aria-labelledby="promotions-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge bg-accent/20 text-text mb-4 inline-flex items-center gap-2">
            <Gift className="w-4 h-4" /> Akcie a zľavy
          </span>
          <h2 id="promotions-heading" className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Aktuálne akcie
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Využite naše špeciálne ponuky a ušetrite na veterinárnej starostlivosti.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {promotions.slice(0, 3).map((promo) => (
            <div key={promo._id} className="card-friendly p-6 border-2 border-accent">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-accent" />
                </div>
                {promo.discount && (
                  <span className="px-3 py-1 bg-accent text-text rounded-full text-sm font-bold">
                    -{promo.discount}%
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg text-text mb-2">{promo.title}</h3>
              <p className="text-sm text-text-muted mb-4">{promo.description}</p>
              {promo.endDate && (
                <p className="text-xs text-text-muted">Platí do: {formatDate(promo.endDate)}</p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/akcie" className="btn-accent">
            Všetky akcie →
          </Link>
        </div>
      </div>
    </section>
  );
}
