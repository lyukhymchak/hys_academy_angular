import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from 'src/app/shared/services/products.service';
import Product from 'src/app/store/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productsSubscription: Subscription;

  public products: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsSubscription = this.productsService.products$.subscribe(
      (products) => (this.products = products)
    );
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
