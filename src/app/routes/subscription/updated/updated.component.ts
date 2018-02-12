import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription as ReactiveSubscription } from 'rxjs/Subscription';

import { Subscription } from '../entities';
import { State, selectors } from '../ngrx';

@Component({
  selector: 'app-previous-subscription',
  templateUrl: './updated.component.html',
  styleUrls: ['./updated.component.scss'],
})
export class UpdatedSubscriptionComponent implements OnInit, OnDestroy {
  previous: Subscription;
  current: Subscription;
  previousSub: ReactiveSubscription;
  currentSub: ReactiveSubscription;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.previousSub = this.store.select(selectors.getPrevious).subscribe(subscription => {
      this.previous = subscription;
    });
    this.currentSub = this.store.select(selectors.getCurrent).subscribe(subscription => {
      this.current = subscription;
    });
  }

  ngOnDestroy() {
    this.previousSub.unsubscribe();
    this.currentSub.unsubscribe();
  }
}
