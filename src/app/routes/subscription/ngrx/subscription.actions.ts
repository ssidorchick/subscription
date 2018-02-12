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

export class GetCurrentAction implements Action {
  readonly type = Types.GET_CURRENT;
}

export class GetCurrentSuccessAction implements Action {
  readonly type = Types.GET_CURRENT_SUCCESS;

  constructor(public current: Subscription) { }
}

export class GetPreviewAction implements Action {
  readonly type = Types.GET_PREVIEW;

  constructor(public request: SubscriptionRequest) { }
}

export class GetPreviewSuccessAction implements Action {
  readonly type = Types.GET_PREVIEW_SUCCESS;

  constructor(public preview: Subscription) { }
}

export class UpdateAction implements Action {
  readonly type = Types.UPDATE;

  constructor(public subscription: Subscription) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = Types.UPDATE_SUCCESS;

  constructor(public updated: Subscription) { }
}

export type Actions
  = GetCurrentAction
  | GetCurrentSuccessAction
  | GetPreviewAction
  | GetPreviewSuccessAction
  | UpdateAction
  | UpdateSuccessAction;
