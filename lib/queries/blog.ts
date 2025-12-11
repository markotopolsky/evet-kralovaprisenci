import { BlogPost } from "@/lib/models/BlogPost";
import { getPlaceholderImage } from "@/lib/images";

const mockBlogPosts: BlogPost[] = [
  {
    _id: "1",
    title: "Ako pripraviť miláčika na leto",
    slug: "ako-pripravit-milacika-na-leto",
    excerpt: "S príchodom teplých mesiacov prichádzajú aj špecifické riziká pre našich štvornohých priateľov. Prečítajte si, ako ich ochrániť.",
    content: `# Ako pripraviť miláčika na leto

Letné mesiace prinášajú nielen radosť zo slnečných dní, ale aj určité riziká pre naše domáce miláčiky.

## Ochrana pred teplom

### Psy
- Nikdy nenechávajte psa v aute
- Zabezpečte stály prístup k čerstvej vode
- Venčte v chladnejších hodinách (ráno a večer)
- Pozor na rozpálený asfalt - môže popáliť labky

### Mačky
- Zabezpečte tienisté miesto v byte
- Mačky s bielou srsťou chráňte pred slnkom
- Vetranie áno, ale pozor na otvorené okná

## Parazity

V lete je zvýšené riziko napadnutia:
- **Kliešte** - prenášajú boreliózu a ďalšie choroby
- **Blchy** - spôsobujú svrbenie a alergické reakcie
- **Komáre** - prenášajú srdcové červy

Odporúčame celoročnú antiparazitárnu ochranu.

## Prvá pomoc pri prehriatí

Príznaky prehriati:
- Nadmerné slinenie
- Ťažké dýchanie
- Dezorientácia
- Vracanie

Pri podozrení na prehriatie okamžite:
1. Presuňte zviera do tieňa
2. Ponúknite vodu (nie ľadovú!)
3. Ochladzujte postupne mokrými uterákmi
4. Kontaktujte veterinára`,
    image: getPlaceholderImage(1200, 600, "Miláčik v lete"),
    author: "MVDr. Jana Nováková",
    category: "Sezónna starostlivosť",
    tags: ["leto", "prevencia", "teplo", "parazity"],
    published: true,
    featured: true,
    readTime: 5,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    _id: "2",
    title: "Nová diagnostická technika",
    slug: "nova-diagnosticka-technika",
    excerpt: "Naša klinika získala nový ultrazvukový prístroj, ktorý umožňuje ešte presnejšiu diagnostiku.",
    content: `# Nová diagnostická technika

Naša klinika sa neustále modernizuje a investuje do najnovšieho vybavenia.

## Nový ultrazvuk

Nový prístroj umožňuje:
- Presnejšie zobrazenie vnútorných orgánov
- Rýchlejšiu diagnostiku
- Lepšiu kvalitu snímok

## Prečo je to dôležité

Presná diagnostika je základom správnej liečby.`,
    image: getPlaceholderImage(1200, 600, "Ultrazvuk"),
    author: "MVDr. Peter Svoboda",
    category: "Novinky",
    tags: ["diagnostika", "vybavenie"],
    published: true,
    featured: false,
    readTime: 3,
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15"),
  },
  {
    _id: "3",
    title: "Dôležitosť dentálnej hygieny",
    slug: "dolezitost-dentalnej-hygieny",
    excerpt: "Zdravé zuby sú dôležité pre celkové zdravie vášho miláčika. Zistite, prečo a ako na to.",
    content: `# Dôležitosť dentálnej hygieny

Zdravé zuby sú základom celkového zdravia vášho miláčika.

## Prečo je to dôležité

Zubný kameň môže viesť k:
- Zápalom ďasien
- Stratě zubov
- Infekciám, ktoré sa môžu rozšíriť do celého tela

## Ako predchádzať problémom

- Pravidelné čistenie zubov
- Vhodné žuvacie hračky
- Profesionálne čistenie u veterinára`,
    image: getPlaceholderImage(1200, 600, "Dentálna hygiena"),
    author: "MVDr. Peter Svoboda",
    category: "Zdravie",
    tags: ["zuby", "hygiena", "prevencia"],
    published: true,
    featured: false,
    readTime: 4,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    _id: "4",
    title: "Výživa seniorných psov",
    slug: "vyziva-seniornych-psov",
    excerpt: "Starší psi majú špecifické potreby na výživu. Zistite, ako im poskytnúť správnu stravu.",
    content: `# Výživa seniorných psov

S vekom sa menia potreby vášho psa na výživu.

## Zmeny v potrebách

Seniorní psi potrebujú:
- Menej kalórií (nižšia aktivita)
- Viac bielkovín (udržanie svalovej hmoty)
- Ľahšie stráviteľnú stravu
- Podporu kĺbov

## Odporúčania

Konzultujte s veterinárom vhodnú stravu pre vášho seniorného psa.`,
    image: getPlaceholderImage(1200, 600, "Seniorný pes"),
    author: "MVDr. Jana Nováková",
    category: "Výživa",
    tags: ["výživa", "senior", "pes"],
    published: true,
    featured: false,
    readTime: 4,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const published = mockBlogPosts
        .filter((p) => p.published)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      resolve(published);
    }, 100);
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockBlogPosts.find((p) => p.slug === slug);
      resolve(post || null);
    }, 100);
  });
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
}

export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = mockBlogPosts
        .filter((p) => p.published && p.featured)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit);
      resolve(featured);
    }, 100);
  });
}



