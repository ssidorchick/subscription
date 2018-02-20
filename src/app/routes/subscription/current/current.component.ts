import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription as ReactiveSubscription } from 'rxjs/Subscription';

import { planNames, SubscriptionView } from '../entities';
import { State, actions, selectors } from '../ngrx';

@Component({
  selector: 'app-current-subscription',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentSubscriptionComponent implements OnInit, OnDestroy {
  plans: {value: string, name: string}[];
  subscription: SubscriptionView;
  subscriptionSub: ReactiveSubscription;
  subscriptionForm: FormGroup;
  productFormSubs: ReactiveSubscription[] = [];
  canUpdate$: Observable<boolean>;
  apiError$: Observable<any>;

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.plans = Object.keys(planNames).map(plan => ({value: plan, name: planNames[plan]}));
    this.subscriptionForm = this.fb.group({
      products: this.fb.array([]),
    });
  }

  get productsControl() {
    return this.subscriptionForm.get('products') as FormArray;
  }

  ngOnInit() {
    this.subscriptionSub = this.store.select(selectors.getEditableSubscription)
      .subscribe(subscription => {
        this.subscription = subscription;
        if (!this.subscription ||
            !this.subscriptionForm.valid) {
          return;
        }

        let i = Math.min(this.productsControl.length, this.subscription.products.length);
        while (i < this.productsControl.length) {
          this.removeProductGroup(i);
        }
        while (i < this.subscription.products.length) {
          this.createProductGroup(i);
          i++;
        }

        this.subscriptionForm.patchValue(this.subscription, {emitEvent: false});
      });

    this.canUpdate$ = this.store.select(selectors.getCanUpdate);
    this.apiError$ = this.store.select(selectors.getApiError);

    this.store.dispatch(new actions.GetCurrentSubscriptionAction());
  }

  ngOnDestroy() {
    this.subscriptionSub.unsubscribe();
    Object.values(this.productFormSubs).map(subscription => subscription.unsubscribe());
  }

  update() {
    this.store.dispatch(new actions.UpdateSubscriptionAction());
  }

  private createProductGroup(index: number) {
    const group = this.fb.group({product: ''});
    this.productFormSubs[index] = group.valueChanges.subscribe(changes => {
      const {product: productChanges} = changes;
      this.store.dispatch(new actions.GetProductPreviewAction(productChanges, index));
    });
    this.productsControl.insert(index, group);
  }

  private removeProductGroup(index: number) {
    this.productFormSubs[index].unsubscribe();
    this.productFormSubs.splice(index, 1);
    this.productsControl.removeAt(index);
  }
}
