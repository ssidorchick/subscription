import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { map, delay } from 'rxjs/operators';

import { planCosts, planNames, Subscription, SubscriptionRequest } from '../entities';

@Injectable()
export class SubscriptionService {
  private current = this.create({plan: 'good', seats: 5});
  private previous: Subscription;

  // GET /api/current
  getCurrent(): Observable<Subscription> {
    return of(this.current).pipe(
      delay(200),
    );
  }

  // PUT /api/current
  updateCurrent(subscription: Subscription): Observable<Subscription> {
    this.previous = this.current;
    this.current = subscription;
    return of(this.current).pipe(
      delay(1000),
    );
  }

  // GET /api/preview
  getPreview(request: SubscriptionRequest): Observable<Subscription> {
    return of(this.create(request)).pipe(
      delay(1000),
    );
  }

  private create(request: SubscriptionRequest): Subscription {
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
