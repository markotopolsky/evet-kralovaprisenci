"use client";

import Link from "next/link";
import { text } from "@/lib/i18n/translations";
import { Button } from "@/components/ui/Button";
import { PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 bg-primary-light rounded-full flex items-center justify-center">
          <PawPrint className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-text mb-4">{text.notFound.title}</h1>
        <p className="text-text-muted mb-8 max-w-md mx-auto">{text.notFound.description}</p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>{text.notFound.backHome}</Button>
          </Link>
          <Link href="/sluzby">
            <Button variant="outline">{text.notFound.ourServices}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
