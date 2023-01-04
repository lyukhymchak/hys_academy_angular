import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageKeys } from '../enums/localstorage-keys.enum';
import Product from '../../../shared/interfaces/product.interface';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Map<Product, number> = new Map();
  private cartChanged = new Subject<Map<Product, number>>();
  public cartState$ = this.cartChanged.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  public addItemToCart(item: Product, quantity: number): void {
    if (quantity !== 0) {
      this.cart.set(item, quantity);
    } else {
      this.cart.delete(item);
    }

    this.localStorageService.setData(LocalStorageKeys.CART, this.cart);

    this.cartChanged.next(this.cart);
  }

  public removeItemFromCart(product: Product): void {
    this.cart.delete(product);

    this.isCartEmpty()
      ? this.localStorageService.clearLocalStorage(LocalStorageKeys.CART)
      : this.localStorageService.setData(LocalStorageKeys.CART, this.cart);

    this.cartChanged.next(this.cart);
  }

  public clearCart(): void {
    this.cart.clear();
    this.localStorageService.clearLocalStorage(LocalStorageKeys.CART);

    this.cartChanged.next(this.cart);
  }

  public getCart(): Map<Product, number> {
    return this.cart;
  }

  public setCart(cart: Map<Product, number>): void {
    this.cart = cart;
  }

  public getQuantity(product: Product): number {
    return this.cart.get(product) || 1;
  }

  public getTotalQuantityOfItems(): number {
    let totalQuantity = 0;

    for (const [item, quantity] of this.cart) {
      totalQuantity += quantity;
    }

    return totalQuantity;
  }

  public getTotalPrice(): number {
    let totalPrice = 0;

    for (let [item, quantity] of this.cart) {
      totalPrice += item.price * quantity;
    }

    return totalPrice;
  }

  public isCartEmpty(): boolean {
    return this.cart.size === 0;
  }
}
