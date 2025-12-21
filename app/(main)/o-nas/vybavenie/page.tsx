import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { Hospital } from "lucide-react";

const equipment = [
  {
    title: "Kyslíkový koncentrátor",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555763/Kysli%CC%81kovy%CC%81_koncentra%CC%81tor_o8mcm2.jpg",
    description:
      "Stály zdroj kyslíka pre pacientov v anestézii aj pri respiračných ochoreniach.",
  },
  {
    title: "Tlakomer",
    image: "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555763/Tlakomer_ehl7dq.webp",
    description:
      "Presné meranie systolického a diastolického tlaku pre bezpečné zákroky aj prevenciu.",
  },
  {
    title: "Chirurgický a terapeutický laser",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555763/Chirurgicky%CC%81_a_terapeuticky%CC%81_laser_mqsnis.webp",
    description: "Bezkrvné rezy, menej bolesti a rýchlejšie hojenie pri chirurgii aj terapii.",
  },
  {
    title: "USG prístroj",
    image: "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555763/USG_pri%CC%81stroj_tzm6ks.jpg",
    description:
      "Detailný ultrazvuk brušnej dutiny, srdca a gravidity bez potreby anestézie.",
  },
  {
    title: "Chirurgia bez krvácania pomocou Elektokauteru Diatermo značky GIMA",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555763/Chirurgia_bez_krva%CC%81cania_pomocou_Elektokauteru_bupom1.jpg",
    description: "Koaguluje priamo pri reze, skracuje zákrok a minimalizuje stratu krvi.",
  },
  {
    title: "Mikroskop s LCD obrazovkou",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555762/Mikroskop_s_LCD_obazovkou_rxqjst.webp",
    description: "Cytológia, moč a biopsie s možnosťou zdieľať obraz majiteľom pre transparentnosť.",
  },
  {
    title: "Biochemický analyzátor Catalyst One",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555762/Biochemicky%CC%81_analyza%CC%81tor_Catalyst_One_gsmiod.webp",
    description: "Výsledky chemických profilov krvi za pár minút priamo v ambulancii.",
  },
  {
    title: "Sterilizácia nástrojov teplým vzduchom",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555761/Steriliza%CC%81cia_na%CC%81strojov_teply%CC%81m_vzduchom_l70rpk.webp",
    description: "Suché teplo likviduje baktérie bez chemikálií a chráni životnosť nástrojov.",
  },
  {
    title: "Centrifúga vzoriek",
    image: "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555761/centrifuga_jsx50o.webp",
    description: "Rýchle oddelenie séra a plazmy pre presné laboratórne výsledky.",
  },
  {
    title: "Anesteziologický prístroj s riadenou ventiláciou",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555764/Anesteziologicky%CC%81_pri%CC%81stroj_s_riadenou_ventila%CC%81ciou_kyhbw3.webp",
    description: "Presné dávkovanie plynov a kyslíka na stabilnú a bezpečnú anestéziu.",
  },
  {
    title: "Vyšetrenie krvných skupín a zrážanlivosti krvi",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555761/Vys%CC%8Cetrenie_krvny%CC%81ch_skupi%CC%81n_zra%CC%81z%CC%8Canlivost%CC%8C_krvi_yjvibb.webp",
    description: "Koagulačné testy pre transfúzie a bezpečné chirurgické zákroky.",
  },
  {
    title: "Biochemické vyšetrenie krvi",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555762/Biochemicke%CC%81_vys%CC%8Cetrenie_krvi_hmemmt.webp",
    description: "Metabolické parametre pečene, obličiek a elektrolytov pre rýchlu diagnostiku.",
  },
  {
    title: "Imunochemické vyšetrenie krvi",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555761/Imunochemicke%CC%81_vys%CC%8Cetrenie_krvi_n7epdg.webp",
    description: "Hormóny, protilátky a antigény na zachytenie infekcií či endokrinologických porúch.",
  },
  {
    title: "Monitor životných funkcií",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555762/Monitor_z%CC%8Civotny%CC%81ch_funkcii%CC%81_srgwuu.webp",
    description: "Sleduje EKG, saturáciu, tlak a teplotu v reálnom čase počas anestézie aj hospitalizácie.",
  },
  {
    title: "Hematologický analyzátor ProCyte Dx",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555761/Hematologicky%CC%81_analyza%CC%81tor_ProCyte_Dx_feple6.webp",
    description: "Kompletný krvný obraz so 27 parametrami za niekoľko minút.",
  },
  {
    title: "Vyhrievací prístroj počas anestézie zvieraťa",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555762/Vyhrievaci%CC%81_pri%CC%81stroj_poc%CC%8Cas_aneste%CC%81zie_zvierat%CC%8Ca_jipj6p.webp",
    description: "Udržiava telesnú teplotu a znižuje pooperačné riziká u pacientov.",
  },
  {
    title: "Refraktometer pre analýzu moču",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555762/Refraktometer_pre_analy%CC%81zu_moc%CC%8Cu_y9mvf5.webp",
    description: "Hodnotí hustotu moču z malého objemu na odhalenie hydratácie a funkcie obličiek.",
  },
  {
    title: "Koprologické vyšetrenie a vyšetrenie moču",
    image:
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765555762/Koprologicke%CC%81_vys%CC%8Cetrenie_a_vys%CC%8Cetrenie_moc%CC%8Cu_a3ouss.webp",
    description: "Analýza stolice a moču odhalí parazity, infekcie aj metabolické poruchy.",
  },
];

export const metadata: Metadata = generatePageMetadata({
  title: "Vybavenie | Moderná veterinárna klinika",
  description: "Naša klinika je vybavená moderným diagnostickým a liečebným zariadením vrátane digitálneho röntgenu, USG, laboratórneho vybavenia a dentálnej jednotky.",
  path: "/o-nas/vybavenie",
});

export default function EquipmentPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "O nás", href: "/o-nas" },
          { name: "Vybavenie", href: "/o-nas/vybavenie" },
        ]}
      />
      
      <section className="section-padding bg-white" aria-labelledby="equipment-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4 inline-flex items-center gap-2">
              <Hospital className="w-4 h-4" /> Naše vybavenie
            </span>
            <h1
              id="equipment-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Moderné vybavenie pre najlepšiu starostlivosť
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Disponujeme najmodernejším vybavením pre diagnostiku a liečbu vašich miláčikov.
            </p>
            <p className="text-sm text-[#7A7A7A] max-w-2xl mx-auto mt-3">
              Fotografie pochádzajú priamo z našej kliniky – každé zariadenie používame denne pri vyšetreniach a zákrokoch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <article
                key={item.title}
                className="card-friendly h-full flex flex-col overflow-hidden border border-[#E7EBF3]"
              >
                <div className="relative aspect-[4/3] bg-[#F8FAFC]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg text-[#2A2A2A]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#5C5C5C] leading-relaxed">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}




