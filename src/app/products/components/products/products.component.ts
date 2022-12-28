import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import FilterCondition from 'src/app/shared/interfaces/filter-condition.model';

import { ProductsService } from 'src/app/shared/services/products.service';
import { SearchService } from 'src/app/shared/services/search.service';
import Product from 'src/app/store/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productsSubscription: Subscription;

  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public filterOptions = ['Price more than', 'Price less than', 'Equal'];

  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private productsService: ProductsService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.productsSubscription = this.productsService.products$.subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = [...products];
        this.loading$.next(false);
      }
    );
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  public search(query: string): void {
    this.filteredProducts = this.searchService.searchThroughAllFields(
      query,
      this.products
    );
  }

  public filterByPrice(filterData: FilterCondition<string, number>): void {
    if (filterData.selectedOptionValue === 'Price more than') {
      this.filteredProducts = this.products.filter(
        (item) => item.price > filterData.inputValue
      );
    } else if (filterData.selectedOptionValue === 'Price less than') {
      this.filteredProducts = this.products.filter(
        (item) => item.price < filterData.inputValue
      );
    } else if (filterData.selectedOptionValue === 'Equal') {
      this.filteredProducts = this.products.filter(
        (item) => item.price === filterData.inputValue
      );
    }
  }
}
