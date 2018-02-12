export interface Subscription {
  plan: string;
  name: string;
  seats: number;
  cost: number;
}

export interface SubscriptionRequest {
  plan: string;
  seats: number;
}
