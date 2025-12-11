"use client";

import Link from "next/link";
import { AnimalType } from "@/lib/models/AnimalType";
import { useLanguage } from "@/context/LanguageContext";

interface AnimalTypesListProps {
  animalTypes: AnimalType[];
}

const animalIcons: Record<string, string> = {
  psy: "🐕",
  macky: "🐈",
  hlodavce: "🐹",
  vtaky: "🐦",
  default: "🐾",
};

export function AnimalTypesList({ animalTypes }: AnimalTypesListProps) {
  const { language } = useLanguage();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {animalTypes.map((animal) => (
        <Link
          key={animal._id}
          href={`/vase-zvieratko/${animal.slug}`}
          className="card-friendly p-8 text-center group"
        >
          <div className="w-24 h-24 bg-[#3C8C80]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3C8C80]/20 transition-colors">
            <span className="text-5xl">
              {animalIcons[animal.slug] || animalIcons.default}
            </span>
          </div>
          <h2 className="font-semibold text-xl text-[#2A2A2A] mb-2 group-hover:text-[#3C8C80] transition-colors">
            {animal.name}
          </h2>
          <p className="text-sm text-[#5C5C5C]">
            {animal.description}
          </p>
          <span className="inline-flex items-center gap-1 text-[#3C8C80] font-medium text-sm mt-4">
            {language === "sk" ? "Články a rady" : "Artikel und Tipps"} →
          </span>
        </Link>
      ))}
      
      {/* Aktuality Card */}
      <Link
        href="/vase-zvieratko/aktuality"
        className="card-friendly p-8 text-center group"
      >
        <div className="w-24 h-24 bg-[#3C8C80]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3C8C80]/20 transition-colors">
          <span className="text-5xl">📰</span>
        </div>
        <h2 className="font-semibold text-xl text-[#2A2A2A] mb-2 group-hover:text-[#3C8C80] transition-colors">
          {language === "sk" ? "Aktuality" : "Aktuelles"}
        </h2>
        <p className="text-sm text-[#5C5C5C]">
          {language === "sk" 
            ? "Novinky, varovania a dôležité informácie pre majiteľov zvierat"
            : "Neuigkeiten, Warnungen und wichtige Informationen für Tierbesitzer"}
        </p>
        <span className="inline-flex items-center gap-1 text-[#3C8C80] font-medium text-sm mt-4">
          {language === "sk" ? "Zobraziť aktuality" : "Aktuelles anzeigen"} →
        </span>
      </Link>
    </div>
  );
}



