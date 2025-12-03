export interface Banner {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

