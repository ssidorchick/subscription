import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';

import { StoreMock } from 'app/common/ngrx/testing';
import { selectors } from '../ngrx';
import { UpdatedSubscriptionComponent } from './updated.component';

describe('UpdatedSubscriptionComponent', () => {
  const currentSubscription = {plan: 'better', name: 'Better', seats: 2, cost: 4, currency: 'USD'};
  const previousSubscription = {plan: 'good', name: 'Good', seats: 1, cost: 1, currency: 'USD'};
  let component: UpdatedSubscriptionComponent;
  let fixture: ComponentFixture<UpdatedSubscriptionComponent>;
  let store: StoreMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: Store, useClass: StoreMock},
      ],
      declarations: [
        UpdatedSubscriptionComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedSubscriptionComponent);
    component = fixture.debugElement.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    store.mockSelection(selectors.getPrevious, previousSubscription);
    store.mockSelection(selectors.getCurrent, currentSubscription);
    fixture.detectChanges();
  });

  it('should create the UpdatedSubscriptionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render subsciprtions', () => {
    const oldPlanEl = fixture.debugElement.query(By.css('#old-plan')).nativeElement;
    const oldSeatsEl = fixture.debugElement.query(By.css('#old-seats')).nativeElement;
    const oldCostEl = fixture.debugElement.query(By.css('#old-cost')).nativeElement;
    const newPlanEl = fixture.debugElement.query(By.css('#new-plan')).nativeElement;
    const newSeatsEl = fixture.debugElement.query(By.css('#new-seats')).nativeElement;
    const newCostEl = fixture.debugElement.query(By.css('#new-cost')).nativeElement;

    expect(oldPlanEl.textContent).toBe('Good');
    expect(oldSeatsEl.textContent).toBe('1');
    expect(oldCostEl.textContent).toBe('$1');
    expect(newPlanEl.textContent).toBe('Better');
    expect(newSeatsEl.textContent).toBe('2');
    expect(newCostEl.textContent).toBe('$4');
  });
});
