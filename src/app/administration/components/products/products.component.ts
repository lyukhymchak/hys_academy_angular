import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { ProductsService } from 'src/app/shared/services/products.service';
import Product from 'src/app/store/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  public products$: Observable<Product[]>;
  private destroy$ = new Subject<void>();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productsService.products$.pipe(
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
