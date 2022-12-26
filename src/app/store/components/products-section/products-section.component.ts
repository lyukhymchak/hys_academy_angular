import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import Product from '../../interfaces/product.interface';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
})
export class ProductsSectionComponent implements OnInit, OnDestroy {
  private productsSubscription: Subscription;

  public products: Array<Product>;
  public isLoading: boolean;

  constructor(private productsService: ProductsService) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.productsSubscription = this.productsService.products$.subscribe(
      (products) => {
        this.products = products;
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
