import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

import Product from 'src/app/shared/interfaces/product.interface';
import FilterCondition from 'src/app/pages/admin/shared-admin/interfaces/filter-condition.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SearchService } from '../../../shared-admin/services/search.service';
import { FilterService } from '../../../shared-admin/services/filter.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateModalComponent } from '../../../shared-admin/components/create-modal/create-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public filterOptions = ['Price more than', 'Price less than', 'Equal'];
  public filterType = 'number';

  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private productsService: ProductsService,
    private searchService: SearchService,
    private filterService: FilterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productsService.products$.pipe(take(1)).subscribe((products) => {
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

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }
}
