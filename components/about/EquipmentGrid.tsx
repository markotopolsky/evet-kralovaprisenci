"use client";

import {
  Activity,
  Zap,
  Monitor,
  Smile,
  Beaker,
  Wind,
  RefreshCw,
  Heart,
  Droplet,
  Shield,
  BarChart3,
  Shuffle,
  Thermometer,
  Syringe,
  Eye,
  CircleDot,
  LifeBuoy,
  Gauge,
  Flashlight,
  Stethoscope,
  Waves,
  LucideIcon,
} from "lucide-react";

interface Equipment {
  title: string;
  description: string;
  icon: LucideIcon;
}

const equipment: Equipment[] = [
  {
    title: "USG prístroj",
    description:
      "Moderný ultrazvuk využíva zvukové vlny na živé obrazy orgánov, ciev a tkanív. Rýchle, neinvazívne vyšetrenie brušnej dutiny, srdca či gravidity bez anestézie.",
    icon: Waves,
  },
  {
    title: "Bezkrvavá chirurgia s elektrokauterom Diatermo GIMA",
    description:
      "Elektrokauter reže a koaguluje zároveň, minimalizuje krvácanie a skracuje zákrok. Zvyšuje presnosť chirurgických výkonov a urýchľuje hojenie.",
    icon: Zap,
  },
  {
    title: "Mikroskop s LCD obrazovkou",
    description:
      "Digitálny mikroskop na cytológiu krvi, moču či biopsií. LCD zdieľa obraz so spolupracovníkmi aj majiteľmi, čím zvyšuje transparentnosť diagnostiky.",
    icon: Monitor,
  },
  {
    title: "Dentálny prístroj",
    description:
      "Ultrazvukový scaler, leštička a nástroje na zubný kameň a extrakcie. Šetrné čistenie pod anestéziou predchádza parodontitíde a zápachu.",
    icon: Smile,
  },
  {
    title: "Biochemický analyzátor Catalyst One",
    description:
      "Komplexné chemické profily s výsledkami za pár minút. CLIP kazety znižujú interferencie a zvyšujú presnosť pre flexibilné kombinácie testov.",
    icon: Beaker,
  },
  {
    title: "Sterilizácia nástrojov teplým vzduchom",
    description:
      "Suchovzdušný sterilizátor ničí baktérie, vírusy a spóry bez chemikálií. Predlžuje životnosť kovových a sklenených nástrojov a zaručuje hygienu.",
    icon: Wind,
  },
  {
    title: "Centrifúga vzoriek",
    description:
      "Rýchle odstreďovanie skúmaviek oddeľuje sérum, plazmu či sedimenty. Kľúčové pre presnosť biochemických a hematologických testov.",
    icon: RefreshCw,
  },
  {
    title: "Anesteziologický prístroj s riadenou ventiláciou",
    description:
      "Ventilátor presne dávkuje anestetické plyny a kyslík, monitoruje dychové parametre a udržiava stabilnú anestéziu počas operácie.",
    icon: Activity,
  },
  {
    title: "Vyšetrenie krvných skupín a zrážanlivosti",
    description:
      "Koagulačné analyzátory hodnotia kompatibilitu krvi a parametre zrážania (PT, APTT). Nevyhnutné pred transfúziou a chirurgiou.",
    icon: Droplet,
  },
  {
    title: "Biochemické vyšetrenie krvi",
    description:
      "Laboratórne testy merajú enzýmy, elektrolyty, glukózu a ďalšie metabolity. Pomáhajú hodnotiť pečeň, obličky, pankreas a endokrinný systém.",
    icon: CircleDot,
  },
  {
    title: "Imunochemické vyšetrenie krvi",
    description:
      "Citlivé analýzy na hormóny, protilátky a antigény. Diagnostika infekcií, alergií či hormonálnych porúch s rýchlymi výsledkami.",
    icon: Shield,
  },
  {
    title: "Monitor životných funkcií",
    description:
      "Sleduje srdcový rytmus, tlak, saturáciu a teplotu v reálnom čase. Okamžitá reakcia na zmeny počas anestézie alebo hospitalizácie.",
    icon: Heart,
  },
  {
    title: "Hematologický analyzátor ProCyte Dx",
    description:
      "Kompletný krvný obraz (CBC) s 27 parametrami za ~2 minúty. Laserová cytometria a veterinárne algoritmy pre presné výsledky.",
    icon: BarChart3,
  },
  {
    title: "Rocker Tube – premiešavač vzoriek",
    description:
      "Jemné kývanie skúmaviek pre rovnomerné premiešanie s antikoagulantom. Zabraňuje zrazeninám a zlepšuje presnosť testov.",
    icon: Shuffle,
  },
  {
    title: "Vyhrievací prístroj počas anestézie",
    description:
      "Vyhrievané podložky alebo teplý vzduch udržiavajú telesnú teplotu. Znižuje pooperačné komplikácie a urýchľuje prebúdzanie.",
    icon: Thermometer,
  },
  {
    title: "Infúzna pumpa",
    description:
      "Presne kontrolované podávanie tekutín, liečiv či anestetík. Kľúčové pre intenzívnu starostlivosť a bezpečnú anestéziu.",
    icon: Syringe,
  },
  {
    title: "Refraktometer pre analýzu moču",
    description:
      "Optický refraktometer meria hustotu moču z malého objemu. Hodnotí hydratáciu a funkciu obličiek s rýchlym výsledkom.",
    icon: Eye,
  },
  {
    title: "Koprologické a urinálne vyšetrenie",
    description:
      "Analýza stolice a moču odhaľuje parazity, infekcie či metabolické poruchy. Včas zachytáva ochorenia tráviaceho a vylučovacieho traktu.",
    icon: Stethoscope,
  },
  {
    title: "Kyslíkový koncentrátor",
    description:
      "Koncentrátor zvyšuje podiel kyslíka odstránením dusíka zo vzduchu. Stabilný prísun kyslíka pri anestézii aj respiračných ochoreniach.",
    icon: LifeBuoy,
  },
  {
    title: "Tlakomer",
    description:
      "Digitálny tlakomer meria systolický a diastolický tlak. Dôležitý pri anestézii aj prevencii – zachytí hypertenziu či hypotenziu.",
    icon: Gauge,
  },
  {
    title: "Chirurgický a terapeutický laser",
    description:
      "Laser umožňuje bezkrvné rezy a terapeutické ošetrenie. Minimalizuje bolesť, opuch a urýchľuje hojenie pri zákrokoch aj chronických stavoch.",
    icon: Flashlight,
  },
];

export function EquipmentGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="card-friendly p-6">
            <div className="w-14 h-14 bg-[#3C8C80]/10 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-7 h-7 text-[#3C8C80]" />
            </div>
            <h3 className="font-semibold text-lg text-[#2A2A2A] mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-[#5C5C5C]">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}



