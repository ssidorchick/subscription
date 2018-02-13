import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { cold, hot } from 'jasmine-marbles';

import { Subscription } from '../entities';
import * as actions from './subscription.actions';
import { SubscriptionService } from '../services';
import { SubscriptionServiceMock } from '../services/testing';
import { SubscriptionEffects } from './subscription.effects';

describe('SubscriptionEffects', () => {
  const subscription = {plan: 'good', name: 'Good', seats: 1, cost: 1, currency: 'USD'};
  let effects: SubscriptionEffects;
  let actions$: Observable<any>;
  let subscriptionService: SubscriptionService;
  let router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        SubscriptionEffects,
        provideMockActions(() => actions$),
        {provide: SubscriptionService, useClass: SubscriptionServiceMock},
        {provide: Router, useValue: {navigate: () => {}}},
      ],
    });

    effects = TestBed.get(SubscriptionEffects);
    subscriptionService = TestBed.get(SubscriptionService);
    router = TestBed.get(Router);
  });

  it('getCurrent$ should handle GET_CURRENT action', () => {
    const action = new actions.GetCurrentAction();
    const completion = new actions.GetCurrentSuccessAction(subscription);

    actions$ = hot('-a--', {a: action});
    const res = cold('-a|', {a: subscription});
    const expected = cold('--b', {b: completion});
    spyOn(subscriptionService, 'getCurrent').and.returnValue(res);

    expect(effects.getCurrent$).toBeObservable(expected);
  });

  it('getPreview$ should handle GET_PREVIEW action', () => {
    const action = new actions.GetPreviewAction({plan: 'good', seats: 1});
    const completion = new actions.GetPreviewSuccessAction(subscription);

    actions$ = hot('-a--', {a: action});
    const res = cold('-a|', {a: subscription});
    const expected = cold('--b', {b: completion});
    spyOn(subscriptionService, 'getPreview').and.returnValue(res);

    expect(effects.getPreview$).toBeObservable(expected);
  });

  it('update should handle UPDATE action', () => {
    const action = new actions.UpdateAction(subscription);
    const completion = new actions.UpdateSuccessAction(subscription);

    actions$ = hot('-a--', {a: action});
    const res = cold('-a|', {a: subscription});
    const expected = cold('--b', {b: completion});
    spyOn(subscriptionService, 'updateCurrent').and.returnValue(res);
    spyOn(router, 'navigate')

    expect(effects.update$).toBeObservable(expected);
    expect(router.navigate).toHaveBeenCalledWith(['/subscription/updated']);
  });
});
