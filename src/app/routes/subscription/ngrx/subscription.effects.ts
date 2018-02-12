import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map, mergeMap } from 'rxjs/operators';

import { SubscriptionService } from '../services';
import { State } from './subscription.reducers';
import * as actions from './subscription.actions';
import * as selectors from './subscription.selectors';

@Injectable()
export class SubscriptionEffects {
  @Effect()
  getCurrent$ = this.actions$.pipe(
    ofType(actions.Types.GET_CURRENT),
    switchMap(() => this.subscriptionService.getCurrent()),
    map(subscription => new actions.GetCurrentSuccessAction(subscription))
  );

  @Effect()
  getPreview$ = this.actions$.pipe(
    ofType<actions.GetPreviewAction>(actions.Types.GET_PREVIEW),
    switchMap(action => this.subscriptionService.getPreview(action.request)),
    map(subscription => new actions.GetPreviewSuccessAction(subscription))
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<actions.UpdateAction>(actions.Types.UPDATE),
    switchMap(action => this.subscriptionService.updateCurrent(action.subscription)),
    map(subscription => {
      this.router.navigate(['/subscription/updated']);
      return new actions.UpdateSuccessAction(subscription);
    })
  );

  constructor(private actions$: Actions, private store: Store<State>,
    private router: Router, private subscriptionService: SubscriptionService) { }
}
