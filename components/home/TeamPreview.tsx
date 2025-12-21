"use client";

import Link from "next/link";
import Image from "next/image";
import { text } from "@/lib/i18n/translations";
import { Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const PROFILE_IMAGE_URL =
  "https://res.cloudinary.com/dl6xldrhk/image/upload/v1765729208/lighter-3843886857_ujr5rr.jpg";

const teamMembers: TeamMember[] = [
  {
    name: "MVDr. Ján Novák",
    role: "Hlavný veterinár",
    description: "Špecialista na malé zvieratá s 15-ročnou praxou.",
    image: PROFILE_IMAGE_URL,
  },
  {
    name: "MVDr. Anna Kováčová",
    role: "Veterinárna chirurgička",
    description: "Expertka na ortopédiu a mäkké tkanivá.",
    image: PROFILE_IMAGE_URL,
  },
  {
    name: "MVDr. Peter Horváth",
    role: "Veterinár - stomatológia",
    description: "Zameraný na dentálnu starostlivosť zvierat.",
    image: PROFILE_IMAGE_URL,
  },
];

export function TeamPreview() {
  return (
    <section className="section-padding bg-primary-light" aria-labelledby="team-preview-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge mb-4 inline-flex items-center gap-2">
            <Users className="w-4 h-4" /> {text.team.badge}
          </span>
          <h2 id="team-preview-heading" className="text-3xl sm:text-4xl font-bold text-text mb-4">
            {text.team.title}
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">{text.team.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="card-friendly p-6 text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={`${member.name} profilová fotografia`}
                  width={96}
                  height={96}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg text-text mb-1">{member.name}</h3>
              <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
              <p className="text-sm text-text-muted">{member.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/o-nas" className="btn-secondary">
            {text.team.meetTeam} →
          </Link>
        </div>
      </div>
    </section>
  );
}
