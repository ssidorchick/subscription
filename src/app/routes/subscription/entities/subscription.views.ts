import { Product } from './subscription.models';

export interface SubscriptionView {
  products: {product: Product}[];
}
