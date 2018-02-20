import { createSelector, createFeatureSelector } from '@ngrx/store';
import { isEqual } from 'lodash';

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
export const getEditableSubscription = createSelector(
  getPreview,
  (preview) => {
    if (!preview) {
      return null;
    }

    const {products, ...rest} = preview;
    return {
      ...rest,
      products: products.map(product => ({product})),
    };
  }
);
export const getCanUpdate = createSelector(
  getCurrent,
  getPreview,
  (current, preview) => !isEqual(current, preview)
);
export const getApiError = createSelector(
  getAppState,
  (state) => state.apiError
);
