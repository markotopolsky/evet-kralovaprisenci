"use client";

import Link from "next/link";
import { urls } from "@/config/urls";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  Users,
  HeartHandshake,
  Clock3,
  Dog,
  Cat,
  Rabbit,
  Info,
  LucideIcon,
} from "lucide-react";

export function AboutPreview() {
  const { t } = useLanguage();

  const features: { icon: LucideIcon; title: string; description: string }[] = [
    {
      icon: Building2,
      title: t.about.modernClinic,
      description: t.about.modernClinicDesc,
    },
    {
      icon: Users,
      title: t.about.experiencedTeam,
      description: t.about.experiencedTeamDesc,
    },
    {
      icon: HeartHandshake,
      title: t.about.individualCare,
      description: t.about.individualCareDesc,
    },
    {
      icon: Clock3,
      title: t.about.flexibleHours,
      description: t.about.flexibleHoursDesc,
    },
  ];

  return (
    <section className="section-padding bg-white" aria-labelledby="about-preview-heading">
      <div className="container-friendly">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge mb-4 inline-flex items-center gap-2">
              <Info className="w-4 h-4" /> {t.about.badge}
            </span>
            <h2
              id="about-preview-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-6"
            >
              {t.about.title}
            </h2>
            <p className="text-lg text-[#5C5C5C] mb-8">
              {t.about.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#F2F7F5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#3C8C80]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2A2A2A] mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#5C5C5C]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href={urls.about} className="btn-secondary">
              {t.about.moreAbout} →
            </Link>
          </div>

          <div className="relative">
            <div className="bg-[#F2F7F5] rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-xl p-6 shadow-gentle">
                  <p className="text-4xl font-bold text-[#3C8C80] mb-2">15+</p>
                  <p className="text-sm text-[#5C5C5C]">{t.about.yearsExperience}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-gentle">
                  <p className="text-4xl font-bold text-[#3C8C80] mb-2">5000+</p>
                  <p className="text-sm text-[#5C5C5C]">{t.about.happyClients}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-gentle">
                  <p className="text-4xl font-bold text-[#3C8C80] mb-2">4.9</p>
                  <p className="text-sm text-[#5C5C5C]">{t.about.rating}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-[#3C8C80]">
                <Dog className="w-12 h-12" />
                <Cat className="w-12 h-12" />
                <Rabbit className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




