import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { map, delay } from 'rxjs/operators';

import { planCosts, planNames, Subscription, SubscriptionRequest } from '../entities';

@Injectable()
export class SubscriptionService {
  private currentSubscription: Subscription = {
    plan: 'good',
    name: 'Good',
    seats: 5,
    cost: 50,
  }
  private previuosSubscription: Subscription;

  // GET /api/current
  getCurrent(): Observable<Subscription> {
    return of(this.currentSubscription).pipe(
      delay(200),
    );
  }

  // PUT /api/current
  updateCurrent(request: SubscriptionRequest): Observable<Subscription> {
    this.previuosSubscription = this.currentSubscription;
    this.currentSubscription = this.create(request);
    return of(this.currentSubscription).pipe(
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
    };
    return subscription;
  }
}
