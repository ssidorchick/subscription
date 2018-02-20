export interface Product {
  plan: string;
  name: string;
  seats: number;
  cost: number;
  currency: string;
}

export interface Subscription {
  products: Product[];
}

export interface ProductRequest {
  plan: string;
  seats: number;
}
