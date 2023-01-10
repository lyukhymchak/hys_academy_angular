import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import Product from '../../../shared/interfaces/product.interface';
import { LocalStorageKeys } from '../../../shared/enums/localstorage-keys.enum';
import { LocalStorageService } from '../../../shared/services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: Map<Product, number>;
  private _cartState$ = new Subject<Map<Product, number>>();
  public cartState$ = this._cartState$.asObservable();

  private set cart(cart: Map<Product, number>) {
    this._cart = cart;
    this._cartState$.next(this._cart);
  }

  public get cart(): Map<Product, number> {
    return this._cart;
  }

  constructor(private localStorageService: LocalStorageService) {
    this.cart = this.localStorageService.getData(LocalStorageKeys.CART);
  }

  public addItemToCart(item: Product, quantity: number): void {
    const product = this.findProductInCart(item.id!);

    if (product) {
      if (quantity !== 0) {
        this.cart.set(product, quantity);
      } else {
        this.cart.delete(product);
      }
    } else {
      this.cart.set(item, quantity);
    }

    this.localStorageService.setData(LocalStorageKeys.CART, this.cart);

    this._cartState$.next(this.cart);
  }

  public removeItemFromCart(product: Product): void {
    this.cart.delete(product);

    this.isCartEmpty()
      ? this.localStorageService.clearLocalStorage(LocalStorageKeys.CART)
      : this.localStorageService.setData(LocalStorageKeys.CART, this.cart);

    this._cartState$.next(this.cart);
  }

  public clearCart(): void {
    this.cart.clear();
    this.localStorageService.clearLocalStorage(LocalStorageKeys.CART);

    this._cartState$.next(this.cart);
  }

  public findProductInCart(productId: string): Product | undefined {
    const foundKey = [...this.cart.keys()].find((key) => key.id === productId);
    return foundKey;
  }

  public isProductInCart(productId: string): boolean {
    return this.findProductInCart(productId) ? true : false;
  }

  public getQuantityOfProduct(product: Product): number {
    for (const [key, value] of this.cart) {
      if (key.id === product.id) {
        return value;
      }
    }
    return 0;
  }

  public getTotalQuantityOfItems(): number {
    let totalQuantity = 0;

    for (const [, quantity] of this.cart) {
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
