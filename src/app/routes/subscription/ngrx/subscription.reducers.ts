import { Subscription } from '../entities';
import * as actions from './subscription.actions';

export interface State {
  readonly previous: null|Subscription;
  readonly current: null|Subscription;
  readonly preview: null|Subscription;
  readonly apiError: any;
  readonly updating: boolean;
}

export const initialState: State = {
  previous: null,
  current: null,
  preview: null,
  apiError: null,
  updating: false,
};

export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {
    case actions.Types.GET_CURRENT_SUBSCRIPTION_SUCCESS: {
      const {current} = action;
      return {
        ...state,
        current,
        preview: current,
      };
    }

    case actions.Types.GET_PRODUCT_PREVIEW_SUCCESS: {
      const {preview: productPreview, index} = action;
      const {products} = state.preview;
      return {
        ...state,
        preview: {
          ...state.preview,
          products: [
            ...products.slice(0, index),
            productPreview,
            ...products.slice(index + 1),
          ],
        },
      };
    }

    case actions.Types.UPDATE_SUBSCRIPTION: {
      return {
        ...state,
        updating: true,
      };
    }

    case actions.Types.UPDATE_SUBSCRIPTION_SUCCESS: {
      const {updated} = action;
      return {
        ...state,
        previous: state.current,
        current: updated,
        preview: updated,
        updating: false,
      };
    }

    case actions.Types.SET_API_ERROR: {
      const {error} = action;
      return {
        ...state,
        apiError: error,
      };
    }

    default: {
      return state;
    }
  }
}
