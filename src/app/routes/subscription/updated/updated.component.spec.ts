import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';

import { StoreMock } from 'app/common/ngrx/testing';
import { getChildComponentByCSS } from 'app/common/components/testing';
import { selectors } from '../ngrx';
import { ProductComponentMock } from '../components/testing';
import { UpdatedSubscriptionComponent } from './updated.component';

describe('UpdatedSubscriptionComponent', () => {
  const currentSubscription = {products: [{plan: 'better', name: 'Better', seats: 2, cost: 4, currency: 'USD'}]};
  const previousSubscription = {products: [{plan: 'good', name: 'Good', seats: 1, cost: 1, currency: 'USD'}]};
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
        ProductComponentMock,
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
    const productSelector = (column) => `.column:nth-of-type(${column}) app-product`;
    const oldProduct = getChildComponentByCSS<ProductComponentMock>(fixture, ProductComponentMock, productSelector(1));
    const newProduct = getChildComponentByCSS<ProductComponentMock>(fixture, ProductComponentMock, productSelector(2));
    expect(oldProduct.id).toBe(0);
    expect(oldProduct.product).toEqual(previousSubscription.products[0]);
    expect(newProduct.id).toBe(0);
    expect(newProduct.product).toEqual(currentSubscription.products[0]);
  });
});
