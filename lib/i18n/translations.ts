interface TranslationSchema {
  nav: {
    home: string;
    services: string;
    about: string;
    animals: string;
    blog: string;
    promotions: string;
    callUs: string;
    bookOnline: string;
    book: string;
  };
  infoBar: {
    open: string;
    closed: string;
    today: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    bookAppointment: string;
    modernEquipment: string;
    experiencedTeam: string;
    individualCare: string;
  };
  hours: {
    title: string;
    monWed: string;
    tueThuFri: string;
    saturday: string;
    sunday: string;
  };
  cards: {
    openingHours: string;
    findUs: string;
    showOnMap: string;
    contact: string;
    onlineBooking: string;
    bookComfortably: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    allServices: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    moreAbout: string;
    modernClinic: string;
    modernClinicDesc: string;
    experiencedTeam: string;
    experiencedTeamDesc: string;
    individualCare: string;
    individualCareDesc: string;
    flexibleHours: string;
    flexibleHoursDesc: string;
    yearsExperience: string;
    happyClients: string;
    rating: string;
  };
  team: {
    badge: string;
    title: string;
    subtitle: string;
    meetTeam: string;
  };
  blog: {
    badge: string;
    title: string;
    subtitle: string;
    allArticles: string;
    minRead: string;
  };
  reviews: {
    badge: string;
    title: string;
    basedOn: string;
    reviewsCount: string;
    viewAllGoogle: string;
  };
  contactCta: {
    title: string;
    subtitle: string;
    call: string;
  };
  map: {
    title: string;
    subtitle: string;
    navigate: string;
    call: string;
  };
  footer: {
    services: string;
    information: string;
    contact: string;
    openingHours: string;
    allRightsReserved: string;
    preventiveExams: string;
    vaccination: string;
    surgery: string;
    dentistry: string;
    equipment: string;
    gallery: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
    ourServices: string;
  };
  common: {
    loading: string;
    readMore: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  sk: {
    nav: {
      home: "Domov",
      services: "Služby",
      about: "O nás",
      animals: "Vaše zvieratko",
      blog: "Blog",
      promotions: "Akcie",
      callUs: "Zavolajte nám",
      bookOnline: "Objednať sa online",
      book: "Objednať sa",
    },
    infoBar: {
      open: "Otvorené",
      closed: "Zatvorené",
      today: "Dnes",
    },
    hero: {
      badge: "Profesionálna veterinárna starostlivosť",
      title: "Starostlivosť o vaše",
      titleHighlight: "miláčiky",
      titleEnd: "s láskou a odbornosťou",
      bookAppointment: "Objednať termín",
      modernEquipment: "Moderné vybavenie",
      experiencedTeam: "Skúsený tím",
      individualCare: "Individuálny prístup",
    },
    hours: {
      title: "Otváracie hodiny",
      monWed: "Po, St",
      tueThuFri: "Ut, Št, Pi",
      saturday: "Sobota",
      sunday: "Nedeľa",
    },
    cards: {
      openingHours: "Otváracie hodiny",
      findUs: "Kde nás nájdete",
      showOnMap: "Zobraziť na mape",
      contact: "Kontakt",
      onlineBooking: "Online objednávka",
      bookComfortably: "Objednajte sa pohodlne online",
    },
    services: {
      badge: "Naše služby",
      title: "Kompletná veterinárna starostlivosť",
      subtitle: "Ponúkame širokú škálu veterinárnych služieb od preventívnych prehliadok cez vakcináciu až po špecializované chirurgické zákroky.",
      allServices: "Všetky služby",
    },
    about: {
      badge: "O našej klinike",
      title: "Profesionálna starostlivosť pre vaše štvornohé priateľe",
      description: "Naša veterinárna klinika poskytuje komplexnú starostlivosť pre psov, mačky a ďalšie domáce miláčiky už viac ako 15 rokov. Veríme, že každé zviera si zaslúži tú najlepšiu starostlivosť, a preto neustále rozvíjame naše znalosti a modernizujeme vybavenie.",
      moreAbout: "Viac o nás",
      modernClinic: "Moderná klinika",
      modernClinicDesc: "Disponujeme najmodernejším vybavením pre diagnostiku a liečbu.",
      experiencedTeam: "Skúsený tím",
      experiencedTeamDesc: "Náš tím tvoria skúsení veterinári s mnohoročnou praxou.",
      individualCare: "Individuálna starostlivosť",
      individualCareDesc: "Ku každému pacientovi pristupujeme individuálne a s láskou.",
      flexibleHours: "Flexibilné ordinačné hodiny",
      flexibleHoursDesc: "Sme tu pre vás v pracovných dňoch aj v sobotu.",
      yearsExperience: "Rokov skúseností",
      happyClients: "Spokojných klientov",
      rating: "Hodnotenie",
    },
    team: {
      badge: "Náš tím",
      title: "Zoznámte sa s našimi odborníkmi",
      subtitle: "Náš tím tvoria skúsení veterinári a zdravotnícky personál, ktorí pristupujú ku každému pacientovi s láskou a profesionalitou.",
      meetTeam: "Spoznajte celý tím",
    },
    blog: {
      badge: "Blog",
      title: "Rady a tipy pre vaše miláčiky",
      subtitle: "Prečítajte si naše články o starostlivosti o zvieratá, prevencii chorôb a zaujímavosti zo sveta veterinárnej medicíny.",
      allArticles: "Všetky články",
      minRead: "min čítania",
    },
    reviews: {
      badge: "Recenzie",
      title: "Čo hovoria naši klienti",
      basedOn: "na základe",
      reviewsCount: "recenzií",
      viewAllGoogle: "Zobraziť všetky recenzie na Google",
    },
    contactCta: {
      title: "Máte otázky?",
      subtitle: "Neváhajte nás kontaktovať alebo sa objednajte online. Radi vám poradíme so starostlivosťou o vášho miláčika.",
      call: "Zavolať",
    },
    map: {
      title: "Kde nás nájdete",
      subtitle: "Navštívte nás osobne v našej klinike",
      navigate: "Navigovať",
      call: "Zavolať",
    },
    footer: {
      services: "Služby",
      information: "Informácie",
      contact: "Kontakt",
      openingHours: "Otváracie hodiny",
      allRightsReserved: "Všetky práva vyhradené",
      preventiveExams: "Preventívne prehliadky",
      vaccination: "Vakcinácia",
      surgery: "Chirurgia",
      dentistry: "Stomatológia",
      equipment: "Vybavenie",
      gallery: "Galéria",
    },
    notFound: {
      title: "Stránka nenájdená",
      description: "Je nám ľúto, ale stránka, ktorú hľadáte, neexistuje alebo bola presunutá.",
      backHome: "Späť na úvodnú stránku",
      ourServices: "Naše služby",
    },
    common: {
      loading: "Načítava sa...",
      readMore: "Čítať viac",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      services: "Leistungen",
      about: "Über uns",
      animals: "Ihr Haustier",
      blog: "Blog",
      promotions: "Aktionen",
      callUs: "Rufen Sie uns an",
      bookOnline: "Online buchen",
      book: "Termin buchen",
    },
    infoBar: {
      open: "Geöffnet",
      closed: "Geschlossen",
      today: "Heute",
    },
    hero: {
      badge: "Professionelle tierärztliche Versorgung",
      title: "Fürsorge für Ihre",
      titleHighlight: "Lieblinge",
      titleEnd: "mit Liebe und Fachwissen",
      bookAppointment: "Termin buchen",
      modernEquipment: "Moderne Ausstattung",
      experiencedTeam: "Erfahrenes Team",
      individualCare: "Individuelle Betreuung",
    },
    hours: {
      title: "Öffnungszeiten",
      monWed: "Mo, Mi",
      tueThuFri: "Di, Do, Fr",
      saturday: "Samstag",
      sunday: "Sonntag",
    },
    cards: {
      openingHours: "Öffnungszeiten",
      findUs: "So finden Sie uns",
      showOnMap: "Auf Karte anzeigen",
      contact: "Kontakt",
      onlineBooking: "Online-Buchung",
      bookComfortably: "Buchen Sie bequem online",
    },
    services: {
      badge: "Unsere Leistungen",
      title: "Umfassende tierärztliche Versorgung",
      subtitle: "Wir bieten ein breites Spektrum an tierärztlichen Leistungen von Vorsorgeuntersuchungen über Impfungen bis hin zu spezialisierten chirurgischen Eingriffen.",
      allServices: "Alle Leistungen",
    },
    about: {
      badge: "Über unsere Klinik",
      title: "Professionelle Betreuung für Ihre vierbeinigen Freunde",
      description: "Unsere Tierklinik bietet seit über 15 Jahren umfassende Betreuung für Hunde, Katzen und andere Haustiere. Wir glauben, dass jedes Tier die beste Pflege verdient, deshalb entwickeln wir unser Wissen ständig weiter und modernisieren unsere Ausstattung.",
      moreAbout: "Mehr über uns",
      modernClinic: "Moderne Klinik",
      modernClinicDesc: "Wir verfügen über modernste Ausstattung für Diagnostik und Behandlung.",
      experiencedTeam: "Erfahrenes Team",
      experiencedTeamDesc: "Unser Team besteht aus erfahrenen Tierärzten mit langjähriger Praxis.",
      individualCare: "Individuelle Betreuung",
      individualCareDesc: "Wir behandeln jeden Patienten individuell und mit Liebe.",
      flexibleHours: "Flexible Sprechzeiten",
      flexibleHoursDesc: "Wir sind an Werktagen und samstags für Sie da.",
      yearsExperience: "Jahre Erfahrung",
      happyClients: "Zufriedene Kunden",
      rating: "Bewertung",
    },
    team: {
      badge: "Unser Team",
      title: "Lernen Sie unsere Experten kennen",
      subtitle: "Unser Team besteht aus erfahrenen Tierärzten und medizinischem Personal, die jeden Patienten mit Liebe und Professionalität behandeln.",
      meetTeam: "Das ganze Team kennenlernen",
    },
    blog: {
      badge: "Blog",
      title: "Tipps und Ratschläge für Ihre Lieblinge",
      subtitle: "Lesen Sie unsere Artikel über Tierpflege, Krankheitsprävention und Interessantes aus der Veterinärmedizin.",
      allArticles: "Alle Artikel",
      minRead: "Min. Lesezeit",
    },
    reviews: {
      badge: "Bewertungen",
      title: "Was unsere Kunden sagen",
      basedOn: "basierend auf",
      reviewsCount: "Bewertungen",
      viewAllGoogle: "Alle Bewertungen auf Google ansehen",
    },
    contactCta: {
      title: "Haben Sie Fragen?",
      subtitle: "Zögern Sie nicht, uns zu kontaktieren oder online zu buchen. Wir beraten Sie gerne zur Pflege Ihres Lieblings.",
      call: "Anrufen",
    },
    map: {
      title: "So finden Sie uns",
      subtitle: "Besuchen Sie uns persönlich in unserer Klinik",
      navigate: "Navigieren",
      call: "Anrufen",
    },
    footer: {
      services: "Leistungen",
      information: "Informationen",
      contact: "Kontakt",
      openingHours: "Öffnungszeiten",
      allRightsReserved: "Alle Rechte vorbehalten",
      preventiveExams: "Vorsorgeuntersuchungen",
      vaccination: "Impfungen",
      surgery: "Chirurgie",
      dentistry: "Zahnmedizin",
      equipment: "Ausstattung",
      gallery: "Galerie",
    },
    notFound: {
      title: "Seite nicht gefunden",
      description: "Es tut uns leid, aber die gesuchte Seite existiert nicht oder wurde verschoben.",
      backHome: "Zurück zur Startseite",
      ourServices: "Unsere Leistungen",
    },
    common: {
      loading: "Wird geladen...",
      readMore: "Weiterlesen",
    },
  },
};

export type Language = "sk" | "de";
export type TranslationKeys = TranslationSchema;
