"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateFAQSchema } from "@/lib/seo";

interface FAQItem {
  question: { sk: string; de: string };
  answer: { sk: string; de: string };
}

const faqData: FAQItem[] = [
  {
    question: {
      sk: "Aké sú vaše otváracie hodiny?",
      de: "Was sind Ihre Öffnungszeiten?",
    },
    answer: {
      sk: "Sme otvorení v pondelok a stredu od 9:00 do 17:00, v utorok, štvrtok a piatok od 13:00 do 20:00, v sobotu od 11:00 do 15:00 a v nedeľu od 18:00 do 20:00.",
      de: "Wir sind montags und mittwochs von 9:00 bis 17:00 Uhr, dienstags, donnerstags und freitags von 13:00 bis 20:00 Uhr, samstags von 11:00 bis 15:00 Uhr und sonntags von 18:00 bis 20:00 Uhr geöffnet.",
    },
  },
  {
    question: {
      sk: "Potrebujem sa objednať vopred?",
      de: "Muss ich vorher einen Termin vereinbaren?",
    },
    answer: {
      sk: "Áno, odporúčame objednať sa vopred, aby sme vám mohli venovať dostatok času. Online objednávku môžete urobiť cez náš rezervačný systém alebo nás kontaktujte telefonicky.",
      de: "Ja, wir empfehlen, vorher einen Termin zu vereinbaren, damit wir Ihnen genügend Zeit widmen können. Sie können online über unser Buchungssystem buchen oder uns telefonisch kontaktieren.",
    },
  },
  {
    question: {
      sk: "Aké zvieratá ošetrujete?",
      de: "Welche Tiere behandeln Sie?",
    },
    answer: {
      sk: "Ošetrujeme psov, mačky, hlodavce (morčatá, škrečky, králiky) a ďalšie malé domáce zvieratá. Pre exotické zvieratá vám odporučíme špecializované pracovisko.",
      de: "Wir behandeln Hunde, Katzen, Nagetiere (Meerschweinchen, Hamster, Kaninchen) und andere kleine Haustiere. Für exotische Tiere empfehlen wir Ihnen eine spezialisierte Einrichtung.",
    },
  },
  {
    question: {
      sk: "Koľko stojí preventívna prehliadka?",
      de: "Wie viel kostet eine Vorsorgeuntersuchung?",
    },
    answer: {
      sk: "Cena preventívnej prehliadky závisí od typu zvieraťa a rozsahu vyšetrenia. Základná prehliadka začína od 25€. Presný cenník vám poskytneme pri objednaní alebo na klinike.",
      de: "Der Preis einer Vorsorgeuntersuchung hängt von der Art des Tieres und dem Umfang der Untersuchung ab. Eine Grunduntersuchung beginnt bei 25€. Einen genauen Preisvoranschlag erhalten Sie bei der Buchung oder in der Klinik.",
    },
  },
  {
    question: {
      sk: "Ponúkate aj pohotovostné služby?",
      de: "Bieten Sie auch Notfalldienste an?",
    },
    answer: {
      sk: "Akútne prípady riešime počas našich ordinačných hodín. Pre nočné pohotovosti odporúčame kontaktovať najbližšiu veterinárnu pohotovosť v Bratislave.",
      de: "Akute Fälle behandeln wir während unserer Sprechzeiten. Für Nachtnotfälle empfehlen wir, den nächsten tierärztlichen Notdienst in Bratislava zu kontaktieren.",
    },
  },
  {
    question: {
      sk: "Môžem platiť kartou?",
      de: "Kann ich mit Karte bezahlen?",
    },
    answer: {
      sk: "Áno, prijímame platby v hotovosti aj kartou (Visa, Mastercard). Môžete platiť aj cez Apple Pay alebo Google Pay.",
      de: "Ja, wir akzeptieren Barzahlung und Kartenzahlung (Visa, Mastercard). Sie können auch mit Apple Pay oder Google Pay bezahlen.",
    },
  },
];

export function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaFaqs = faqData.map((faq) => ({
    question: faq.question[language],
    answer: faq.answer[language],
  }));

  return (
    <section className="section-padding bg-white" aria-labelledby="faq-heading">
      <JsonLd data={generateFAQSchema(schemaFaqs)} />
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F2F7F5] rounded-full text-[#3C8C80] font-medium mb-4">
            ❓ FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
          >
            {language === "sk" ? "Často kladené otázky" : "Häufig gestellte Fragen"}
          </h2>
          <p className="text-xl text-[#5C5C5C]">
            {language === "sk"
              ? "Odpovede na najčastejšie otázky o našich službách"
              : "Antworten auf die häufigsten Fragen zu unseren Dienstleistungen"}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4" role="list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-[#E4E4E4] rounded-xl overflow-hidden bg-white"
              role="listitem"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#F2F7F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3C8C80] focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-[#2A2A2A] pr-4">
                  {faq.question[language]}
                </span>
                <span
                  className={`text-[#3C8C80] transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
                role="region"
              >
                <p className="px-6 pb-4 text-[#5C5C5C] leading-relaxed">
                  {faq.answer[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
