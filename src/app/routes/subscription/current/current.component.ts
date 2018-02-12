import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription as ReactiveSubscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';
// import { distinctUntilChanged } from 'rxjs/operators';

import { validateInteger } from 'app/common/validators';
import { planNames, Subscription } from '../entities';
import { State, actions, selectors } from '../ngrx';

@Component({
  selector: 'app-current-subscription',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentSubscriptionComponent implements OnInit, OnDestroy {
  plans: Array<{value: string, name: string}>;
  subscription: Subscription;
  current: Subscription;
  subscriptionSub: ReactiveSubscription;
  subscriptionForm: FormGroup;
  subscriptionFormSub: ReactiveSubscription;

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.plans = Object.keys(planNames).map(plan => ({value: plan, name: planNames[plan]}));
    this.subscriptionForm = this.fb.group({
      plan: '',
      seats: [1, Validators.compose([
        Validators.required,
        CustomValidators.min(1),
        CustomValidators.max(200000),
        validateInteger ,
      ])],
    });
  }

  ngOnInit() {
    this.subscriptionSub = combineLatest(
      this.store.select(selectors.getCurrent),
      this.store.select(selectors.getPreview),
    ).subscribe(([current, preview]) => {
      this.current = current;
      this.subscription = preview || current;
      if (!this.subscription) {
        return;
      }

      this.subscriptionForm.setValue({
        plan: this.subscription.plan,
        seats: this.subscription.seats,
      }, {emitEvent: false});
    });

    this.subscriptionFormSub = this.subscriptionForm.valueChanges.pipe(
      // distinctUntilChanged((a, b) => {
        // console.log(a, b);
        // return a.seats === b.seats;
      // })
    ).subscribe(changes => {
      if (!this.subscriptionForm.valid) {
        return;
      }

      // Reset cost to show preview loading is in progress
      this.subscription = {
        ...this.subscription,
        cost: null,
      };
      this.store.dispatch(new actions.GetPreviewAction(changes));
    });

    this.store.dispatch(new actions.GetCurrentAction());
  }

  ngOnDestroy() {
    this.subscriptionSub.unsubscribe();
    this.subscriptionFormSub.unsubscribe();
  }

  updateSubscription() {
    this.store.dispatch(new actions.UpdateAction(this.subscription));
  }

  canUpdateSubscription() {
    return this.subscriptionForm.valid &&
           !!this.subscription &&
           (this.subscription.plan !== this.current.plan ||
           this.subscription.seats !== this.current.seats);
  }
}
