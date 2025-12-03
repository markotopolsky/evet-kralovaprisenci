import { Banner } from "@/lib/models/Banner";

const mockBanners: Banner[] = [
  {
    _id: "banner1",
    title: "Letná akcia na očkovanie!",
    description: "Získajte zľavu 20% na všetky očkovania pre psov a mačky počas celého leta.",
    imageUrl: "/images/banner-summer-vaccine.jpg",
    link: "/promotions",
    startDate: new Date("2024-06-01T00:00:00Z"),
    endDate: new Date("2024-08-31T23:59:59Z"),
    isActive: true,
  },
  {
    _id: "banner2",
    title: "Nová služba: Domáce návštevy veterinára",
    description: "Pre maximálne pohodlie vášho miláčika ponúkame veterinárne návštevy priamo u vás doma.",
    imageUrl: "/images/banner-home-visit.jpg",
    link: "/services/domace-navstevy",
    startDate: new Date("2024-05-15T00:00:00Z"),
    isActive: true,
  },
];

export async function getAllBanners(): Promise<Banner[]> {
  const now = new Date();
  return new Promise((resolve) => {
    setTimeout(() => {
      const activeBanners = mockBanners.filter(
        (banner) =>
          banner.isActive &&
          banner.startDate <= now &&
          (!banner.endDate || banner.endDate >= now)
      );
      resolve(activeBanners);
    }, 100);
  });
}

export async function getActiveBanners(): Promise<Banner[]> {
  return getAllBanners();
}

