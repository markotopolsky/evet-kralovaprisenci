"use client";

import dynamic from "next/dynamic";
import { ReviewsSkeleton } from "@/components/ui/Skeleton";

const GoogleReviews = dynamic(
  () => import("./GoogleReviews").then((mod) => ({ default: mod.GoogleReviews })),
  {
    loading: () => (
      <section className="py-16 sm:py-20 bg-[#f8f8f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4">
              <span className="w-5 h-5 bg-[#e8e6e1] rounded animate-pulse" />
              <span className="w-16 h-4 bg-[#e8e6e1] rounded animate-pulse" />
            </div>
            <div className="h-9 w-64 mx-auto bg-[#e8e6e1] rounded animate-pulse mb-4" />
            <div className="h-6 w-48 mx-auto bg-[#e8e6e1] rounded animate-pulse" />
          </div>
          <ReviewsSkeleton />
        </div>
      </section>
    ),
    ssr: false,
  }
);

export function LazyGoogleReviews() {
  return <GoogleReviews />;
}




