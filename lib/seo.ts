import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://evet-kralova.sk";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.defaultMeta.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultMeta.description,
  keywords: siteConfig.defaultMeta.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: baseUrl,
    siteName: siteConfig.name,
    title: siteConfig.defaultMeta.title,
    description: siteConfig.defaultMeta.description,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultMeta.title,
    description: siteConfig.defaultMeta.description,
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "sk-SK": baseUrl,
      "de-DE": `${baseUrl}/de`,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${baseUrl}/#veterinary-clinic`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: baseUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    logo: `${baseUrl}/logo/logo-small.svg`,
    image: `${baseUrl}/og-image.jpg`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.zip,
      addressCountry: "SK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.1892,
      longitude: 17.3647,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday"],
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Thursday", "Friday"],
        opens: "13:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "11:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "18:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.googleMaps.reviewsUrl,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Veterinárne služby",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Preventívne prehliadky",
            description: "Kompletné zdravotné prehliadky pre psov a mačky",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vakcinácia",
            description: "Očkovanie domácich miláčikov podľa očkovacieho kalendára",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Chirurgia",
            description: "Chirurgické zákroky vrátane kastrácie a sterilizácie",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Stomatológia",
            description: "Dentálna starostlivosť a čistenie zubov",
          },
        },
      ],
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  authorName = "Veterinárna klinika Kráľová pri Senci",
  image,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image || `${baseUrl}/og-image.jpg`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo/logo-small.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateServiceSchema({
  name,
  description,
  slug,
  price,
}: {
  name: string;
  description: string;
  slug: string;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "VeterinaryCare",
      name: siteConfig.name,
      url: baseUrl,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.address.city,
    },
    url: `${baseUrl}/services/${slug}`,
    ...(price && {
      offers: {
        "@type": "Offer",
        price: price.replace(/[^0-9]/g, ""),
        priceCurrency: "EUR",
      },
    }),
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

