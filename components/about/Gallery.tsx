"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Stethoscope, Heart } from "lucide-react";

interface GallerySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  images: string[];
}

const gallerySections: GallerySection[] = [
  {
    id: "vybavenie",
    title: "Naše vybavenie",
    icon: <Stethoscope className="w-5 h-5" />,
    images: [
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766346988/IMG-20251210-WA0047_ttl7m0.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766346987/IMG-20251210-WA0045_1_dnmha7.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766346987/IMG-20251210-WA0045_evw35j.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766346987/IMG-20251210-WA0024_ecgx7q.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766346987/IMG-20251210-WA0039_vnwzyu.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766346987/IMG-20251210-WA0048_eohxgr.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766346987/IMG-20251210-WA0051_poh4wr.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766344612/IMG-20251210-WA0029_uhl5ck.jpg",
    ],
  },
  {
    id: "zvieratka",
    title: "Naši pacienti",
    icon: <Heart className="w-5 h-5" />,
    images: [
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766347126/IMG-20251207-WA0014_hr2dak.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766347155/IMG-20251210-WA0000_q6ahup.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766347155/IMG-20250802-WA0004_brsiw7.jpg",
      "https://res.cloudinary.com/dl6xldrhk/image/upload/v1766347154/IMG-20251103-WA0046_2_p3b2yv.jpg",
    ],
  },
];

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (sectionIndex: number, imageIndex: number) => {
    setCurrentSection(sectionIndex);
    setCurrentImage(imageIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    const section = gallerySections[currentSection];
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    } else if (currentSection > 0) {
      const prevSection = gallerySections[currentSection - 1];
      setCurrentSection(currentSection - 1);
      setCurrentImage(prevSection.images.length - 1);
    }
  };

  const goToNext = () => {
    const section = gallerySections[currentSection];
    if (currentImage < section.images.length - 1) {
      setCurrentImage(currentImage + 1);
    } else if (currentSection < gallerySections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentImage(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <div className="space-y-12">
      {gallerySections.map((section, sectionIndex) => (
        <div key={section.id}>
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {section.icon}
            </div>
            <h2 className="text-xl font-semibold text-text-primary">
              {section.title}
            </h2>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {section.images.map((src, imageIndex) => (
              <button
                key={`${section.id}-${imageIndex}`}
                onClick={() => openLightbox(sectionIndex, imageIndex)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-primary-light cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Image
                  src={src}
                  alt={`${section.title} - obrázok ${imageIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Zavrieť"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={currentSection === 0 && currentImage === 0}
            aria-label="Predchádzajúci obrázok"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallerySections[currentSection].images[currentImage]}
              alt={`${gallerySections[currentSection].title} - obrázok ${currentImage + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={
              currentSection === gallerySections.length - 1 &&
              currentImage === gallerySections[currentSection].images.length - 1
            }
            aria-label="Ďalší obrázok"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
            {gallerySections[currentSection].title} • {currentImage + 1} / {gallerySections[currentSection].images.length}
          </div>
        </div>
      )}
    </div>
  );
}
