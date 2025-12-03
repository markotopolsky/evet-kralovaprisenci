"use client";

import { useLanguage } from "@/context/LanguageContext";

interface GalleryImage {
  id: string;
  title: { sk: string; de: string };
  placeholder: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: { sk: "Prijímacia miestnosť", de: "Empfangsbereich" },
    placeholder: "🏥",
  },
  {
    id: "2",
    title: { sk: "Vyšetrovňa", de: "Untersuchungsraum" },
    placeholder: "🩺",
  },
  {
    id: "3",
    title: { sk: "Operačná sála", de: "Operationssaal" },
    placeholder: "💉",
  },
  {
    id: "4",
    title: { sk: "Čakáreň", de: "Wartebereich" },
    placeholder: "🪑",
  },
  {
    id: "5",
    title: { sk: "Laboratórium", de: "Labor" },
    placeholder: "🧪",
  },
  {
    id: "6",
    title: { sk: "Hospitalizácia", de: "Hospitalisierungsbereich" },
    placeholder: "🛏️",
  },
];

export function Gallery() {
  const { language } = useLanguage();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleryImages.map((image) => (
        <div
          key={image.id}
          className="card-friendly overflow-hidden aspect-video"
        >
          <div className="w-full h-full bg-[#F2F7F5] flex flex-col items-center justify-center">
            <span className="text-5xl mb-2">{image.placeholder}</span>
            <p className="text-sm text-[#5C5C5C] font-medium">
              {image.title[language]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

