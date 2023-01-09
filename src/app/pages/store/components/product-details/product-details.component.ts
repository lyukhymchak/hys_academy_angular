import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import Product from '../../../../shared/interfaces/product.interface';

import { ProductHTTPService } from 'src/app/shared/services/product-http.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private productId: string;
  private productsSubscription: Subscription;

  public loading$ = new BehaviorSubject<boolean>(true);
  public product: Product;
  public quantity: number;
  public buttonLabel: string = 'Add to cart';

  constructor(
    private activatedroute: ActivatedRoute,
    private productsService: ProductHTTPService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this.activatedroute.snapshot.paramMap.get('id')) {
      this.productId = this.activatedroute.snapshot.paramMap.get('id')!;
    }

    this.quantity = this.cartService.getQuantity(this.product);
    this.checkButtonLabel(this.cartService.getCart(), this.product);

    this.productsSubscription = this.productsService
      .getById(this.productId)
      .subscribe((product: Product) => {
        this.product = product;
        this.quantity = this.cartService.getQuantity(this.product);
        this.checkButtonLabel(this.cartService.getCart(), this.product);

        this.loading$.next(false);
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  public addToCart(product: Product, count: number): void {
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

  private checkButtonLabel(cart: Map<Product, number>, product: Product): void {
    cart.has(this.product)
      ? (this.buttonLabel = 'In cart')
      : (this.buttonLabel = 'Add to cart');
  }
}
