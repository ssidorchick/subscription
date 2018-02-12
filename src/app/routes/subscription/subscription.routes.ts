import { Routes } from '@angular/router';

import { SubscriptionComponent } from './subscription.component';
import { CurrentSubscriptionComponent } from './current/current.component';
import { UpdatedSubscriptionComponent } from './updated/updated.component';

export const subscriptionRoutes: Routes = [
  {
    path: 'subscription',
    component: SubscriptionComponent,
    children: [{
      path: 'current',
      component: CurrentSubscriptionComponent,
    }, {
      path: 'updated',
      component: UpdatedSubscriptionComponent,
    }],
  },
  {
    path: '',
    redirectTo: '/subscription',
    pathMatch: 'full',
  },
];
