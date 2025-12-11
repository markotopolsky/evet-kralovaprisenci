export interface Banner {
  _id: string;
  title: string;           // Hlavný názov banneru
  shortTitle: string;      // Skrátený text pre info bar (navbar)
  description: string;     // Dlhší popis pre detail/stránku
  imageUrl: string;        // URL obrázku banneru
  link: string;            // Kam má banner odkazovať
  startDate: Date;         // Kedy začína zobrazovanie
  endDate?: Date;          // Kedy končí (voliteľné)
  isActive: boolean;       // Či je aktívny
  priority?: number;       // Poradie zobrazovania (vyššie = skôr)
}

// Pre MongoDB dokument
export interface BannerDocument extends Omit<Banner, '_id'> {
  _id: import('mongodb').ObjectId;
}
