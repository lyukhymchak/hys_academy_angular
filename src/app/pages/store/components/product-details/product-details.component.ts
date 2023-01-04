import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import Product from '../../../../shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private productId: number;
  private productsSubscription: Subscription;

  public loading$ = new BehaviorSubject<boolean>(true);
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
      this.productId = parseInt(
        this.activatedroute.snapshot.paramMap.get('id')!
      );
    }

    this.quantity = this.cartService.getQuantity(this.product);
    this.checkButtonLabel(this.cartService.getCart(), this.product);

    this.productsSubscription = this.productsService.products$.subscribe(
      (products: Product[]) => {
        this.product = products.find((x: Product) => x.id === this.productId)!;
        this.quantity = this.cartService.getQuantity(this.product);
        this.checkButtonLabel(this.cartService.getCart(), this.product);

        this.loading$.next(false);
      }
    );
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
