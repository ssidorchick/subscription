import { Action } from '@ngrx/store';

import { Subscription, SubscriptionRequest } from '../entities';

export enum Types {
  GET_CURRENT =         '[Subscription] Get current subscription',
  GET_CURRENT_SUCCESS = '[Subscription] Get current subscription success',
  GET_PREVIEW =         '[Subscription] Get subscription preview',
  GET_PREVIEW_SUCCESS = '[Subscription] Get subscription preview success',
  UPDATE =              '[Subscription] Update subscription',
  UPDATE_SUCCESS =      '[Subscription] Update subscription success',
  SET_API_ERROR =       '[Subscription] Set request error',
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

export class SetApiErrorAction implements Action {
  readonly type = Types.SET_API_ERROR;

  constructor(public error: any) { }
}

export type Actions
  = GetCurrentAction
  | GetCurrentSuccessAction
  | GetPreviewAction
  | GetPreviewSuccessAction
  | UpdateAction
  | UpdateSuccessAction
  | SetApiErrorAction;
