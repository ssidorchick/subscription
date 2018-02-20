import { Component, OnDestroy, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, ControlValueAccessor,
  NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators';
import { isEqual } from 'lodash';

import { validateInteger } from 'app/common/validators';
import { planNames, Product } from '../../entities';

const PRODUCT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditableProductComponent),
  multi: true,
};
const PRODUCT_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EditableProductComponent),
  multi: true,
};

@Component({
  selector: 'app-editable-product',
  providers: [PRODUCT_VALUE_ACCESSOR, PRODUCT_VALUE_VALIDATOR],
  templateUrl: './editable-product.component.html',
  styleUrls: ['./editable-product.component.scss'],
})
export class EditableProductComponent implements OnDestroy, ControlValueAccessor, Validator {
  product: Product;
  productForm: FormGroup;
  productFormSub: Subscription;
  plans = Object.keys(planNames).map(plan => ({value: plan, name: planNames[plan]}));
  updating = false;
  onChange;
  onTouched;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      plan: '',
      seats: [1, Validators.compose([
        Validators.required,
        CustomValidators.min(1),
        CustomValidators.max(200000),
        validateInteger,
      ])],
    });

    this.productFormSub = this.productForm.valueChanges.pipe(
      // When FormControl is patched with the same value the valueChanges event is still triggered.
      // Woraround to filter such events.
      distinctUntilChanged((a, b) => isEqual(a, b))
    ).subscribe(changes => {
      this.updating = true;
      this.onChange(changes);
      this.onTouched(changes);
    });
  }

  ngOnDestroy() {
    this.productFormSub.unsubscribe();
  }

  writeValue(value: Product): void {
    this.product = value;
    this.productForm.patchValue(value, {emitEvent: false});
    this.updating = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(c: FormControl) {
    const seatsErrors = this.productForm.controls.seats.errors;
    if (seatsErrors) {
      return {
        seats: seatsErrors,
      };
    }
    return null;
  }
}
