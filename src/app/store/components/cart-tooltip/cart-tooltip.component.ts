import { Component, Input } from '@angular/core';
import { retryWhen } from 'rxjs';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-tooltip',
  templateUrl: './cart-tooltip.component.html',
  styleUrls: ['./cart-tooltip.component.scss'],
})
export class CartTooltipComponent {
  public cart: Map<Product, number>;
  public totalPrice: number;
  public visibility: boolean;

  constructor(private cartService: CartService) {
    this.visibility = !this.cartService.isCartEmpty();
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();

    this.cartService.cartState$.subscribe((cart) => {
      this.cart = cart;
      this.totalPrice = this.cartService.getTotalPrice();
      this.visibility = !this.cartService.isCartEmpty();
    });
  }

  public deleteItem(item: Product): void {
    this.cartService.removeItemFromCart(item);
  }
}
