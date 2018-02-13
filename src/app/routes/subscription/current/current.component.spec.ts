import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { StoreMock } from 'app/common/ngrx/testing';
import { selectors, actions } from '../ngrx';
import { CurrentSubscriptionComponent } from './current.component';

describe('CurrentSubscriptionComponent', () => {
  const subscription = {plan: 'good', name: 'Good', seats: 1, cost: 1, currency: 'USD'};
  let component: CurrentSubscriptionComponent;
  let fixture: ComponentFixture<CurrentSubscriptionComponent>;
  let store: StoreMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
      ],
      providers: [
        {provide: Store, useClass: StoreMock},
      ],
      declarations: [
        CurrentSubscriptionComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSubscriptionComponent);
    component = fixture.debugElement.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create the CurrentSubscription component', () => {
    expect(component).toBeTruthy();
  });

  it('should render subsciprtion', () => {
    store.mockSelection(selectors.getSubscription, subscription);
    fixture.detectChanges();
    const seatsEl = fixture.debugElement.query(By.css('#seats-input')).nativeElement;
    const selectedPlanEl = fixture.debugElement.query(By.css('#plan-input option:checked')).nativeElement;
    const costEl = fixture.debugElement.query(By.css('#cost-value')).nativeElement;

    expect(store.dispatch).toHaveBeenCalledWith(new actions.GetCurrentAction());
    expect(+seatsEl.value).toBe(1);
    expect(selectedPlanEl.textContent).toBe('Good');
    expect(costEl.textContent).toBe('$1');
  });

  it('should dispatch action to get preview when seats changed', () => {
    store.mockSelection(selectors.getSubscription, subscription);
    fixture.detectChanges();
    const seatsEl = fixture.debugElement.query(By.css('#seats-input')).nativeElement;
    seatsEl.value = 2;
    seatsEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new actions.GetPreviewAction({plan: 'good', seats: 2}));
  });

  it('should dispatch action to get preview when plan changed', () => {
    store.mockSelection(selectors.getSubscription, subscription);
    fixture.detectChanges();
    const selectPlanEl = fixture.debugElement.query(By.css('#plan-input')).nativeElement;
    selectPlanEl.value = 'basic';
    selectPlanEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new actions.GetPreviewAction({plan: 'basic', seats: 1}));
  });

  it('should dispatch action to update subscription when can update', () => {
    store.mockSelection(selectors.getSubscription, subscription);
    store.mockSelection(selectors.getCanUpdate, true);
    fixture.detectChanges();
    const submitButtonEl = fixture.debugElement.query(By.css('.button-section button')).nativeElement;
    submitButtonEl.click();

    expect(store.dispatch).toHaveBeenCalledWith(new actions.UpdateAction(subscription));
  });

  it('should disable update subscription button when form is invalid', () => {
    store.mockSelection(selectors.getSubscription, subscription);
    store.mockSelection(selectors.getCanUpdate, true);
    fixture.detectChanges();
    const submitButtonEl = fixture.debugElement.query(By.css('.button-section button')).nativeElement;
    const seatsEl = fixture.debugElement.query(By.css('#seats-input')).nativeElement;
    seatsEl.value = 0;
    seatsEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButtonEl.disabled).toBe(true);
  });
});
