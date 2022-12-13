import { Component, OnInit } from '@angular/core';
import Product from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
})
export class ProductsSectionComponent implements OnInit {
  products: Array<Product>;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productsService.products;
  }
}