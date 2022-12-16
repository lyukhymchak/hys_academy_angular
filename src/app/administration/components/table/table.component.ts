import { Component, OnInit } from '@angular/core';
import Product from 'src/app/products/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public products: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productsService.products;
  }
}
