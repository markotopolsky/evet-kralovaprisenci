"use client";

import Link from "next/link";
import { Phone, Calendar, CheckCircle, PawPrint } from "lucide-react";
import { siteConfig } from "@/config/site";
import { text } from "@/lib/i18n/translations";

// =============================================================================
// FEATURE BADGE COMPONENT
// =============================================================================

interface FeatureBadgeProps {
  children: React.ReactNode;
}

function FeatureBadge({ children }: FeatureBadgeProps) {
  return (
    <div className="flex items-center gap-2.5">
      <CheckCircle className="w-4 h-4 text-white" />
      <span className="font-medium text-white">{children}</span>
    </div>
  );
}

// =============================================================================
// MAIN HERO COMPONENT
// =============================================================================

export function Hero() {
  return (
    <section 
      className="relative overflow-hidden min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dl6xldrhk/image/upload/v1766341669/IMG-20250818-WA0018_2_isyluq.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-labelledby="hero-heading"
    >
      {/* Sophisticated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 w-full">
        <div className="text-center space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-white/20 animate-fade-in">
            <PawPrint className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-text">{text.hero.badge}</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              style={{
                color: 'white',
                textShadow: '0 4px 12px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <span style={{ color: 'white' }}>{text.hero.title}</span> <span className="text-primary">{text.hero.titleHighlight}</span>
              <br />
              <span style={{ color: 'white' }}>{text.hero.titleEnd}</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
               style={{
                 textShadow: '0 2px 8px rgba(0,0,0,0.3)',
               }}>
              {text.hero.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto"
            >
              <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>{text.hero.bookAppointment}</span>
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-md text-primary rounded-xl font-semibold text-lg hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto"
            >
              <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>{siteConfig.phone}</span>
            </a>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white">
            <FeatureBadge>{text.hero.modernEquipment}</FeatureBadge>
            <FeatureBadge>{text.hero.experiencedTeam}</FeatureBadge>
            <FeatureBadge>{text.hero.individualCare}</FeatureBadge>
          </div>
        </div>
      </div>
    </section>
  );
}
