import { Promotion } from "@/lib/models/Promotion";
import { getPlaceholderImage } from "@/lib/images";

const mockPromotions: Promotion[] = [
  {
    _id: "1",
    title: "Letná akcia na očkovanie!",
    slug: "letna-akcia-ockovanie",
    description: "Získajte zľavu 20% na všetky očkovania pre psov a mačky počas celého leta.",
    image: getPlaceholderImage(800, 400, "Letná akcia"),
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    isActive: true,
    discount: "20% zľava",
    terms: "Platí len pre nové očkovania. Neplatí v kombinácii s inými akciami.",
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15"),
  },
  {
    _id: "2",
    title: "Deň otvorených dverí",
    slug: "den-otvorenych-dveri",
    description: "Príďte sa pozrieť na našu kliniku a spoznajte náš tím. Čaká na vás bohatý program a darčeky!",
    image: getPlaceholderImage(800, 400, "Deň otvorených dverí"),
    startDate: new Date("2024-07-20"),
    endDate: new Date("2024-07-20"),
    isActive: true,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
];

export async function getAllPromotions(): Promise<Promotion[]> {
  const now = new Date();
  return new Promise((resolve) => {
    setTimeout(() => {
      const active = mockPromotions.filter(
        (p) =>
          p.isActive &&
          p.startDate <= now &&
          (!p.endDate || p.endDate >= now)
      );
      resolve(active);
    }, 100);
  });
}

export async function getPromotionBySlug(slug: string): Promise<Promotion | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const promotion = mockPromotions.find((p) => p.slug === slug);
      resolve(promotion || null);
    }, 100);
  });
}




