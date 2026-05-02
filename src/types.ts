export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  imageUrl: string;
}

export type ViewState = {
  type: 'catalog';
} | {
  type: 'detail';
  productId: string;
};
