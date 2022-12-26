import { Component } from '@angular/core';

import { Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { ProductsService } from 'src/app/shared/services/products.service';
import { SearchService } from 'src/app/shared/services/search.service';
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
      switchMap((products) => this.searchService.search('', products)),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public search(value: string): void {
    this.products$ = this.productsService.products$.pipe(
      switchMap((products) => this.searchService.search(value, products)),
      takeUntil(this.destroy$)
    );
  }
}
