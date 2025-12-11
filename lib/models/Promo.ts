export interface Promo {
  enabled: boolean;
  barText: string;        // Text displayed in dynamic bar
  imageBase64: string | null;  // Image shown in modal
  updatedAt?: Date;
}
