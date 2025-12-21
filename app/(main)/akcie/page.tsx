import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAllPromotions } from "@/lib/queries/promotions";
import { generatePageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { urls } from "@/config/urls";
import { Gift, Inbox } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Akcie a zľavy | Špeciálne ponuky veterinárnej kliniky",
  description:
    "Využite naše aktuálne akcie a špeciálne ponuky na veterinárne služby. Zľavy na vakcináciu, preventívne prehliadky a ďalšie služby.",
  path: urls.promotions,
});

export default async function PromotionsPage() {
  const promotions = await getAllPromotions();

  return (
    <>
      <Breadcrumbs items={[{ name: "Akcie", href: urls.promotions }]} />

      <section className="section-padding bg-white" aria-labelledby="promotions-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge bg-accent/20 text-text mb-4 inline-flex items-center gap-2">
              <Gift className="w-4 h-4" /> Akcie a zľavy
            </span>
            <h1
              id="promotions-heading"
              className="text-3xl sm:text-4xl font-bold text-text mb-4"
            >
              Aktuálne akcie a ponuky
            </h1>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Využite naše špeciálne ponuky a ušetrite na veterinárnej starostlivosti.
            </p>
          </div>

          {promotions.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map((promo) => (
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
                  <h2 className="font-semibold text-xl text-text mb-2">{promo.title}</h2>
                  <p className="text-sm text-text-muted mb-4">{promo.description}</p>
                  {promo.endDate && (
                    <p className="text-xs text-text-muted">Platí do: {formatDate(promo.endDate)}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center">
                <Inbox className="w-12 h-12 text-primary/40" />
              </div>
              <p className="text-text-muted">
                Momentálne nemáme žiadne aktívne akcie. Sledujte nás pre aktuálne ponuky!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
