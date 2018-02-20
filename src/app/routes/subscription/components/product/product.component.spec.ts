import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  const product = {plan: 'better', name: 'Better', seats: 2, cost: 4, currency: 'USD'};
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.debugElement.componentInstance;
    component.id = 0;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create the ProductComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render product', () => {
    const idEl = fixture.debugElement.query(By.css('.row:nth-of-type(1) span')).nativeElement;
    const planEl = fixture.debugElement.query(By.css('.row:nth-of-type(2) span.value')).nativeElement;
    const seatsEl = fixture.debugElement.query(By.css('.row:nth-of-type(3) span.value')).nativeElement;
    const costEl = fixture.debugElement.query(By.css('.row:nth-of-type(4) span.value')).nativeElement;

    expect(idEl.textContent).toBe('Product 0');
    expect(planEl.textContent).toBe('Better');
    expect(seatsEl.textContent).toBe('2');
    expect(costEl.textContent).toBe('$4');
  });
});
