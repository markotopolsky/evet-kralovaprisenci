"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/i18n/translations";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "sk", label: "Slovenčina", flag: "🇸🇰" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-2 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
            language === lang.code
              ? "bg-[#F2F7F5] text-[#3C8C80]"
              : "text-[#5C5C5C] hover:bg-[#F2F7F5]"
          }`}
          title={lang.label}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
