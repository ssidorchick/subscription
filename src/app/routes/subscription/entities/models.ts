export interface Subscription {
  plan: string;
  name: string;
  seats: number;
  cost: number;
  currency: string;
}

export interface SubscriptionRequest {
  plan: string;
  seats: number;
}
