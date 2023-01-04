import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Product from '../../../../shared/interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  public cart: Map<Product, number>;
  public totalPrice: number;
  private subscription: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();

    this.subscription = this.cartService.cartState$.subscribe((cart) => {
      this.cart = cart;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeFromCart(product: Product): void {
    this.cartService.removeItemFromCart(product);
  }

  public isCartEmpty(): boolean {
    return this.cartService.isCartEmpty();
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

  public addOneItemToCart(product: Product): void {
    this.cartService.addItemToCart(product, this.cart.get(product)! + 1);
  }

  public removeOneItemFromCart(product: Product): void {
    this.cartService.addItemToCart(product, this.cart.get(product)! - 1);
  }
}
