import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Subscription } from '../entities';
import { State, selectors } from '../ngrx';

@Component({
  selector: 'app-previous-subscription',
  templateUrl: './updated.component.html',
  styleUrls: ['./updated.component.scss'],
})
export class UpdatedSubscriptionComponent implements OnInit {
  previuos$: Observable<Subscription>;
  current$: Observable<Subscription>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.previuos$ = this.store.select(selectors.getPrevious);
    this.current$ = this.store.select(selectors.getCurrent);
  }
}
