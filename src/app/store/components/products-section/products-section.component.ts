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
  public products: Array<Product>;
  public showSpinner: boolean;
  private subscription: Subscription;

  constructor(private productsService: ProductsService) {
    this.showSpinner = true;
  }

  ngOnInit(): void {
    this.subscription = this.productsService.products$.subscribe((products) => {
      this.products = products;
      this.showSpinner = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
