import * as actions from './subscription.actions';
import { reducer, initialState } from './subscription.reducers';

describe('subscription reducers', () => {
  const subscription = {plan: 'good', name: 'Good', seats: 1, cost: 1, currency: 'USD'};

  it('should handle initial state', () => {
    const state = reducer(undefined, {type: null});
    expect(state).toBe(initialState);
  });

  it('should handle GET_CURRENT', () => {
    const action = new actions.GetCurrentSuccessAction(subscription);
    const newState = reducer(initialState, action);
    expect(newState.current).toEqual(subscription);
  });

  it('should handle GET_PREVIEW_SUCCESS', () => {
    const action = new actions.GetPreviewSuccessAction(subscription);
    const newState = reducer(initialState, action);
    expect(newState.preview).toEqual(subscription);
  });

  it('should handle UPDATE_SUCCESS', () => {
    const current = {...subscription, seats: 2, cost: 2};
    const state = {...initialState, current};
    const action = new actions.UpdateSuccessAction(subscription);
    const newState = reducer(state, action);
    expect(newState.previous).toEqual(current);
    expect(newState.current).toEqual(subscription);
    expect(newState.preview).toBe(null);
  });

  it('should handle SET_API_ERROR', () => {
    const error = {message: 'Error'};
    const action = new actions.SetApiErrorAction(error);
    const newState = reducer(initialState, action);
    expect(newState.apiError).toEqual(error);
  });
});
