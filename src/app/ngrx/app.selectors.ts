import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Subscription } from '../entities';
import { State } from './app.reducers';

export const getAppState = createFeatureSelector<State>('app');
export const getPreviousSubscription = createSelector(
  getAppState,
  (state) => state.previuosSubscription,
);
export const getCurrentSubscription = createSelector(
  getAppState,
  (state) => state.currentSubscription,
);
export const getSubscriptionPreview = createSelector(
  getAppState,
  (state) => state.subscriptionPreview,
);
