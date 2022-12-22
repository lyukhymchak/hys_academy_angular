import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../services/cart.service';
import Product from '../../interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public product: Product;
  public quantity: number;
  public buttonLabel: string = 'Add to cart';
  private destroy$ = new Subject<void>();

  constructor(
    private activatedroute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.product = this.activatedroute.snapshot.data['product'];

    this.productsService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.quantity = this.cartService.getQuantity(this.product);
        this.checkButtonLabel(this.cartService.getCart(), this.product);
      });

    this.cartService.cartState$.subscribe((cart) => {
      this.quantity = this.cartService.getQuantity(this.product);
      this.checkButtonLabel(cart, this.product);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
