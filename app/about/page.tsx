import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generatePageMetadata({
  title: "O nás | Veterinárna klinika Kráľová pri Senci",
  description: "Spoznajte náš tím skúsených veterinárov a modernú veterinárnu kliniku. Poskytujeme komplexnú starostlivosť pre psov, mačky a malé zvieratá už viac ako 15 rokov.",
  path: "/about",
});

const teamMembers = [
  {
    name: "MVDr. Ján Novák",
    role: "Hlavný veterinár",
    description: "Špecialista na malé zvieratá s 15-ročnou praxou. Zameraný na internú medicínu a chirurgiu.",
    emoji: "👨‍⚕️",
  },
  {
    name: "MVDr. Anna Kováčová",
    role: "Veterinárna chirurgička",
    description: "Expertka na ortopédiu a mäkké tkanivá. Špecializuje sa na komplexné chirurgické zákroky.",
    emoji: "👩‍⚕️",
  },
  {
    name: "MVDr. Peter Horváth",
    role: "Veterinár - stomatológia",
    description: "Zameraný na dentálnu starostlivosť zvierat a preventívnu medicínu.",
    emoji: "👨‍⚕️",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "O nás", href: "/about" }]} />
      
      <section className="section-padding bg-white" aria-labelledby="about-heading">
        <div className="container-friendly">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge mb-4">ℹ️ O našej klinike</span>
              <h1
                id="about-heading"
                className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-6"
              >
                Profesionálna starostlivosť pre vaše štvornohé priateľe
              </h1>
              <p className="text-xl text-[#5C5C5C]">
                Vytvárame hlbšie, starostlivé spojenie medzi vami a vaším miláčikom už viac ako 15 rokov.
              </p>
            </div>

            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-[#5C5C5C] leading-relaxed">
                Naša veterinárna klinika {siteConfig.name} poskytuje komplexnú starostlivosť 
                pre psov, mačky a ďalšie domáce miláčiky. Veríme, že každé zviera si zaslúži 
                tú najlepšiu starostlivosť, a preto neustále rozvíjame naše znalosti a modernizujeme vybavenie.
              </p>
              <p className="text-[#5C5C5C] leading-relaxed">
                Náš tím tvoria skúsení veterinári a zdravotnícky personál, ktorí pristupujú 
                ku každému pacientovi s láskou a profesionalitou. Sme tu pre vás v pracovných 
                dňoch aj v sobotu, aby sme zabezpečili, že vaše zvieratko dostane starostlivosť, 
                ktorú potrebuje.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="card-friendly p-6 text-center">
                <p className="text-4xl font-bold text-[#3C8C80] mb-2">15+</p>
                <p className="text-sm text-[#5C5C5C]">Rokov skúseností</p>
              </div>
              <div className="card-friendly p-6 text-center">
                <p className="text-4xl font-bold text-[#3C8C80] mb-2">5000+</p>
                <p className="text-sm text-[#5C5C5C]">Spokojných klientov</p>
              </div>
              <div className="card-friendly p-6 text-center">
                <p className="text-4xl font-bold text-[#3C8C80] mb-2">3</p>
                <p className="text-sm text-[#5C5C5C]">Veterinári</p>
              </div>
              <div className="card-friendly p-6 text-center">
                <p className="text-4xl font-bold text-[#3C8C80] mb-2">4.9</p>
                <p className="text-sm text-[#5C5C5C]">Hodnotenie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F2F7F5]" aria-labelledby="team-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4">👥 Náš tím</span>
            <h2
              id="team-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Zoznámte sa s našimi odborníkmi
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="card-friendly p-6 text-center">
                <div className="w-24 h-24 bg-[#3C8C80]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-5xl">{member.emoji}</span>
                </div>
                <h3 className="font-semibold text-lg text-[#2A2A2A] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#3C8C80] font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-[#5C5C5C]">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2A2A2A] mb-4">
              Preskúmajte našu kliniku
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/about/equipment"
              className="card-friendly p-8 text-center group"
            >
              <span className="text-5xl block mb-4">🏥</span>
              <h3 className="font-semibold text-xl text-[#2A2A2A] group-hover:text-[#3C8C80] transition-colors">
                Vybavenie
              </h3>
              <p className="text-sm text-[#5C5C5C] mt-2">
                Pozrite si naše moderné vybavenie
              </p>
            </Link>
            <Link
              href="/about/gallery"
              className="card-friendly p-8 text-center group"
            >
              <span className="text-5xl block mb-4">📷</span>
              <h3 className="font-semibold text-xl text-[#2A2A2A] group-hover:text-[#3C8C80] transition-colors">
                Galéria
              </h3>
              <p className="text-sm text-[#5C5C5C] mt-2">
                Prehliadka našej kliniky
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}



