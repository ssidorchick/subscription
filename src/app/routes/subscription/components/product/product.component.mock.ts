import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  template: '',
})
export class ProductComponentMock {
  @Input() id;
  @Input() product;
}
