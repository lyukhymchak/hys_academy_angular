import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import Product from '../../../../shared/interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-tooltip',
  templateUrl: './cart-tooltip.component.html',
  styleUrls: ['./cart-tooltip.component.scss'],
})
export class CartTooltipComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public cart: Map<Product, number>;
  public totalPrice: number;
  public visibility: boolean;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.setCartToolTip();

    this.subscription = this.cartService.cartState$.subscribe(() => {
      this.setCartToolTip();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeProduct(item: Product): void {
    this.cartService.removeItemFromCart(item);
  }

  private setCartToolTip(): void {
    this.cart = this.cartService.cart;
    this.totalPrice = this.cartService.getTotalPrice();
    this.visibility = !this.cartService.isCartEmpty();
  }
}
