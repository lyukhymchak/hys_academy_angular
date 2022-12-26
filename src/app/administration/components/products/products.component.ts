import { Component } from '@angular/core';

import { ProductsService } from 'src/app/shared/services/products.service';
import Product from 'src/app/store/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  public products: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productsService.products;
  }
}
