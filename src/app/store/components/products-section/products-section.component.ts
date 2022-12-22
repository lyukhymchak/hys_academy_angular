import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import Product from '../../interfaces/product.interface';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
})
export class ProductsSectionComponent implements OnInit {
  public products: Array<Product>;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProductsAsync().subscribe((products) => {
      this.products = products;
    });
  }
}
