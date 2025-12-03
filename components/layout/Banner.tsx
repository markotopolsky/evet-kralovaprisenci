"use client";

import { useState } from "react";
import Link from "next/link";
import { Banner as BannerType } from "@/lib/models/Banner";

interface BannerProps {
  banners: BannerType[];
}

export function Banner({ banners }: BannerProps) {
  const [dismissedBanners, setDismissedBanners] = useState<Set<string>>(new Set());

  if (!banners.length) return null;

  const visibleBanners = banners.filter((b) => !dismissedBanners.has(b._id));

  if (!visibleBanners.length) return null;

  const banner = visibleBanners[0];

  return (
    <div className="bg-[#E6B84C] text-[#2A2A2A] py-2 px-4 relative">
      <div className="container-friendly">
        <div className="flex items-center justify-center gap-4">
          <Link
            href={banner.link}
            className="flex-1 text-center font-medium hover:underline"
          >
            <span className="font-bold">{banner.title}:</span> {banner.description}
          </Link>
          <button
            onClick={() => setDismissedBanners((prev) => new Set(prev).add(banner._id))}
            className="p-1 hover:bg-[#d4a43d] rounded transition-colors"
            aria-label="Zatvoriť"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

