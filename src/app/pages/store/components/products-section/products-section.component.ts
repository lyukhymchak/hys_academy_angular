import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductHTTPService } from 'src/app/shared/services/product-http.service';
import Product from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
})
export class ProductsSectionComponent implements OnInit, OnDestroy {
  private productsSubscription: Subscription;

  public products: Product[];
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(private productsService: ProductHTTPService) {}

  ngOnInit(): void {
    this.productsSubscription = this.productsService
      .getList()
      .subscribe((products) => {
        this.products = products;
        this.loading$.next(false);
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
