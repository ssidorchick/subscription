import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { cold, hot } from 'jasmine-marbles';

import { StoreMock } from 'app/common/ngrx/testing';
import * as actions from './subscription.actions';
import * as selectors from './subscription.selectors';
import { SubscriptionService } from '../services';
import { SubscriptionServiceMock } from '../services/testing';
import { SubscriptionEffects } from './subscription.effects';

describe('SubscriptionEffects', () => {
  const product = {plan: 'good', name: 'Good', seats: 1, cost: 1, currency: 'USD'};
  const subscription = {products: [product]};
  let effects: SubscriptionEffects;
  let actions$: Observable<any>;
  let store: StoreMock;
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
        {provide: Store, useClass: StoreMock},
        {provide: SubscriptionService, useClass: SubscriptionServiceMock},
        {provide: Router, useValue: {navigate: () => {}}},
      ],
    });

    effects = TestBed.get(SubscriptionEffects);
    store = TestBed.get(Store);
    subscriptionService = TestBed.get(SubscriptionService);
    router = TestBed.get(Router);

    store.mockSelection(selectors.getPreview, subscription);
  });

  it('getCurrent$ should handle GET_CURRENT action', () => {
    const action = new actions.GetCurrentSubscriptionAction();
    const completion = new actions.GetCurrentSubscriptionSuccessAction(subscription);

    actions$ = hot('-a--', {a: action});
    const res = cold('-a|', {a: subscription});
    const expected = cold('--b', {b: completion});
    spyOn(subscriptionService, 'getCurrent').and.returnValue(res);

    expect(effects.getCurrent$).toBeObservable(expected);
  });

  it('getPreview$ should handle GET_PREVIEW action', () => {
    const action = new actions.GetProductPreviewAction({plan: 'good', seats: 1}, 0);
    const completion = new actions.GetProductPreviewSuccessAction(product, 0);

    actions$ = hot('-a--', {a: action});
    const res = cold('-a|', {a: product});
    const expected = cold('--b', {b: completion});
    spyOn(subscriptionService, 'getPreview').and.returnValue(res);

    expect(effects.getPreview$).toBeObservable(expected);
  });

  it('update should handle UPDATE action', () => {
    const action = new actions.UpdateSubscriptionAction();
    const completion = new actions.UpdateSubscriptionSuccessAction(subscription);

    actions$ = hot('-a--', {a: action});
    const res = cold('-a|', {a: subscription});
    const expected = cold('--b', {b: completion});
    spyOn(subscriptionService, 'updateCurrent').and.returnValue(res);
    spyOn(router, 'navigate');

    expect(effects.update$).toBeObservable(expected);
    expect(router.navigate).toHaveBeenCalledWith(['/subscription/updated']);
  });
});
