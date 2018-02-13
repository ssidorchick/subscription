import { Subscription } from '../entities';
import * as actions from './subscription.actions';

export interface State {
  readonly previuos: null|Subscription;
  readonly current: null|Subscription;
  readonly preview: null|Subscription;
  readonly error: any;
}

export const initialState: State = {
  previuos: null,
  current: null,
  preview: null,
  error: null,
};

export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {
    case actions.Types.GET_CURRENT_SUCCESS: {
      const {current} = action;
      return {
        ...state,
        current,
      };
    }

    case actions.Types.GET_PREVIEW_SUCCESS: {
      const {preview} = action;
      return {
        ...state,
        preview,
      };
    }

    case actions.Types.UPDATE_SUCCESS: {
      const {updated} = action;
      return {
        ...state,
        previuos: state.current,
        current: updated,
        preview: null,
      };
    }

    case actions.Types.SET_API_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    default: {
      return state;
    }
  }
}
