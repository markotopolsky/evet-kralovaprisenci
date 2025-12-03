"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { JsonLd } from "./JsonLd";
import { generateBreadcrumbSchema, baseUrl } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useLanguage();

  const breadcrumbItems = [{ name: t.nav.home, href: "/" }, ...items];

  const schemaItems = breadcrumbItems.map((item) => ({
    name: item.name,
    url: item.href,
  }));

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(schemaItems)} />
      <nav
        aria-label="Breadcrumb"
        className="py-3 px-4 sm:px-6 lg:px-8 bg-[#F2F7F5]"
      >
        <div className="container-friendly">
          <ol
            className="flex items-center gap-2 text-sm text-[#5C5C5C] flex-wrap"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbItems.map((item, index) => (
              <li
                key={item.href}
                className="flex items-center gap-2"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <span className="text-[#E4E4E4]" aria-hidden="true">
                    /
                  </span>
                )}
                {index === breadcrumbItems.length - 1 ? (
                  <span
                    className="text-[#2A2A2A] font-medium"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#3C8C80] transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
