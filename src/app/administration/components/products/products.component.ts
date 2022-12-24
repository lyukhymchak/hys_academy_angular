import { Component, ViewChild } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';

import { ProductsService } from 'src/app/shared/services/products.service';
import Product from 'src/app/store/interfaces/product.interface';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  public products$: Observable<Product[]>;
  private destroy$ = new Subject<void>();

  @ViewChild(SearchComponent, { static: false })
  searchComponentProducts: SearchComponent;

  searchItemsInProductsList(query: any) {
    this.products$ = this.productsService.products$.pipe(
      map((products) =>
        products.filter((product: Product) => {
          return this.searchComponentProducts.searchExpression(product);
        })
      ),
      takeUntil(this.destroy$)
    );
  }

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
