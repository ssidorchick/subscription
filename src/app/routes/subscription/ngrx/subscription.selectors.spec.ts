import { initialState } from './subscription.reducers';
import * as selectors from './subscription.selectors';

describe('subscription selectors', () => {
  const product = {plan: 'good', name: 'Good', seats: 1, cost: 1, currency: 'USD'};
  const subscription = {products: [product]};
  const subscriptionView = {products: [{product}]};
  const product2 = {plan: 'good', name: 'Good', seats: 2, cost: 2, currency: 'USD'};
  const subscription2 = {products: [product2]};

  it('getPrevious should return previous subscription', () => {
    const state = {...initialState, previous: subscription};
    const result = selectors.getPrevious.projector(state);
    expect(result).toEqual(subscription);
  });

  it('getCurrent should return current subscription', () => {
    const state = {...initialState, current: subscription};
    const result = selectors.getCurrent.projector(state);
    expect(result).toEqual(subscription);
  });

  it('getPreview should return subscription preview', () => {
    const state = {...initialState, preview: subscription};
    const result = selectors.getPreview.projector(state);
    expect(result).toEqual(subscription);
  });

  it('getEditableSubscriptions should return editable subscription', () => {
    const result = selectors.getEditableSubscription.projector(subscription, null);
    expect(result).toEqual(subscriptionView);
  });

  it('getCanUpdate should return false when preview is identical to current', () => {
    const preview = {...subscription};
    const result = selectors.getCanUpdate.projector(subscription, preview);
    expect(result).toBe(false);
  });

  it('getCanUpdate should return true when preview different from current', () => {
    const result = selectors.getCanUpdate.projector(subscription, subscription2);
    expect(result).toBe(true);
  });

  it('getApiError should return api error', () => {
    const error = {message: 'Error'};
    const state = {...initialState, apiError: error};
    const result = selectors.getApiError.projector(state);
    expect(result).toEqual(error);
  });
});
