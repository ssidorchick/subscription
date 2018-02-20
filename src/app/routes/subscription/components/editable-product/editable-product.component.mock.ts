import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor,
  NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

import { Product } from '../../entities';

const PRODUCT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditableProductComponentMock),
  multi: true,
};
const PRODUCT_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EditableProductComponentMock),
  multi: true,
};

@Component({
  selector: 'app-editable-product',
  providers: [PRODUCT_VALUE_ACCESSOR, PRODUCT_VALUE_VALIDATOR],
  template: '',
})
export class EditableProductComponentMock implements ControlValueAccessor, Validator {
  writeValue(value: Product): void { }

  registerOnChange(fn: any): void { }

  registerOnTouched(fn: any): void { }

  validate(c: FormControl) {
    return null;
  }
}
