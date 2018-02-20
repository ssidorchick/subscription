import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';

import { StoreMock } from 'app/common/ngrx/testing';
import { selectors, actions } from '../ngrx';
import { EditableProductComponentMock } from '../components/testing';
import { CurrentSubscriptionComponent } from './current.component';

describe('CurrentSubscriptionComponent', () => {
  const product = {plan: 'good', name: 'Good', seats: 1, cost: 1, currency: 'USD'};
  const subscription = {products: [product]};
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
        EditableProductComponentMock,
        CurrentSubscriptionComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSubscriptionComponent);
    component = fixture.debugElement.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    spyOn(store, 'dispatch');
    store.mockSelection(selectors.getEditableSubscription, subscription);
    store.mockSelection(selectors.getCanUpdate, true);
    store.mockSelection(selectors.getApiError, null);
    fixture.detectChanges();
  });

  it('should create the CurrentSubscription component', () => {
    expect(component).toBeTruthy();
  });

  it('should request for subsciprtion on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new actions.GetCurrentSubscriptionAction());
  });

  it('should dispatch action to get preview when seats changed', () => {
    const productFormArray = component.subscriptionForm.controls.products as FormArray;
    const productForm = (productFormArray.controls[0] as FormGroup).controls.product;
    productForm.patchValue({plan: 'good', seats: 2});

    expect(store.dispatch).toHaveBeenCalledWith(new actions.GetProductPreviewAction({plan: 'good', seats: 2}, 0));
  });

  it('should dispatch action to get preview when plan changed', () => {
    const productFormArray = component.subscriptionForm.controls.products as FormArray;
    const productForm = (productFormArray.controls[0] as FormGroup).controls.product;
    productForm.patchValue({plan: 'basic', seats: 1});

    expect(store.dispatch).toHaveBeenCalledWith(new actions.GetProductPreviewAction({plan: 'basic', seats: 1}, 0));
  });

  it('should dispatch action to update subscription when can update', () => {
    const submitButtonEl = fixture.debugElement.query(By.css('.button-section button')).nativeElement;
    submitButtonEl.click();

    expect(store.dispatch).toHaveBeenCalledWith(new actions.UpdateSubscriptionAction());
  });

  it('should disable update subscription button when form is invalid', () => {
    component.subscriptionForm.setErrors({error: true});
    fixture.detectChanges();

    const submitButtonEl = fixture.debugElement.query(By.css('.button-section button')).nativeElement;
    expect(submitButtonEl.disabled).toBe(true);
  });
});
