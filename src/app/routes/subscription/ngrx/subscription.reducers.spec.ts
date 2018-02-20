import * as actions from './subscription.actions';
import { reducer, initialState } from './subscription.reducers';

describe('subscription reducers', () => {
  const product = {plan: 'good', name: 'Good', seats: 1, cost: 1, currency: 'USD'};
  const subscription = {products: [product]};

  it('should handle initial state', () => {
    const state = reducer(undefined, {type: null});
    expect(state).toBe(initialState);
  });

  it('should handle GET_CURRENT', () => {
    const action = new actions.GetCurrentSubscriptionSuccessAction(subscription);
    const newState = reducer(initialState, action);
    expect(newState.current).toEqual(subscription);
  });

  it('should handle GET_PREVIEW_SUCCESS', () => {
    const state = {...initialState, preview: subscription};
    const action = new actions.GetProductPreviewSuccessAction(product, 0);
    const newState = reducer(state, action);
    expect(newState.preview).toEqual(subscription);
  });

  it('should handle UPDATE_SUCCESS', () => {
    const current = {...subscription, seats: 2, cost: 2};
    const state = {...initialState, current};
    const action = new actions.UpdateSubscriptionSuccessAction(subscription);
    const newState = reducer(state, action);
    expect(newState.previous).toEqual(current);
    expect(newState.current).toEqual(subscription);
    expect(newState.preview).toBe(subscription);
  });

  it('should handle SET_API_ERROR', () => {
    const error = {message: 'Error'};
    const action = new actions.SetApiErrorAction(error);
    const newState = reducer(initialState, action);
    expect(newState.apiError).toEqual(error);
  });
});
