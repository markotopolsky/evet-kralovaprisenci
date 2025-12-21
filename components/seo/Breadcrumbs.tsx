"use client";

import Link from "next/link";
import { text } from "@/lib/i18n/translations";
import { JsonLd } from "./JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbItems = [{ name: text.nav.home, href: "/" }, ...items];

  const schemaItems = breadcrumbItems.map((item) => ({
    name: item.name,
    url: item.href,
  }));

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 bg-primary-light">
        <div className="container-friendly">
          <ol
            className="flex items-center gap-2 text-sm text-text-muted flex-wrap"
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
                  <span className="text-border" aria-hidden="true">
                    /
                  </span>
                )}
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-text font-medium" itemProp="name" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
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
