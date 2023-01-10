import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import Product from 'src/app/shared/interfaces/product.interface';
import ProductServer from 'src/app/shared/interfaces/product-server.interface';
import FilterCondition from 'src/app/pages/admin/shared/interfaces/filter-condition.model';
import { SearchService } from '../../../shared/services/search.service';
import { FilterService } from '../../../shared/services/filter.service';
import { ProductHTTPService } from 'src/app/shared/services/product-http.service';
import { ProductModalComponent } from '../../../shared/components/product-modal/product-modal.component';
import { WarningModalComponent } from '../../../shared/components/warning-modal/warning-modal.component';
import { FilterProductOption } from '../../../shared/enums/filter-product-option.enum';

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
    private searchService: SearchService,
    private filterService: FilterService,
    private dialog: MatDialog,
    private productHTTPService: ProductHTTPService
  ) {}

  ngOnInit(): void {
    this.initTable();
  }

  public search(query: string): void {
    this.filteredProducts = this.searchService.searchThroughAllFields(
      query,
      this.products
    );
  }

  public filterByPrice(
    filterCondition: FilterCondition<FilterProductOption, number>
  ): void {
    this.filteredProducts = this.filterService.filterProductsByPrice(
      filterCondition,
      this.products
    );
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        const newProduct: Product = {
          name: result.name,
          price: result.price,
        };

        this.productHTTPService.create(newProduct).subscribe(() => {
          this.initTable();
        });
      }
    });
  }

  public openEditDialog(currentProduct: Product): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { isEdit: true, currentProduct },
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.productHTTPService.update(result).subscribe(() => {
          this.initTable();
        });
      }
    });
  }

  public openDeleteDialog(currentProduct: Product): void {
    const dialogRef = this.dialog.open(WarningModalComponent, {
      data: currentProduct,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'ok') {
        this.productHTTPService
          .remove(String(currentProduct.id))
          .subscribe(() => {
            this.initTable();
          });
      }
    });
  }

  private toProduct(data: ProductServer): Product {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
    };
  }

  private initTable(): void {
    this.loading$.next(true);

    this.productHTTPService
      .getList()
      .pipe(take(1))
      .subscribe((data: ProductServer[]) => {
        this.products = data.map((item: ProductServer) => this.toProduct(item));
        this.filteredProducts = [...this.products];

        this.loading$.next(false);
      });
  }
}
