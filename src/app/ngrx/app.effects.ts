import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';

import { SubscriptionService } from '../services';
import { State } from './app.reducers';
import * as actions from './app.actions';
import * as selectors from './app.selectors';

@Injectable()
export class AppEffects {
  @Effect()
  getCurrentSubscription$ = this.actions$.pipe(
    ofType(actions.Types.GET_CURRENT),
    switchMap(() => this.subscriptionService.getCurrent()),
    map(subscription => new actions.GetCurrentSubscriptionSuccessAction(subscription))
  );

  @Effect()
  getSubscriptionPreview$ = this.actions$.pipe(
    ofType<actions.GetSubscriptionPreviewAction>(actions.Types.GET_PREVIEW),
    switchMap(action => this.subscriptionService.getPreview(action.request)),
    map(subscription => new actions.GetSubscriptionPreviewSuccessAction(subscription))
  );

  @Effect()
  updateSubscription$ = this.actions$.pipe(
    ofType<actions.UpdateSubscriptionAction>(actions.Types.UPDATE),
    switchMap(action => this.subscriptionService.updateCurrent(action.subscription)),
    map(subscription => new actions.UpdateSubscriptionSuccessAction(subscription))
  );

  constructor(private actions$: Actions, private store: Store<State>,
    private subscriptionService: SubscriptionService) { }
}
