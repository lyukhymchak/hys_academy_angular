import { Injectable } from '@angular/core';
import Product from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setData(items: Map<Product, number>): void {
    localStorage.setItem('cart', JSON.stringify([...items]));
  }

  public getData(): Map<Product, number> {
    if (localStorage.getItem('cart')) {
      return new Map(JSON.parse(localStorage.getItem('cart')!));
    }

    return new Map();
  }
}
