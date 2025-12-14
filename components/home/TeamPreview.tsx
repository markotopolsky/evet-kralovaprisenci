"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface TeamMember {
  name: string;
  role: { sk: string; de: string };
  description: { sk: string; de: string };
  image: string;
}

const PROFILE_IMAGE_URL =
  "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765729208/lighter-3843886857_ujr5rr.jpg";

const teamMembers: TeamMember[] = [
  {
    name: "MVDr. Ján Novák",
    role: { sk: "Hlavný veterinár", de: "Leitender Tierarzt" },
    description: {
      sk: "Špecialista na malé zvieratá s 15-ročnou praxou.",
      de: "Spezialist für Kleintiere mit 15 Jahren Erfahrung.",
    },
    image: PROFILE_IMAGE_URL,
  },
  {
    name: "MVDr. Anna Kováčová",
    role: { sk: "Veterinárna chirurgička", de: "Tierärztliche Chirurgin" },
    description: {
      sk: "Expertka na ortopédiu a mäkké tkanivá.",
      de: "Expertin für Orthopädie und Weichteilchirurgie.",
    },
    image: PROFILE_IMAGE_URL,
  },
  {
    name: "MVDr. Peter Horváth",
    role: { sk: "Veterinár - stomatológia", de: "Tierarzt - Zahnmedizin" },
    description: {
      sk: "Zameraný na dentálnu starostlivosť zvierat.",
      de: "Spezialisiert auf zahnärztliche Versorgung von Tieren.",
    },
    image: PROFILE_IMAGE_URL,
  },
];

export function TeamPreview() {
  const { t, language } = useLanguage();

  return (
    <section className="section-padding bg-[#F2F7F5]" aria-labelledby="team-preview-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge mb-4">
            👥 {t.team.badge}
          </span>
          <h2
            id="team-preview-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
          >
            {t.team.title}
          </h2>
          <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
            {t.team.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="card-friendly p-6 text-center">
              <div className="w-24 h-24 bg-[#3C8C80]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={`${member.name} profilová fotografia`}
                  width={96}
                  height={96}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg text-[#2A2A2A] mb-1">
                {member.name}
              </h3>
              <p className="text-[#3C8C80] font-medium text-sm mb-3">
                {member.role[language]}
              </p>
              <p className="text-sm text-[#5C5C5C]">
                {member.description[language]}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/about" className="btn-secondary">
            {t.team.meetTeam} →
          </Link>
        </div>
      </div>
    </section>
  );
}




