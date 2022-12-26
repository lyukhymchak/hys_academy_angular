import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-tooltip',
  templateUrl: './cart-tooltip.component.html',
  styleUrls: ['./cart-tooltip.component.scss'],
})
export class CartTooltipComponent implements OnInit, OnDestroy {
  public cart: Map<Product, number>;
  public totalPrice: number;
  public visibility: boolean;
  private subscription: Subscription;

  constructor(private cartService: CartService) {
    this.visibility = !this.cartService.isCartEmpty();
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();

    this.subscription = this.cartService.cartState$.subscribe((cart) => {
      this.cart = cart;
      this.totalPrice = this.cartService.getTotalPrice();
      this.visibility = !this.cartService.isCartEmpty();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public deleteItem(item: Product): void {
    this.cartService.removeItemFromCart(item);
  }
}
