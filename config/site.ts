export const siteConfig = {
  name: "Veterinárna klinika Kráľová pri Senci",
  shortName: "Evet Kráľová",
  description: "Profesionálna veterinárna starostlivosť pre vaše domáce miláčiky. Ponúkame kompletné veterinárne služby vrátane preventívnej starostlivosti, chirurgie a stomatológie.",
  address: {
    street: "Sadová 588",
    city: "Kráľová pri Senci",
    zip: "900 50",
    country: "Slovensko",
  },
  phone: "+421 951 506 104",
  email: "info@evet-kralova.sk",
  bookingUrl: "https://booking.veclis.sk/#16d09676c862499985b93479e1a170e9",
  openingHours: {
    monday: "9:00 - 17:00",
    tuesday: "13:00 - 20:00",
    wednesday: "9:00 - 17:00",
    thursday: "13:00 - 20:00",
    friday: "13:00 - 20:00",
    saturday: "11:00 - 15:00",
    sunday: "18:00 - 20:00",
  },
  dayNames: {
    monday: "Pondelok",
    tuesday: "Utorok",
    wednesday: "Streda",
    thursday: "Štvrtok",
    friday: "Piatok",
    saturday: "Sobota",
    sunday: "Nedeľa",
  },
  dayNamesShort: {
    monday: "Po",
    tuesday: "Ut",
    wednesday: "St",
    thursday: "Št",
    friday: "Pi",
    saturday: "So",
    sunday: "Ne",
  },
  social: {
    facebook: "https://facebook.com/evet-kralova",
    instagram: "https://instagram.com/evet-kralova",
  },
  googleMaps: {
    placeId: "ChIJxxxxxxxxxx",
    reviewsUrl: "https://maps.app.goo.gl/tELRnwY2MJoLmCF28",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.8!2d17.3!3d48.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8f5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sSadov%C3%A1%20588%2C%20900%2050%20Kr%C3%A1%C4%BEov%C3%A1%20pri%20Senci!5e0!3m2!1ssk!2ssk!4v1234567890",
  },
  defaultMeta: {
    title: "Veterinárna klinika Kráľová pri Senci | Profesionálna starostlivosť pre vaše zvieratá",
    description: "Moderná veterinárna klinika s komplexnými službami pre psov, mačky a drobné cicavce. Preventívna starostlivosť, chirurgia, stomatológia a diagnostika.",
    keywords: ["veterinár", "veterinárna klinika", "Kráľová pri Senci", "starostlivosť o zvieratá", "pes", "mačka"],
  },
};

export type SiteConfig = typeof siteConfig;

export function getTodayOpeningHours(): { day: string; hours: string; isOpen: boolean } {
  const now = new Date();
  const dayIndex = now.getDay();
  
  const dayMap: Record<number, keyof typeof siteConfig.openingHours> = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };
  
  const dayKey = dayMap[dayIndex];
  const hours = siteConfig.openingHours[dayKey];
  const dayName = siteConfig.dayNames[dayKey];
  
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinutes;
  
  const [openTime, closeTime] = hours.split(" - ").map((t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  });
  
  const isOpen = currentTime >= openTime && currentTime < closeTime;
  
  return { day: dayName, hours, isOpen };
}

export function getNextOpeningInfo(): { day: string; hours: string } | null {
  const now = new Date();
  let dayIndex = now.getDay();
  
  const dayMap: Record<number, keyof typeof siteConfig.openingHours> = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };
  
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (dayIndex + i) % 7;
    const dayKey = dayMap[nextDayIndex];
    const hours = siteConfig.openingHours[dayKey];
    
    if (hours && hours !== "Zatvorené") {
      return {
        day: siteConfig.dayNames[dayKey],
        hours,
      };
    }
  }
  
  return null;
}






