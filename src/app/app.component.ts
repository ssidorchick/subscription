import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { planNames, Subscription } from './entities';
import { State, actions, selectors } from './ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  plans: Array<{value: string, name: string}>;
  currentSubscription$: Observable<Subscription>;
  currentSubscriptionSub;
  subscription: Subscription;
  currentSubscription: Subscription;
  subscriptionPreview$: Observable<Subscription>;
  subscriptionSub;
  subscriptionForm
  subscriptionFormSub;

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.plans = Object.keys(planNames).map(plan => ({value: plan, name: planNames[plan]}));
    this.subscriptionForm = this.fb.group({
      plan: '',
      seats: 0,
    });
  }

  ngOnInit() {
    this.currentSubscription$ = this.store.select(selectors.getCurrentSubscription);
    this.subscriptionPreview$ = this.store.select(selectors.getSubscriptionPreview);

    this.subscriptionSub = combineLatest(
      this.currentSubscription$,
      this.subscriptionPreview$,
    ).subscribe(([current, preview]) => {
      this.currentSubscription = current;
      this.subscription = preview || current;
      if (!this.subscription) {
        return;
      }

      this.subscriptionForm.setValue({
        plan: this.subscription.plan,
        seats: this.subscription.seats,
      }, {emitEvent: false});
    });

    this.subscriptionFormSub = this.subscriptionForm.valueChanges.subscribe(changes => {
      // Reset cost to show preview loading is in progress
      this.subscription = {
        ...this.subscription,
        cost: null,
      };
      this.store.dispatch(new actions.GetSubscriptionPreviewAction(changes));
    });

    this.store.dispatch(new actions.GetCurrentSubscriptionAction());
  }

  ngOnDestroy() {
    this.currentSubscriptionSub.unsubscribe();
    this.subscriptionFormSub.unsubscribe();
  }

  updateSubscription() {
    this.store.dispatch(new actions.UpdateSubscriptionAction(this.subscription));
  }

  canUpdateSubscription() {
    return !!this.subscription &&
           (this.subscription.plan !== this.currentSubscription.plan ||
           this.subscription.seats !== this.currentSubscription.seats);
  }
}
