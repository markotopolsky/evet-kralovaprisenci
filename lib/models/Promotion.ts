export interface Promotion {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  discount?: string;
  terms?: string;
  createdAt: Date;
  updatedAt: Date;
}








