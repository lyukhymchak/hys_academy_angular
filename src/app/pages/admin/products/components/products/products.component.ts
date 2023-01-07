import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import Product from 'src/app/shared/interfaces/product.interface';
import FilterCondition from 'src/app/pages/admin/shared-admin/interfaces/filter-condition.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SearchService } from '../../../shared-admin/services/search.service';
import { FilterService } from '../../../shared-admin/services/filter.service';
import { ProductModalComponent } from '../../../shared-admin/components/product-modal/product-modal.component';
import { WarningModalComponent } from '../../../shared-admin/components/warning-modal/warning-modal.component';
import { ProductHTTPService } from 'src/app/shared/services/product-http.service';

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
    private dialog: MatDialog,
    private productHTTPService: ProductHTTPService
  ) {}

  ngOnInit(): void {
    this.productHTTPService.getList().subscribe((data) => {
      this.products = data.map((item) => this.createNewProduct(item));
      this.filteredProducts = [...this.products];
      this.loading$.next(false);
    });

    // this.productHTTPService
    //   .getById('810d7892-0ec6-45dd-ac22-206fe28afd45')
    //   .subscribe((product) => console.log(product));\

    // const product: Product = { id: 2, name: 'Espresso new', price: 25 };
    // this.productHTTPService.create(product).subscribe();

    // this.productHTTPService
    //   .remove('e13840f5-66cc-4a6d-bbc8-0653ef64de27')
    //   .subscribe();

    //  const updatedProduct: Product = { id: 2, name: 'Espresso new', price: 100 };
    // this.productHTTPService
    //   .update('b1a5e5b7-ed0f-4016-93d5-f9d8e922e1a5', updatedProduct)
    //   .subscribe();
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
        const newProduct: Product = {
          id: this.products.length + 1,
          name: result.name,
          price: result.price,
        };

        this.productsService.addProduct(newProduct);
        this.productsService.products$.pipe(take(1)).subscribe((products) => {
          this.products = products;
          this.filteredProducts = [...products];
        });
      }
    });
  }

  public openEditDialog(item: Product): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { isEdit: true, item },
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.productsService.editProduct(result);
        this.productsService.products$.pipe(take(1)).subscribe((products) => {
          this.products = products;
          this.filteredProducts = [...products];
        });
      }
    });
  }

  public openDeleteDialog(item: Product): void {
    const dialogRef = this.dialog.open(WarningModalComponent, {
      data: { item },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'ok') {
        this.productsService.deleteProduct(item);
        this.productsService.products$.pipe(take(1)).subscribe((products) => {
          this.products = products;
          this.filteredProducts = [...products];
        });
      }
    });
  }

  private createNewProduct(data: any): Product {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
    };
  }
}
