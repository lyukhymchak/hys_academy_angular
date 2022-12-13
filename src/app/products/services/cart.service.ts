import { Injectable } from '@angular/core';
import Product from '../interfaces/product.interface';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Map<Product, number>;

  constructor(private localstorageService: LocalstorageService) {
    this.items = new Map();
  }

  addToCart(product: Product, count: number): void {
    if (count !== 0) {
      this.items.set(product, count);
    } else {
      this.removeFromCart(product);
    }
    this.localstorageService.set(this.items);
  }

  removeFromCart(product: Product): void {
    if (this.items.has(product)) {
      this.items.delete(product);
    }
    this.localstorageService.set(this.items);
  }

  getItems(): Map<Product, number> {
    return this.items;
  }

  getCountOfItem(product: Product): number {
    return this.items.get(product) ? this.items.get(product)! : 1;
  }

  clearCart(): void {
    this.items.clear();
  }
}
