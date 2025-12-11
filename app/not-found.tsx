"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <span className="text-9xl block mb-6">🐾</span>
        <h1 className="text-4xl font-bold text-[#2A2A2A] mb-4">
          {t.notFound.title}
        </h1>
        <p className="text-[#5C5C5C] mb-8 max-w-md mx-auto">
          {t.notFound.description}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>{t.notFound.backHome}</Button>
          </Link>
          <Link href="/services">
            <Button variant="outline">{t.notFound.ourServices}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}



