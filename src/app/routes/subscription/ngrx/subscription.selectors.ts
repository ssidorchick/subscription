import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Subscription } from '../entities';
import { State } from './subscription.reducers';

export const getAppState = createFeatureSelector<State>('subscription');
export const getPrevious = createSelector(
  getAppState,
  (state) => state.previous
);
export const getCurrent = createSelector(
  getAppState,
  (state) => state.current
);
export const getPreview = createSelector(
  getAppState,
  (state) => state.preview
);
export const getSubscription = createSelector(
  getCurrent,
  getPreview,
  (current, preview) => preview || current
);
export const getCanUpdate = createSelector(
  getCurrent,
  getPreview,
  (current, preview) => {
    return !!preview &&
           (preview.plan !== current.plan ||
           preview.seats !== current.seats);
  }
);
export const getApiError = createSelector(
  getAppState,
  (state) => state.apiError
);
