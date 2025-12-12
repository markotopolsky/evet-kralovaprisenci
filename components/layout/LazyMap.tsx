"use client";

import dynamic from "next/dynamic";
import { MapSkeleton } from "@/components/ui/Skeleton";

const MapEmbed = dynamic(
  () => import("./MapEmbed").then((mod) => ({ default: mod.MapEmbed })),
  {
    loading: () => <MapSkeleton />,
    ssr: false, // Map doesn't need SSR
  }
);

interface LazyMapProps {
  className?: string;
  height?: string;
}

export function LazyMap({ className, height }: LazyMapProps) {
  return <MapEmbed className={className} height={height} />;
}




