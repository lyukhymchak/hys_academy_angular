import { Component, OnInit } from '@angular/core';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: Map<Product, number>;
  buttonClassNames: string;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.buttonClassNames = ['btn-light'].join(' ');
    this.items = this.cartService.getItems();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  isCartEmpty(): boolean {
    return this.items.size ? false : true;
  }

  getTotalPriceOfProducts(): number {
    let totalPrice = 0;

    for (let [key, value] of this.items) {
      totalPrice += key.price * value;
    }

    return totalPrice;
  }
}
