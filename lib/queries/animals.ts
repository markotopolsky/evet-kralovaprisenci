import { AnimalType } from "@/lib/models/AnimalType";
import { AnimalArticle } from "@/lib/models/AnimalArticle";
import { getPlaceholderImage } from "@/lib/images";

const mockAnimalTypes: AnimalType[] = [
  {
    _id: "1",
    name: "Psy",
    slug: "psy",
    description: "Informácie o starostlivosti, zdraví a výžive psov všetkých plemien a vekových kategórií.",
    icon: "🐕",
    image: getPlaceholderImage(600, 400, "Psy"),
    order: 1,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "2",
    name: "Mačky",
    slug: "macky",
    description: "Všetko o mačkách - od starostlivosti o mačiatka až po zdravie seniorných mačiek.",
    icon: "🐱",
    image: getPlaceholderImage(600, 400, "Mačky"),
    order: 2,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "3",
    name: "Hlodavce",
    slug: "hlodavce",
    description: "Starostlivosť o králiky, morčatá, škrečky a ďalšie drobné cicavce.",
    icon: "🐹",
    image: getPlaceholderImage(600, 400, "Hlodavce"),
    order: 3,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "4",
    name: "Vtáky",
    slug: "vtaky",
    description: "Informácie o starostlivosti o okrasné vtáky a papagáje.",
    icon: "🦜",
    image: getPlaceholderImage(600, 400, "Vtáky"),
    order: 4,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

const mockAnimalArticles: AnimalArticle[] = [
  {
    _id: "1",
    title: "Ako správne kŕmiť šteňa",
    slug: "ako-spravne-krmit-stena",
    animalTypeSlug: "psy",
    excerpt: "Správna výživa šteňaťa je základom pre jeho zdravý vývoj. Prečítajte si, ako na to.",
    content: `# Ako správne kŕmiť šteňa

Správna výživa je kľúčová pre zdravý vývoj vášho šteňaťa. V tomto článku sa dozviete všetko potrebné.

## Vekové kategórie

### 0-2 mesiace
V tomto období by malo byť šteňa kŕmené materským mliekom alebo špeciálnou náhradou.

### 2-4 mesiace
Postupne zavádzame granule pre šteňatá, namočené vo vode alebo mlieku.

### 4-12 mesiacov
Prechádzame na suché granule, kŕmime 3x denne.

## Odporúčané množstvo

Množstvo krmiva závisí od veľkosti plemena a aktivity šteňaťa. Vždy sa riaďte odporúčaním na obale krmiva a konzultujte s veterinárom.`,
    image: getPlaceholderImage(800, 500, "Kŕmenie šteňaťa"),
    author: "MVDr. Jana Nováková",
    tags: ["výživa", "šteňa", "starostlivosť"],
    published: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    title: "Vakcinácia psa - kompletný sprievodca",
    slug: "vakcinacia-psa-kompletny-sprievodca",
    animalTypeSlug: "psy",
    excerpt: "Všetko, čo potrebujete vedieť o očkovaní vášho psa. Kedy, proti čomu a ako často.",
    content: `# Vakcinácia psa - kompletný sprievodca

Očkovanie chráni vášho psa pred nebezpečnými infekčnými chorobami.

## Základná vakcinácia

- **Psinky** - vírusové ochorenie postihujúce nervový systém
- **Parvovíróza** - závažné črevné ochorenie
- **Hepatitída** - infekčný zápal pečene
- **Besnota** - povinné očkovanie zo zákona

## Vakcinačný kalendár

| Vek | Očkovanie |
|-----|----------|
| 6-8 týždňov | Prvá dávka |
| 10-12 týždňov | Druhá dávka |
| 14-16 týždňov | Tretia dávka + besnota |
| Ročne | Preočkovanie |`,
    image: getPlaceholderImage(800, 500, "Vakcinácia psa"),
    author: "MVDr. Peter Svoboda",
    tags: ["vakcinácia", "prevencia", "zdravie"],
    published: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    _id: "3",
    title: "Starostlivosť o srsť mačky",
    slug: "starostlivost-o-srst-macky",
    animalTypeSlug: "macky",
    excerpt: "Pravidelná starostlivosť o srsť je dôležitá nielen pre vzhľad, ale aj zdravie vašej mačky.",
    content: `# Starostlivosť o srsť mačky

Srsť je odrazom celkového zdravia mačky. Pravidelná starostlivosť predchádza mnohým problémom.

## Druhy srsti

### Krátka srsť
Stačí česať 1-2x týždenne.

### Dlhá srsť
Vyžaduje denné česanie pre prevenciu zacuchania.

## Pomôcky pre starostlivosť

- Kefa s kovovými hrotmi
- Hrebeň s jemnými zubami
- Rukavica na odstránenie chlpov

## Kedy navštíviť veterinára

Ak zaznamenáte nadmerné vypadávanie srsti, lysiny alebo zmenu kvality srsti, navštívte veterinára.`,
    image: getPlaceholderImage(800, 500, "Starostlivosť o srsť mačky"),
    author: "MVDr. Jana Nováková",
    tags: ["starostlivosť", "srsť", "mačka"],
    published: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    _id: "4",
    title: "Správna starostlivosť o morča",
    slug: "spravna-starostlivost-o-morca",
    animalTypeSlug: "hlodavce",
    excerpt: "Morčatá sú obľúbení miláčikovia. Zistite, ako sa o ne správne starať.",
    content: `# Správna starostlivosť o morča

Morčatá sú spoločenské zvieratá, ktoré potrebujú správnu starostlivosť a pozornosť.

## Ubytovanie

- Priestranná klietka minimálne 0.5 m² na jedno morča
- Podstielka z hoblin alebo sena
- Denný prístup k čerstvému senu

## Výživa

Morčatá nevedia syntetizovať vitamín C, preto potrebujú:
- Čerstvú zeleninu denne
- Kvalitné granule pre morčatá
- Neobmedzený prístup k senu

## Zdravotná starostlivosť

Pravidelné kontroly u veterinára a sledovanie:
- Hmotnosti
- Stavu zubov
- Kvality srsti`,
    image: getPlaceholderImage(800, 500, "Starostlivosť o morča"),
    author: "MVDr. Peter Svoboda",
    tags: ["morča", "hlodavce", "starostlivosť"],
    published: true,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
];

export async function getAllAnimalTypes(): Promise<AnimalType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter out "vtaky" as it's been transformed into /aktuality
      const filteredTypes = mockAnimalTypes.filter((type) => type.slug !== "vtaky");
      resolve(filteredTypes.sort((a, b) => a.order - b.order));
    }, 100);
  });
}

