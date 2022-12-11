import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  private productId: string;

  product: Product;
  buttonClassNames: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.buttonClassNames = ['btn-dark'].join(' ');

    if (this.activatedroute.snapshot.paramMap.get('id')) {
      this.productId = this.activatedroute.snapshot.paramMap.get(
        'id'
      ) as string;
    }

    if (
      this.productsService.products.find((x) => x.id === Number(this.productId))
    ) {
      this.product = this.productsService.products.find(
        (x) => x.id === Number(this.productId)
      ) as Product;
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Your product has been added to the cart!');
  }
}
