import { Service } from "@/lib/models/Service";
import { getPlaceholderImage } from "@/lib/images";

const mockServices: Service[] = [
  {
    _id: "1",
    title: "Preventívne prehliadky",
    slug: "preventivne-prehliadky",
    shortDescription: "Kompletné zdravotné prehliadky pre udržanie zdravia vášho miláčika.",
    fullDescription: "Pravidelné preventívne prehliadky sú základom zdravia vášho domáceho miláčika. Počas prehliadky skontrolujeme celkový zdravotný stav, hmotnosť, stav zubov, srsť a vnútorné orgány. Odporúčame preventívne prehliadky minimálne raz ročne pre mladé zvieratá a dvakrát ročne pre seniorné zvieratá.",
    icon: "🩺",
    image: getPlaceholderImage(800, 600, "Preventívne prehliadky"),
    price: "Od 25€",
    duration: "30-45 min",
    featured: true,
    order: 1,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "2",
    title: "Vakcinácia",
    slug: "vakcinacia",
    shortDescription: "Očkovanie proti infekčným ochoreniam a besnote podľa očkovacieho kalendára.",
    fullDescription: "Vakcinácia chráni vaše zvieratá pred nebezpečnými infekčnými ochoreniami. Ponúkame kompletný vakcinačný program pre psov a mačky vrátane povinného očkovania proti besnote. Všetky vakcíny sú registrované a používame len kvalitné preparáty od overených výrobcov.",
    icon: "💉",
    image: getPlaceholderImage(800, 600, "Vakcinácia"),
    price: "Od 28€",
    duration: "15-20 min",
    featured: true,
    order: 2,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "3",
    title: "Chirurgia",
    slug: "chirurgia",
    shortDescription: "Chirurgické zákroky vrátane kastrácie, sterilizácie a pohotovostných operácií.",
    fullDescription: "Naša klinika disponuje moderným operačným sálom pre rôzne chirurgické zákroky. Vykonávame rutinné operácie ako kastrácia a sterilizácia, ale aj náročnejšie zákroky. Všetky operácie sa vykonávajú v celkovej anestézii s monitorovaním životných funkcií.",
    icon: "🏥",
    image: getPlaceholderImage(800, 600, "Chirurgia"),
    price: "Od 50€",
    duration: "Podľa typu zákroku",
    featured: true,
    order: 3,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "4",
    title: "Stomatológia",
    slug: "stomatologia",
    shortDescription: "Dentálna starostlivosť vrátane čistenia zubov a extrakcie zubov.",
    fullDescription: "Zdravé zuby sú dôležité pre celkové zdravie vášho miláčika. Ponúkame profesionálne čistenie zubov ultrazvukovým skalérom, extrakciu poškodených zubov a liečbu zubných ochorení. Všetky zákroky sa vykonávajú v anestézii pre pohodlie zvieraťa.",
    icon: "🦷",
    image: getPlaceholderImage(800, 600, "Stomatológia"),
    price: "Od 70€",
    duration: "30-60 min",
    featured: true,
    order: 4,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "5",
    title: "Diagnostika",
    slug: "diagnostika",
    shortDescription: "Ultrazvuk, RTG, laboratórne vyšetrenia krvi a moču.",
    fullDescription: "Disponujeme modernými diagnostickými prístrojmi pre presnú diagnostiku. Vykonávame ultrazvukové vyšetrenia vnútorných orgánov, RTG snímky kostí a klbov, a kompletnú laboratórnu diagnostiku krvi a moču. Všetky vyšetrenia sa vykonávajú priamo na klinike.",
    icon: "🔬",
    image: getPlaceholderImage(800, 600, "Diagnostika"),
    price: "Od 30€",
    duration: "Podľa typu vyšetrenia",
    featured: false,
    order: 5,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "6",
    title: "Domáce návštevy",
    slug: "domace-navstevy",
    shortDescription: "Veterinárne návštevy priamo u vás doma pre maximálne pohodlie.",
    fullDescription: "Pre maximálne pohodlie vášho miláčika ponúkame veterinárne návštevy priamo u vás doma. Ideálne pre zvieratá, ktoré sa boja cestovania alebo pre majiteľov s obmedzenou pohyblivosťou. Počas návštevy môžeme vykonať základné vyšetrenie, vakcináciu alebo poskytnúť odbornú radu.",
    icon: "🏠",
    image: getPlaceholderImage(800, 600, "Domáce návštevy"),
    price: "Od 50€",
    duration: "30-45 min",
    featured: false,
    order: 6,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export async function getAllServices(): Promise<Service[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockServices.sort((a, b) => a.order - b.order));
    }, 100);
  });
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = mockServices.find((s) => s.slug === slug);
      resolve(service || null);
    }, 100);
  });
}

export async function getFeaturedServices(limit = 6): Promise<Service[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = mockServices
        .filter((s) => s.featured)
        .sort((a, b) => a.order - b.order)
        .slice(0, limit);
      resolve(featured);
    }, 100);
  });
}



