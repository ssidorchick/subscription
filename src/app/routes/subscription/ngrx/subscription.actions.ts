import { Action } from '@ngrx/store';

import { Product, Subscription, ProductRequest } from '../entities';

export enum Types {
  GET_CURRENT_SUBSCRIPTION =         '[Subscription] Get current subscription',
  GET_CURRENT_SUBSCRIPTION_SUCCESS = '[Subscription] Get current subscription  success',
  GET_PRODUCT_PREVIEW =              '[Subscription] Get product preview',
  GET_PRODUCT_PREVIEW_SUCCESS =      '[Subscription] Get product preview success',
  UPDATE_SUBSCRIPTION =              '[Subscription] Update subscription',
  UPDATE_SUBSCRIPTION_SUCCESS =      '[Subscription] Update subscription success',
  SET_API_ERROR =                    '[Subscription] Set request error',
}

export class GetCurrentSubscriptionAction implements Action {
  readonly type = Types.GET_CURRENT_SUBSCRIPTION;
}

export class GetCurrentSubscriptionSuccessAction implements Action {
  readonly type = Types.GET_CURRENT_SUBSCRIPTION_SUCCESS;

  constructor(public current: Subscription) { }
}

export class GetProductPreviewAction implements Action {
  readonly type = Types.GET_PRODUCT_PREVIEW;

  constructor(public request: ProductRequest, public index: number) { }
}

export class GetProductPreviewSuccessAction implements Action {
  readonly type = Types.GET_PRODUCT_PREVIEW_SUCCESS;

  constructor(public preview: Product, public index: number) { }
}

export class UpdateSubscriptionAction implements Action {
  readonly type = Types.UPDATE_SUBSCRIPTION;
}

export class UpdateSubscriptionSuccessAction implements Action {
  readonly type = Types.UPDATE_SUBSCRIPTION_SUCCESS;

  constructor(public updated: Subscription) { }
}

export class SetApiErrorAction implements Action {
  readonly type = Types.SET_API_ERROR;

  constructor(public error: any) { }
}

export type Actions
  = GetCurrentSubscriptionAction
  | GetCurrentSubscriptionSuccessAction
  | GetProductPreviewAction
  | GetProductPreviewSuccessAction
  | UpdateSubscriptionAction
  | UpdateSubscriptionSuccessAction
  | SetApiErrorAction;
