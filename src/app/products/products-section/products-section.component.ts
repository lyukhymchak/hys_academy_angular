import { Component, OnInit } from '@angular/core';
import Product from '../interfaces/product.interface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
})
export class ProductsSectionComponent implements OnInit {
  products: Array<Product>;
  buttonClassNames: string[] = ['button', 'btn-load'];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }
}
