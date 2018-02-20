import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';

import { SubscriptionService } from '../services';
import { State } from './subscription.reducers';
import * as actions from './subscription.actions';
import * as selectors from './subscription.selectors';

@Injectable()
export class SubscriptionEffects {
  @Effect()
  getCurrent$ = this.actions$.pipe(
    ofType(actions.Types.GET_CURRENT_SUBSCRIPTION),
    switchMap(() =>
      this.subscriptionService.getCurrent().pipe(
        map(subscription => new actions.GetCurrentSubscriptionSuccessAction(subscription)),
        catchError(error => of(new actions.SetApiErrorAction(error)))
      )
    )
  );

  @Effect()
  getPreview$ = this.actions$.pipe(
    ofType<actions.GetProductPreviewAction>(actions.Types.GET_PRODUCT_PREVIEW),
    switchMap(action =>
      this.subscriptionService.getPreview(action.request).pipe(
        map(subscription => new actions.GetProductPreviewSuccessAction(subscription, action.index)),
        catchError(error => of(new actions.SetApiErrorAction(error)))
      )
    )
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<actions.UpdateSubscriptionAction>(actions.Types.UPDATE_SUBSCRIPTION),
    withLatestFrom(this.store.select(selectors.getPreview)),
    switchMap(([, subscription]) =>
      this.subscriptionService.updateCurrent(subscription).pipe(
        map(updated => {
          this.router.navigate(['/subscription/updated']);
          return new actions.UpdateSubscriptionSuccessAction(updated);
        }),
        catchError(error => of(new actions.SetApiErrorAction(error)))
      )
    )
  );

  constructor(private actions$: Actions, private store: Store<State>,
    private router: Router, private subscriptionService: SubscriptionService) { }
}
