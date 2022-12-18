import { Injectable } from '@angular/core';
import Product from '../interfaces/product.interface';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Map<Product, number>;

  constructor(private localStorageService: LocalStorageService) {
    this.items = new Map();
  }

  public addToCart(product: Product, count: number): void {
    if (count !== 0) {
      this.items.set(product, count);
    } else {
      this.removeFromCart(product);
    }

    this.localStorageService.setData(this.items);
  }

  public removeFromCart(product: Product): void {
    if (this.items.has(product)) {
      this.items.delete(product);
    }

    this.localStorageService.setData(this.items);
  }

  public getItems(): Map<Product, number> {
    return this.items;
  }

  public setItems(items: Map<Product, number>): void {
    this.items = items;
  }

  public getCountOfItem(product: Product): number {
    return this.items.get(product) ? this.items.get(product)! : 1;
  }

  public getTotalPriceOfItems(): number {
    let totalPrice = 0;

    for (let [key, value] of this.items) {
      totalPrice += key.price * value;
    }

    return totalPrice;
  }

  public clearCart(): void {
    this.items.clear();
  }
}
