import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { SubscriptionEffects } from './ngrx';
import { SubscriptionService } from './services';
import { SubscriptionComponent } from './subscription.component';
import { CurrentSubscriptionComponent } from './current/current.component';
import { UpdatedSubscriptionComponent } from './updated/updated.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    CustomFormsModule,
    EffectsModule.forFeature([SubscriptionEffects]),
  ],
  providers: [
    SubscriptionEffects,
    SubscriptionService,
  ],
  declarations: [
    SubscriptionComponent,
    CurrentSubscriptionComponent,
    UpdatedSubscriptionComponent,
  ],
})
export class SubscriptionModule { }
