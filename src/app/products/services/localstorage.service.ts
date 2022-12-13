import { Injectable } from '@angular/core';
import Product from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  set(items: Map<Product, number>): void {
    localStorage.setItem('cart', JSON.stringify([...items]));
  }

  get(): Map<Product, number> {
    if (JSON.parse(localStorage.getItem('cart')!)) {
      return new Map(JSON.parse(localStorage.getItem('cart')!));
    }

    return new Map();
  }
}
