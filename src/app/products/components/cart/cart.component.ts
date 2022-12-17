import { Component, OnInit } from '@angular/core';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public items: Map<Product, number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  public removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  public isCartEmpty(): boolean {
    return this.items.size ? false : true;
  }

  public getTotalPriceOfProducts(): number {
    let totalPrice = 0;

    for (let [key, value] of this.items) {
      totalPrice += key.price * value;
    }

    return totalPrice;
  }

  public setCountInc(product: Product): void {
    this.cartService.addToCart(product, this.items.get(product)! + 1);
  }

  public setCountDec(product: Product): void {
    this.cartService.addToCart(product, this.items.get(product)! - 1);
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }
}
