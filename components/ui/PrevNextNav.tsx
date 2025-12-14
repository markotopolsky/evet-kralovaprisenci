"use client";

import Link from "next/link";

export type NavItem = {
  title: string;
  slug: string;
  href: string;
};

interface PrevNextNavProps {
  prev: NavItem | null;
  next: NavItem | null;
  backLink?: {
    href: string;
    label: string;
  };
}

export function PrevNextNav({ prev, next, backLink }: PrevNextNavProps) {
  return (
    <nav 
      aria-label="Navigácia medzi položkami"
      className="mt-12 pt-8 border-t border-[#E4E4E4]"
    >
      <div className="flex flex-col sm:flex-row items-stretch gap-4">
        {/* Previous */}
        <div className="flex-1">
          {prev ? (
            <Link
              href={prev.href}
              className="group flex items-center gap-3 p-4 rounded-xl border border-[#E4E4E4] hover:border-[#3C8C80] hover:bg-[#F2F7F5] transition-all h-full"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2F7F5] group-hover:bg-white flex items-center justify-center text-[#3C8C80] transition-colors">
                ←
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-xs text-[#5C5C5C] block mb-0.5">
                  Predchádzajúci
                </span>
                <span className="font-medium text-[#2A2A2A] group-hover:text-[#3C8C80] transition-colors line-clamp-1">
                  {prev.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-[#E4E4E4] h-full flex items-center justify-center text-[#9CA3AF] text-sm">
              Žiadny predchádzajúci
            </div>
          )}
        </div>

        {/* Next */}
        <div className="flex-1">
          {next ? (
            <Link
              href={next.href}
              className="group flex items-center gap-3 p-4 rounded-xl border border-[#E4E4E4] hover:border-[#3C8C80] hover:bg-[#F2F7F5] transition-all h-full"
            >
              <div className="min-w-0 flex-1 text-right">
                <span className="text-xs text-[#5C5C5C] block mb-0.5">
                  Nasledujúci
                </span>
                <span className="font-medium text-[#2A2A2A] group-hover:text-[#3C8C80] transition-colors line-clamp-1">
                  {next.title}
                </span>
              </div>
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2F7F5] group-hover:bg-white flex items-center justify-center text-[#3C8C80] transition-colors">
                →
              </span>
            </Link>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-[#E4E4E4] h-full flex items-center justify-center text-[#9CA3AF] text-sm">
              Žiadny nasledujúci
            </div>
          )}
        </div>
      </div>

      {/* Back link */}
      {backLink && (
        <div className="mt-6 text-center">
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-2 text-[#3C8C80] hover:text-[#2d6b62] font-medium transition-colors"
          >
            ← {backLink.label}
          </Link>
        </div>
      )}
    </nav>
  );
}


