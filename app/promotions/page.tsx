import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAllPromotions } from "@/lib/queries/promotions";
import { generatePageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = generatePageMetadata({
  title: "Akcie a zľavy | Špeciálne ponuky veterinárnej kliniky",
  description: "Využite naše aktuálne akcie a špeciálne ponuky na veterinárne služby. Zľavy na vakcináciu, preventívne prehliadky a ďalšie služby.",
  path: "/promotions",
});

export default async function PromotionsPage() {
  const promotions = await getAllPromotions();

  return (
    <>
      <Breadcrumbs items={[{ name: "Akcie", href: "/promotions" }]} />
      
      <section className="section-padding bg-white" aria-labelledby="promotions-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge bg-[#E6B84C]/20 text-[#2A2A2A] mb-4">🎁 Akcie a zľavy</span>
            <h1
              id="promotions-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Aktuálne akcie a ponuky
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Využite naše špeciálne ponuky a ušetrite na veterinárnej starostlivosti.
            </p>
          </div>

          {promotions.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <div
                  key={promo._id}
                  className="card-friendly p-6 border-2 border-[#E6B84C]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">🎁</span>
                    {promo.discount && (
                      <span className="px-3 py-1 bg-[#E6B84C] text-[#2A2A2A] rounded-full text-sm font-bold">
                        -{promo.discount}%
                      </span>
                    )}
                  </div>
                  <h2 className="font-semibold text-xl text-[#2A2A2A] mb-2">
                    {promo.title}
                  </h2>
                  <p className="text-sm text-[#5C5C5C] mb-4">
                    {promo.description}
                  </p>
                  {promo.endDate && (
                    <p className="text-xs text-[#5C5C5C]">
                      Platí do: {formatDate(promo.endDate, "sk")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl block mb-4">📭</span>
              <p className="text-[#5C5C5C]">
                Momentálne nemáme žiadne aktívne akcie. Sledujte nás pre aktuálne ponuky!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}