export async function getAnimalTypeBySlug(slug: string): Promise<AnimalType | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const type = mockAnimalTypes.find((t) => t.slug === slug);
      resolve(type || null);
    }, 100);
  });
}

export async function getArticlesByAnimalType(animalTypeSlug: string): Promise<AnimalArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const articles = mockAnimalArticles
        .filter((a) => a.animalTypeSlug === animalTypeSlug && a.published)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      resolve(articles);
    }, 100);
  });
}

export async function getArticleBySlug(
  animalTypeSlug: string,
  articleSlug: string
): Promise<AnimalArticle | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = mockAnimalArticles.find(
        (a) => a.animalTypeSlug === animalTypeSlug && a.slug === articleSlug
      );
      resolve(article || null);
    }, 100);
  });
}

export async function getAllArticles(): Promise<AnimalArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const articles = mockAnimalArticles
        .filter((a) => a.published)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      resolve(articles);
    }, 100);
  });
}

export async function getRecentArticles(limit = 3): Promise<AnimalArticle[]> {
  const articles = await getAllArticles();
  return articles.slice(0, limit);
}

export type AdjacentArticles = {
  prev: { title: string; slug: string; animalTypeSlug: string } | null;
  next: { title: string; slug: string; animalTypeSlug: string } | null;
};

export async function getAdjacentArticles(
  animalTypeSlug: string,
  currentArticleSlug: string
): Promise<AdjacentArticles> {
  const articles = await getArticlesByAnimalType(animalTypeSlug);
  const currentIndex = articles.findIndex((a) => a.slug === currentArticleSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 
    ? { 
        title: articles[currentIndex - 1].title, 
        slug: articles[currentIndex - 1].slug,
        animalTypeSlug: articles[currentIndex - 1].animalTypeSlug
      }
    : null;
  
  const next = currentIndex < articles.length - 1
    ? { 
        title: articles[currentIndex + 1].title, 
        slug: articles[currentIndex + 1].slug,
        animalTypeSlug: articles[currentIndex + 1].animalTypeSlug
      }
    : null;

  return { prev, next };
}






