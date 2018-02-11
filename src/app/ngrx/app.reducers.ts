import { Subscription } from '../entities';
import * as actions from './app.actions';

export interface State {
  readonly previuosSubscription: null|Subscription;
  readonly currentSubscription: null|Subscription;
  readonly subscriptionPreview: null|Subscription;
}

export const initialState: State = {
  previuosSubscription: null,
  currentSubscription: null,
  subscriptionPreview: null,
};

export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {
    case actions.Types.GET_CURRENT_SUCCESS: {
      const {subscription} = action;
      return {
        ...state,
        currentSubscription: subscription,
      };
    }

    case actions.Types.GET_PREVIEW_SUCCESS: {
      const {subscription} = action;
      return {
        ...state,
        subscriptionPreview: subscription,
      };
    }

    case actions.Types.UPDATE_SUCCESS: {
      const {subscription} = action;
      return {
        ...state,
        previuosSubscription: state.currentSubscription,
        currentSubscription: subscription,
        subscriptionPreview: null,
      };
    }

    default: {
      return state;
    }
  }
}
