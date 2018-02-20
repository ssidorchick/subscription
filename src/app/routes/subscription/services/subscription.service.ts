import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

import { planCosts, planNames, Product, Subscription, ProductRequest } from '../entities';

@Injectable()
export class SubscriptionService {
  private current = {
    products: [
      this.create({plan: 'good', seats: 5}),
      this.create({plan: 'basic', seats: 4}),
    ],
  };
  private previous: Subscription;

  // GET /api/current
  getCurrent(): Observable<Subscription> {
    return of(this.current).pipe(
      delay(200)
    );
  }

  // PUT /api/current
  updateCurrent(subscription: Subscription): Observable<Subscription> {
    this.previous = this.current;
    this.current = subscription;
    return of(this.current).pipe(
      delay(1000)
    );
  }

  // GET /api/preview
  getPreview(request: ProductRequest): Observable<Product> {
    return of(this.create(request)).pipe(
      delay(1000)
    );
  }

  private create(request: ProductRequest): Product {
    const {plan, seats} = request;
    const subscription = {
      plan,
      name: planNames[plan],
      seats,
      cost: seats * planCosts[plan],
      currency: 'USD',
    };
    return subscription;
  }
}
