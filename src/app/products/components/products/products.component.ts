import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import FilterCondition from 'src/app/shared/interfaces/filter-condition.model';

import { FilterService } from 'src/app/shared/services/filter.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SearchService } from 'src/app/shared/services/search.service';
import Product from 'src/app/store/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private productsSubscription: Subscription;

  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public filterOptions = ['Price more than', 'Price less than', 'Equal'];

  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private productsService: ProductsService,
    private searchService: SearchService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.productsSubscription = this.productsService.products$
      .pipe(take(1))
      .subscribe((products) => {
        this.products = products;
        this.filteredProducts = [...products];
        this.loading$.next(false);
      });
  }

  public search(query: string): void {
    this.filteredProducts = this.searchService.searchThroughAllFields(
      query,
      this.products
    );
  }

  public filterByPrice(filterCondition: FilterCondition<string, number>): void {
    this.filteredProducts = this.filterService.filterProductsByPrice(
      filterCondition,
      this.products
    );
  }
}
