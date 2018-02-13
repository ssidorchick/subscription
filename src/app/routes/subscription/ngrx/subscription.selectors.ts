import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Subscription } from '../entities';
import { State } from './subscription.reducers';

export const getAppState = createFeatureSelector<State>('subscription');
export const getPrevious = createSelector(
  getAppState,
  (state) => state.previuos,
);
export const getCurrent = createSelector(
  getAppState,
  (state) => state.current,
);
export const getPreview = createSelector(
  getAppState,
  (state) => state.preview,
);
export const getApiError = createSelector(
  getAppState,
  (state) => state.error,
);
