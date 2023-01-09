import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  limit = 8;

  constructor(private productsService: ProductHTTPService) {}

  ngOnInit(): void {
    this.productsSubscription = this.productsService
      .getListLimited(this.limit)
      .subscribe((products) => {
        this.products = products;
        this.loading$.next(false);
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  loadMore() {
    this.loading$.next(true);
    this.limit += 4;
    this.productsSubscription = this.productsService
      .getListLimited(this.limit)
      .subscribe((products) => {
        this.products = products;
        this.loading$.next(false);
      });
  }
}
