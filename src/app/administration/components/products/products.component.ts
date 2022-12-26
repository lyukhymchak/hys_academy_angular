import { Component } from '@angular/core';

import { map, Observable, Subject, takeUntil } from 'rxjs';

import { ProductsService } from 'src/app/shared/services/products.service';
import { SearchService } from 'src/app/shared/services/services.service';
import Product from 'src/app/store/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  public products$: Observable<Product[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsService.products$.pipe(
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public search(value: string): void {
    this.products$ = this.productsService.products$.pipe(
      map((products) =>
        products.filter((product: Product) =>
          this.searchService.searchInObject(value, product)
        )
      ),
      takeUntil(this.destroy$)
    );
  }
}
