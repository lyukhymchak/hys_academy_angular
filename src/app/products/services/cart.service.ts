import { Injectable } from '@angular/core';
import Product from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Map<Product, number>;

  constructor() {
    this.items = new Map();
  }

  addToCart(product: Product): void {
    if (!this.items.has(product)) {
      this.items.set(product, 1);
    } else {
      this.items.set(product, this.items.get(product)! + 1);
    }
  }

  removeFromCart(product: Product): void {
    if (this.items.has(product)) {
      this.items.delete(product);
    }
  }

  getItems(): Map<Product, number> {
    return this.items;
  }

  clearCart(): void {
    this.items.clear();
  }
}
