import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';

import { SubscriptionService } from '../services';
import { State } from './subscription.reducers';
import * as actions from './subscription.actions';
import * as selectors from './subscription.selectors';

@Injectable()
export class SubscriptionEffects {
  @Effect()
  getCurrent$ = this.actions$.pipe(
    ofType(actions.Types.GET_CURRENT),
    switchMap(() =>
      this.subscriptionService.getCurrent().pipe(
        map(subscription => new actions.GetCurrentSuccessAction(subscription)),
        catchError(error => of(new actions.SetApiErrorAction(error))),
      ),
    ),
  );

  @Effect()
  getPreview$ = this.actions$.pipe(
    ofType<actions.GetPreviewAction>(actions.Types.GET_PREVIEW),
    switchMap(action =>
      this.subscriptionService.getPreview(action.request).pipe(
        map(subscription => new actions.GetPreviewSuccessAction(subscription)),
        catchError(error => of(new actions.SetApiErrorAction(error))),
      ),
    ),
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<actions.UpdateAction>(actions.Types.UPDATE),
    switchMap(action =>
      this.subscriptionService.updateCurrent(action.subscription).pipe(
        map(subscription => {
          this.router.navigate(['/subscription/updated']);
          return new actions.UpdateSuccessAction(subscription);
        }),
        catchError(error => of(new actions.SetApiErrorAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private router: Router,
    private subscriptionService: SubscriptionService) { }
}
