import { Action } from '@ngrx/store';

import { Subscription, SubscriptionRequest } from '../entities';

export enum Types {
  GET_CURRENT =         '[App] Get current subscription',
  GET_CURRENT_SUCCESS = '[App] Get current subscription success',
  GET_PREVIEW =         '[App] Get subscription preview',
  GET_PREVIEW_SUCCESS = '[App] Get subscription preview success',
  UPDATE =              '[App] Update subscription',
  UPDATE_SUCCESS =      '[App] Update subscription success',
}

export class GetCurrentSubscriptionAction implements Action {
  readonly type = Types.GET_CURRENT;
}

export class GetCurrentSubscriptionSuccessAction implements Action {
  readonly type = Types.GET_CURRENT_SUCCESS;

  constructor(public subscription: Subscription) { }
}

export class GetSubscriptionPreviewAction implements Action {
  readonly type = Types.GET_PREVIEW;

  constructor(public request: SubscriptionRequest) { }
}

export class GetSubscriptionPreviewSuccessAction implements Action {
  readonly type = Types.GET_PREVIEW_SUCCESS;

  constructor(public subscription: Subscription) { }
}

export class UpdateSubscriptionAction implements Action {
  readonly type = Types.UPDATE;

  constructor(public subscription: Subscription) { }
}

export class UpdateSubscriptionSuccessAction implements Action {
  readonly type = Types.UPDATE_SUCCESS;

  constructor(public subscription: Subscription) { }
}

export type Actions
  = GetCurrentSubscriptionAction
  | GetCurrentSubscriptionSuccessAction
  | GetSubscriptionPreviewAction
  | GetSubscriptionPreviewSuccessAction
  | UpdateSubscriptionAction
  | UpdateSubscriptionSuccessAction;
