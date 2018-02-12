import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { subscriptionRoutes } from './routes/subscription';

const routes: Routes = [
  ...subscriptionRoutes,
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
