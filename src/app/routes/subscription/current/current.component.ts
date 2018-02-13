import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription as ReactiveSubscription } from 'rxjs/Subscription';

import { validateInteger } from 'app/common/validators';
import { planNames, Subscription } from '../entities';
import { State, actions, selectors } from '../ngrx';

@Component({
  selector: 'app-current-subscription',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentSubscriptionComponent implements OnInit, OnDestroy {
  plans: {value: string, name: string}[];
  subscription: Subscription;
  subscriptionSub: ReactiveSubscription;
  subscriptionForm: FormGroup;
  subscriptionFormSub: ReactiveSubscription;
  canUpdate$: Observable<boolean>;
  apiError$: Observable<any>;
  loading = false;

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.plans = Object.keys(planNames).map(plan => ({value: plan, name: planNames[plan]}));
    this.subscriptionForm = this.fb.group({
      plan: '',
      seats: [1, Validators.compose([
        Validators.required,
        CustomValidators.min(1),
        CustomValidators.max(200000),
        validateInteger,
      ])],
    });
  }

  ngOnInit() {
    this.subscriptionSub = this.store.select(selectors.getSubscription)
      .subscribe(subscription => {
        this.loading = false;
        this.subscription = subscription;
        if (!this.subscription ||
            !this.subscriptionForm.valid) {
          return;
        }

        this.subscriptionForm.setValue({
          plan: this.subscription.plan,
          seats: this.subscription.seats,
        }, {emitEvent: false});
      });

    this.subscriptionFormSub = this.subscriptionForm.valueChanges
      .subscribe(changes => {
        if (!this.subscriptionForm.valid) {
          return;
        }
        this.loading = true;
        this.store.dispatch(new actions.GetPreviewAction(changes));
      });

    this.canUpdate$ = this.store.select(selectors.getCanUpdate);
    this.apiError$ = this.store.select(selectors.getApiError);

    this.store.dispatch(new actions.GetCurrentAction());
  }

  ngOnDestroy() {
    this.subscriptionSub.unsubscribe();
    this.subscriptionFormSub.unsubscribe();
  }

  updateSubscription() {
    this.store.dispatch(new actions.UpdateAction(this.subscription));
  }
}
