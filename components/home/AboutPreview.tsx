"use client";

import Link from "next/link";
import Image from "next/image";
import { urls } from "@/config/urls";
import { text } from "@/lib/i18n/translations";
import { Building2, Users, HeartHandshake, Clock3, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// =============================================================================
// FEATURE CARD COMPONENT
// =============================================================================

function FeatureCard({ icon: Icon, title, description }: FeatureItem) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-text mb-1">{title}</h3>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AboutPreview() {
  const features: FeatureItem[] = [
    {
      icon: Building2,
      title: text.about.modernClinic,
      description: text.about.modernClinicDesc,
    },
    {
      icon: Users,
      title: text.about.experiencedTeam,
      description: text.about.experiencedTeamDesc,
    },
    {
      icon: HeartHandshake,
      title: text.about.individualCare,
      description: text.about.individualCareDesc,
    },
    {
      icon: Clock3,
      title: text.about.flexibleHours,
      description: text.about.flexibleHoursDesc,
    },
  ];

  return (
    <section className="section-padding bg-white" aria-labelledby="about-preview-heading">
      <div className="container-friendly">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge mb-4 inline-flex items-center gap-2">
              <Info className="w-4 h-4" /> {text.about.badge}
            </span>
            <h2
              id="about-preview-heading"
              className="text-3xl sm:text-4xl font-bold text-text mb-6"
            >
              {text.about.title}
            </h2>
            <p className="text-lg text-text-muted mb-8">{text.about.description}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>

            <Link href={urls.about} className="btn-secondary">
              {text.about.moreAbout} →
            </Link>
          </div>

          <div className="relative">
            <div className="bg-primary-light rounded-2xl p-8">
              <div className="grid grid-cols-2 grid-rows-2 gap-0 overflow-hidden rounded-xl aspect-[4/3]">
                {/* Large photo - 1/2 width, full height (spans 2 rows) */}
                <div className="row-span-2 relative rounded-l-xl overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dl6xldrhk/image/upload/v1766344728/IMG-20250823-WA0000_dl57rp.jpg"
                    alt="Clinic photo"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Small photo 1 - 1/4 width, top right */}
                <div className="relative rounded-tr-xl overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dl6xldrhk/image/upload/v1766344612/IMG-20251210-WA0029_uhl5ck.jpg"
                    alt="Clinic photo"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Small photo 2 - 1/4 width, bottom right */}
                <div className="relative rounded-br-xl overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dl6xldrhk/image/upload/v1766344612/IMG-20251210-WA0049_tvmkdr.jpg"
                    alt="Clinic photo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
