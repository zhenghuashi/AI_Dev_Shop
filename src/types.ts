export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  imageUrl: string;
  longDescription?: string;
  features?: string[];
  specs?: Record<string, string>;
  galleryImages?: string[];
}

export type ViewState = {
  type: 'catalog';
} | {
  type: 'detail';
  productId: string;
};
