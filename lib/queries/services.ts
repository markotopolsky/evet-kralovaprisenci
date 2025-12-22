import { Service } from "@/lib/models/Service";
import { getPlaceholderImage } from "@/lib/images";

const mockServices: Service[] = [
  {
    _id: "1",
    title: "Interná medicína",
    slug: "interna-medicina",
    shortDescription: "Komplexné vyšetrenia a diagnostika vnútorných ochorení vášho miláčika.",
    fullDescription: "Interná medicína je základom veterinárnej starostlivosti. Naši veterinári vykonávajú dôkladné fyzikálne vyšetrenia, hodnotia vitálne funkcie a v prípade potreby ordinujú diagnostické testy. Zameriavame sa na prevenciu, včasnú diagnostiku a liečbu vnútorných ochorení.",
    icon: "stethoscope",
    image: getPlaceholderImage(800, 600, "Interná medicína"),
    price: "Od 25€",
    duration: "30-45 min",
    featured: true,
    order: 1,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "2",
    title: "Krvné vyšetrenia",
    slug: "krvne-vysetrenia",
    shortDescription: "Hematológia, biochémia a mikroskopia na počkanie pre rýchlu diagnostiku.",
    fullDescription: "Komplexný obraz o zdravotnom stave zvieraťa poskytuje analýza krvi. Hematologické vyšetrenie skúma biele a červené krvinky; biochemické vyšetrenie sleduje biomarkery funkcie orgánov a ukazuje, ktorý orgán je postihnutý. Výsledky sa porovnávajú s referenčnými hodnotami, aby sme odhalili odchýlky, a niekedy je potrebné test opakovať kvôli dynamike biomarkerov. Mikroskopické vyšetrenie krvného náteru okamžite odhalí zmeny v morfológii buniek. Vlastné laboratórium nám umožňuje spracovať hematologické, biochemické a mikroskopické vyšetrenia na počkanie, takže diagnóza a liečba môžu začať bez zbytočných odkladov.",
    icon: "droplet",
    image: getPlaceholderImage(800, 600, "Krvné vyšetrenia"),
    price: "Od 35€",
    duration: "15-30 min",
    featured: true,
    order: 2,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "3",
    title: "USG vyšetrenie",
    slug: "usg-vysetrenie",
    shortDescription: "Nehlučné zobrazenie vnútorných orgánov pomocou ultrazvuku.",
    fullDescription: "Ultrazvuk vysiela zvukové vlny do tela a vytvára reálne časové snímky vnútorných štruktúr. Je rýchly, neinvazívny a umožňuje veterinárovi odhaliť blokády, nádory alebo tehotenstvo. V urgentných situáciách sa sústreďujeme na brucho alebo hrudník, aby sme zistili vnútorné krvácanie alebo pneumotorax, a echokardiogramy posudzujú funkciu srdca. Ultrazvukom navádzané biopsie umožňujú odobrať vzorku tkaniva bez nutnosti otvorenej operácie. Vďaka našej modernej sonografii dostanete presnú diagnózu a cielenú terapiu.",
    icon: "waves",
    image: getPlaceholderImage(800, 600, "USG vyšetrenie"),
    price: "Od 45€",
    duration: "20-40 min",
    featured: true,
    order: 3,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "4",
    title: "RTG diagnostika",
    slug: "rtg-diagnostika",
    shortDescription: "Digitálna rádiografia s vysokým rozlíšením pre presnú diagnostiku.",
    fullDescription: "Digitálne röntgenové prístroje okamžite vytvoria vysoko kvalitné snímky kostí a mäkkých tkanív. Pomáhajú identifikovať zlomeniny, poškodenia kostí, zväčšenie orgánov, cudzie telesá, nádory, posúdiť kĺby a sledovať choroby srdca či pľúc. Výhodou digitálnej rádiografie sú okamžité výsledky, nízka dávka žiarenia a možnosť jednoduchého zdieľania snímok so špecialistami. Naše RTG pracovisko je ekologické, bezpečné a minimalizuje stres zvieraťa počas vyšetrenia.",
    icon: "bone",
    image: getPlaceholderImage(800, 600, "RTG diagnostika"),
    price: "Od 40€",
    duration: "15-30 min",
    featured: true,
    order: 4,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "5",
    title: "Chirurgia",
    slug: "chirurgia",
    shortDescription: "Precízne mäkkotkanivové aj ortopedické zákroky pre zdravie vášho miláčika.",
    fullDescription: "Náš chirurgický tím vykonáva široké spektrum mäkkotkanivových aj ortopedických operácií. Medzi bežné mäkkotkanivové zákroky patrí kastrácia, odstránenie nádorov, vyberanie cudzích telies, oprava prietrže, splenektómia, cystotómia, manažment rán a ošetrenie úrazov. Ortopedické operácie zahŕňajú operáciu dysplázie bedrového kĺbu, rekonštrukciu predného skríženého väzu, korekciu luxácie pately či chirurgiu medzistavcových platničiek. Využívame moderné anestetické postupy, dôslednú monitoráciu a individuálne pooperačné plány na rýchle a bezpečné zotavenie.",
    icon: "bandage",
    image: getPlaceholderImage(800, 600, "Chirurgia"),
    price: "Od 80€",
    duration: "Podľa typu zákroku",
    featured: true,
    order: 5,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "6",
    title: "Plastika podnebia",
    slug: "plastika-podnebia",
    shortDescription: "Riešenie BOAS syndrómu pre brachycefalické plemená (buldoček, mops).",
    fullDescription: "Krátkohlavé plemená (buldoček, mops a iné) trpia Brachycephalic Obstructive Airway Syndrome (BOAS), ktorý sa prejavuje hlučným dýchaním, chrápaním, intoleranciou námahy, dávivým reflexom a modraním slizníc. Chirurgická korekcia zahŕňa rozšírenie zúžených nozdrín, skrátenie predĺženého mäkkého podnebia a odstránenie prevrátených laryngeálnych vakov. V rámci komplexného balíka sú zahrnuté krvné testy, RTG hrudníka, samotný zákrok a 24‑hodinová hospitalizácia. Predoperačné vyšetrenie je nevyhnutné, pretože brachycefalické plemená sú citlivé na anestéziu. Po zákroku sa zvieratá ľahšie nadýchajú, majú viac energie a dlhodobo sa im zlepší kvalita života.",
    icon: "dog",
    image: getPlaceholderImage(800, 600, "Plastika podnebia"),
    price: "Od 350€",
    duration: "1-2 hodiny + hospitalizácia",
    featured: false,
    order: 6,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "7",
    title: "Dentálna hygiena",
    slug: "dentalna-hygiena",
    shortDescription: "Profesionálna starostlivosť o chrup vrátane čistenia a extrakcie zubov.",
    fullDescription: "Zdravé zuby a ďasná sú základom celkového zdravia. Profesionálna dentálna hygiena prebieha v celkovej anestézii, aby bolo možné bezpečne a dôkladne preskúmať celý chrup, odstrániť zubný kameň a plak nad i pod líniou ďasien a vyhladiť povrch zubov leštením. Veterinár zmeria hĺbku parodontálnych vačkov a v prípade potreby extrahuje choré zuby. Domáce odstraňovanie zubného kameňa nie je bezpečné ani efektívne – odstráni len viditeľný kameň a môže poškodiť sklovinu. Pred zákrokom sa vykonávajú predanestetické testy a po ňom je dôležitá pravidelná domáca starostlivosť, pretože plak sa tvorí už hodiny po čistení. Naša dentálna hygiena eliminuje zápach, zápal ďasien a riziko systémových komplikácií.",
    icon: "smile",
    image: getPlaceholderImage(800, 600, "Dentálna hygiena"),
    price: "Od 70€",
    duration: "30-60 min",
    featured: true,
    order: 7,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "8",
    title: "PHOVIA svetelná terapia",
    slug: "phovia-terapia",
    shortDescription: "Urýchlenie hojenia kože pomocou fluorescenčnej svetelnej energie.",
    fullDescription: "PHOVIA využíva fluorescenčnú svetelnú energiu (FLE) na podporu regenerácie kože pri hot spotoch, uhryznutiach, ranách, lízavých léziách, traumatických poraneniach, infekciách kože a pooperačných rezoch. Terapia kombinuje LED lampu s chromofórovým gélom; fotobiomodulácia zvyšuje produkciu ATP a stimuluje rastové faktory (EGF, VEGF, FGFs, TGF‑β, kolagén), čím znižuje zápal, zlepšuje prietok krvi a posilňuje imunitu. Ošetrenie je rýchle, neinvazívne a urýchľuje regeneráciu kože až dvojnásobne; zvieratá potrebujú menej liekov a sú spokojnejšie.",
    icon: "sun",
    image: getPlaceholderImage(800, 600, "PHOVIA terapia"),
    price: "Od 30€",
    duration: "15-20 min",
    featured: false,
    order: 8,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "9",
    title: "Hospitalizácia 24H",
    slug: "hospitalizacia",
    shortDescription: "Nepretržitá starostlivosť a monitoring pre pacientov vyžadujúcich intenzívnu starostlivosť.",
    fullDescription: "Pri hospitalizácii sú zvieratá umiestnené v jednotlivých klietkach s potravou, vodou a pohodlným vybavením. Na 24‑hodinových pracoviskách sú lekári a sestry k dispozícii neustále; pacienti sa kontrolujú každú hodinu, sledujú sa vitálne funkcie, podávajú sa lieky a vykonávajú terapie. Zvieratá sú venčené, kŕmené, maznané, čistené a monitorované; personál sa o ne stará ako o vlastné a lekár je v prípade potreby na telefóne. Stála prítomnosť odborného personálu umožňuje rýchlu reakciu a maximalizuje šance na úspešné zotavenie.",
    icon: "hospital",
    image: getPlaceholderImage(800, 600, "Hospitalizácia 24H"),
    price: "Od 50€/deň",
    duration: "Podľa potreby",
    featured: false,
    order: 9,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "10",
    title: "Pohotovosť",
    slug: "pohotovost",
    shortDescription: "Urgentná a kritická starostlivosť pre akútne život ohrozujúce stavy.",
    fullDescription: "Naša pohotovosť je pripravená na akútne život ohrozujúce stavy. Disponujeme vybavením a skúsenosťami na zvládnutie ťažkých respiračných problémov, záchvatov, otráv, kolapsu, vážnych úrazov, nemožnosti močiť, opakovaného vracania, poranení očí či komplikovaného pôrodu. Medzi ďalšie varovné signály patria silné vracanie alebo hnačka, bledé sliznice, nafúknuté brucho, ťažká apatia alebo výrazná bolesť. Odporúčame zavolať vopred, aby sa tím pripravil; pri príchode prebehne triáž, takže najťažšie prípady ošetríme prednostne. Poskytujeme tiež rady na bezpečný transport a záchranu zvieraťa počas presunu.",
    icon: "ambulance",
    image: getPlaceholderImage(800, 600, "Pohotovosť"),
    price: "Podľa zákroku",
    duration: "24/7",
    featured: true,
    order: 10,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "11",
    title: "Predaj krmív a doplnkov",
    slug: "krmiva-doplnky",
    shortDescription: "Individualizovaná výživa a veterinárne diéty pre zdravie vášho miláčika.",
    fullDescription: "Správna výživa je základom zdravia. Kvalitné krmivá sú vyvážené tak, aby podporovali metabolizmus a imunitný systém a dodávali esenciálne živiny v každej životnej fáze. Veterinárne (predpisové) diéty obsahujú špeciálne ingrediencie a doplnky pre zvieratá s konkrétnymi chorobami; odporúčajú sa pri ochoreniach močových ciest, obličiek, tráviacich problémoch, potravinových alergiách, artritíde alebo cukrovke. Napríklad diéty pre choré obličky sú stredne bohaté na kvalitné bielkoviny, majú nízky obsah fosforu a sodíka a obsahujú omega‑3 mastné kyseliny, aminokyseliny, vitamíny, minerály a antioxidanty na podporu funkcie obličiek. Niektoré diéty využívajú nové zdroje bielkovín alebo hydrolyzované proteíny na zvládnutie potravinových alergií. Takéto krmivá zmierňujú príznaky, spomaľujú progresiu ochorení a znižujú riziko komplikácií. Naši veterinári vám pomôžu vybrať vhodné krmivo a výživové doplnky presne pre potreby vášho zvieraťa.",
    icon: "shopping-bag",
    image: getPlaceholderImage(800, 600, "Predaj krmív"),
    price: "Podľa produktu",
    duration: "-",
    featured: false,
    order: 11,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "12",
    title: "Konzultácie",
    slug: "konzultacie",
    shortDescription: "Osobné poradenstvo, prevencia a individuálny plán starostlivosti.",
    fullDescription: "Pravidelné konzultácie umožňujú včas odhaliť zdravotné problémy a znížiť riziko komplikácií. Počas prehliadky veterinár vykoná dôkladné fyzikálne vyšetrenie, zhodnotí vitálne funkcie a v prípade potreby spraví diagnostické testy. Diskutujeme o preventívnych opatreniach, vakcinácii, ochrane proti parazitom, preventívnej starostlivosti o srdce a dentálnej hygiene. Na základe veku, plemena, životného štýlu a zdravotných rizík zostavujeme individuálny plán starostlivosti. Konzultácie zahŕňajú aj kontrolu hmotnosti a výživové odporúčania, vyšetrenie zubov s návrhom domácich postupov a posúdenie správania, aby sme odhalili možné zdravotné alebo psychické problémy. Cieľom je poskytnúť majiteľovi jasné informácie a dlhodobú podporu pre zdravý a šťastný život jeho zvieraťa.",
    icon: "message-circle",
    image: getPlaceholderImage(800, 600, "Konzultácie"),
    price: "Od 20€",
    duration: "30-45 min",
    featured: true,
    order: 12,
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

export type AdjacentServices = {
  prev: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
};

export async function getAdjacentServices(currentSlug: string): Promise<AdjacentServices> {
  const services = await getAllServices();
  const currentIndex = services.findIndex((s) => s.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 
    ? { title: services[currentIndex - 1].title, slug: services[currentIndex - 1].slug }
    : null;
  
  const next = currentIndex < services.length - 1
    ? { title: services[currentIndex + 1].title, slug: services[currentIndex + 1].slug }
    : null;

  return { prev, next };
}




