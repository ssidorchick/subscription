import { Component, Input } from '@angular/core';

import { Product } from '../../entities';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() id: number;
  @Input() product: Product;
}
