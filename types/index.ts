// Shared TypeScript types

export interface PageProps {
  params: Promise<{ slug?: string; articleSlug?: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface LayoutProps {
  children: React.ReactNode;
  params?: Promise<{ slug?: string }>;
}

export interface MetaImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: MetaImage;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export type Language = "sk" | "de";

export interface LocalizedString {
  sk: string;
  de: string;
}






