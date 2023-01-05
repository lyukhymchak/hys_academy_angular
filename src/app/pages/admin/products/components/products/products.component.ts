import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import Product from 'src/app/shared/interfaces/product.interface';
import FilterCondition from 'src/app/pages/admin/shared-admin/interfaces/filter-condition.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SearchService } from '../../../shared-admin/services/search.service';
import { FilterService } from '../../../shared-admin/services/filter.service';
import { ProductModalComponent } from '../../../shared-admin/components/product-modal/product-modal.component';

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
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Create modal');
        console.log(result);
        const newProduct: Product = {
          id: this.products.length + 1,
          name: result.name,
          price: result.price,
        };
        console.log(newProduct);
        this.productsService.addProduct(newProduct);
      }
    });
  }

  public openEditDialog(item: Product): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { isEdit: true, item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Edit modal');
        console.log(result);
      }
    });
  }
}
