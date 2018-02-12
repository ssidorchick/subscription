import { FormControl } from '@angular/forms';

export function validateInteger(c: FormControl) {
  if (!isNaN(c.value) &&
      parseFloat(c.value) === parseInt(c.value)) {
    return null;
  }
  return {integer: true};
}
