import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../services/cart.service';
import Product from '../../interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  private productId: string;
  public product: Product;
  public quantity: number;
  public buttonLabel: string = 'Add to cart';

  constructor(
    private activatedroute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
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

    this.quantity = this.cartService.getQuantity(this.product);
    this.checkButtonLabel(this.cartService.getCart(), this.product);

    this.cartService.cartState$.subscribe((cart) => {
      this.quantity = this.cartService.getQuantity(this.product);
      this.checkButtonLabel(cart, this.product);
    });
  }

  public addToCart(product: Product, count: number) {
    this.cartService.addItemToCart(product, count);
    this.buttonLabel = 'In cart';
  }

  public setCountInc(): void {
    this.quantity++;
    if (this.buttonLabel === 'In cart') {
      this.buttonLabel = 'Refresh cart';
    }
  }

  public setCountDec(): void {
    if (this.quantity > 1) {
      this.quantity--;
      if (this.buttonLabel === 'In cart') {
        this.buttonLabel = 'Refresh cart';
      }
    }
  }

  private checkButtonLabel(cart: Map<Product, number>, product: Product) {
    if (cart.has(this.product)) {
      this.buttonLabel = 'In cart';
    } else {
      this.buttonLabel = 'Add to cart';
    }
  }
}
