"use client";

import { useLanguage } from "@/context/LanguageContext";

interface Equipment {
  name: { sk: string; de: string };
  description: { sk: string; de: string };
  icon: string;
}

const equipment: Equipment[] = [
  {
    name: { sk: "Digitálny röntgen", de: "Digitales Röntgen" },
    description: {
      sk: "Moderný digitálny röntgen pre rýchlu a presnú diagnostiku.",
      de: "Modernes digitales Röntgen für schnelle und genaue Diagnostik.",
    },
    icon: "📷",
  },
  {
    name: { sk: "USG prístroj", de: "Ultraschallgerät" },
    description: {
      sk: "Ultrazvukové vyšetrenie pre neinvazívnu diagnostiku vnútorných orgánov.",
      de: "Ultraschalluntersuchung für nicht-invasive Diagnostik innerer Organe.",
    },
    icon: "🔬",
  },
  {
    name: { sk: "Laboratórne vybavenie", de: "Laborausstattung" },
    description: {
      sk: "Kompletné vybavenie pre základné aj pokročilé krvné testy.",
      de: "Komplette Ausstattung für grundlegende und fortgeschrittene Bluttests.",
    },
    icon: "🧪",
  },
  {
    name: { sk: "Operačná sála", de: "Operationssaal" },
    description: {
      sk: "Plne vybavená operačná sála pre chirurgické zákroky.",
      de: "Voll ausgestatteter Operationssaal für chirurgische Eingriffe.",
    },
    icon: "🏥",
  },
  {
    name: { sk: "Dentálna jednotka", de: "Dentaleinheit" },
    description: {
      sk: "Špecializované vybavenie pre dentálnu starostlivosť zvierat.",
      de: "Spezialisierte Ausrüstung für die Zahnpflege von Tieren.",
    },
    icon: "🦷",
  },
  {
    name: { sk: "Hospitalizácia", de: "Hospitalisierung" },
    description: {
      sk: "Pohodlné priestory pre pooperačnú starostlivosť a pozorovanie.",
      de: "Komfortable Räumlichkeiten für postoperative Betreuung und Beobachtung.",
    },
    icon: "🛏️",
  },
];

export function EquipmentGrid() {
  const { language } = useLanguage();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment.map((item, index) => (
        <div key={index} className="card-friendly p-6">
          <div className="w-14 h-14 bg-[#3C8C80]/10 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">{item.icon}</span>
          </div>
          <h3 className="font-semibold text-lg text-[#2A2A2A] mb-2">
            {item.name[language]}
          </h3>
          <p className="text-sm text-[#5C5C5C]">
            {item.description[language]}
          </p>
        </div>
      ))}
    </div>
  );
}



