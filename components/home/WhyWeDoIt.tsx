"use client";

import { useLanguage } from "@/context/LanguageContext";

export function WhyWeDoIt() {
  const { language } = useLanguage();

  const content = {
    sk: {
      badge: "Prečo to robíme",
      title: "Pretože každé zviera si zaslúži lásku",
      description: "Naša práca nie je len profesia – je to poslanie. Veríme, že vzťah medzi človekom a jeho miláčikom je jedinečný a hlboký. Preto pristupujeme ku každému pacientovi nielen s odbornými znalosťami, ale predovšetkým so srdcom.",
      values: [
        {
          icon: "❤️",
          title: "Láska k zvieratám",
          description: "Každý pacient je pre nás jedinečný. Staráme sa oňho, akoby bol náš vlastný.",
        },
        {
          icon: "🤝",
          title: "Dôvera a transparentnosť",
          description: "Vždy vám vysvetlíme, čo robíme a prečo. Žiadne prekvapenia.",
        },
        {
          icon: "🌱",
          title: "Kontinuálny rozvoj",
          description: "Neustále sa vzdelávame, aby sme vám mohli ponúknuť tie najlepšie služby.",
        },
        {
          icon: "🏠",
          title: "Rodinná atmosféra",
          description: "Naša klinika je miesto, kde sa budete cítiť ako doma.",
        },
      ],
    },
    de: {
      badge: "Warum wir es tun",
      title: "Weil jedes Tier Liebe verdient",
      description: "Unsere Arbeit ist nicht nur ein Beruf – es ist eine Berufung. Wir glauben, dass die Beziehung zwischen Mensch und Haustier einzigartig und tiefgreifend ist. Deshalb behandeln wir jeden Patienten nicht nur mit Fachwissen, sondern vor allem mit Herz.",
      values: [
        {
          icon: "❤️",
          title: "Liebe zu Tieren",
          description: "Jeder Patient ist für uns einzigartig. Wir kümmern uns um ihn, als wäre er unser eigenes Tier.",
        },
        {
          icon: "🤝",
          title: "Vertrauen und Transparenz",
          description: "Wir erklären Ihnen immer, was wir tun und warum. Keine Überraschungen.",
        },
        {
          icon: "🌱",
          title: "Kontinuierliche Entwicklung",
          description: "Wir bilden uns ständig weiter, um Ihnen die besten Leistungen zu bieten.",
        },
        {
          icon: "🏠",
          title: "Familiäre Atmosphäre",
          description: "Unsere Klinik ist ein Ort, an dem Sie sich wie zu Hause fühlen werden.",
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="section-padding bg-white" aria-labelledby="why-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge mb-4">
            💚 {t.badge}
          </span>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-6"
          >
            {t.title}
          </h2>
          <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.values.map((value, index) => (
            <div
              key={index}
              className="card-friendly p-6 text-center"
            >
              <div className="w-16 h-16 bg-[#F2F7F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{value.icon}</span>
              </div>
              <h3 className="font-semibold text-lg text-[#2A2A2A] mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-[#5C5C5C]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



