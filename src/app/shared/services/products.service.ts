import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import Product from 'src/app/shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public products$: Observable<Product[]>;

  constructor() {
    this.products$ = this.getProducts();
  }

  public getProducts(): Observable<Product[]> {
    return of(this.generateProducts(50)).pipe(delay(500));
  }

  private generateProducts(count: number = 8): Array<Product> {
    const producers: string[] = [
      'Starbucks',
      'Nespresso',
      'Jacobs',
      'Lavazza',
      'Costa Coffee ',
      'Illy',
      'Kimbo',
      'Movenpick',
      'Tchibo',
      'Odeska kava',
    ];

    const typeOfDrink: string[] = [
      'Espresso',
      'Double Espresso',
      'Americano',
      'Cappuccino',
      'Flat White',
      'Cafe Latte',
      'Vienna',
      'Mocha',
      'Macchiato',
      'Iced Coffee',
    ];

    const data = new Array<Product>();

    for (let i = 0; i < count; i++) {
      const productName: string =
        typeOfDrink[this.getRandomInteger(typeOfDrink.length)] +
        ' ' +
        producers[this.getRandomInteger(producers.length)];
      const productPrice: number = 10 + this.getRandomInteger(70);

      data.push({ id: i + 1, name: productName, price: productPrice });
    }

    return data;
  }

  private getRandomInteger(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public addProduct(product: Product): void {
    this.products$ = this.products$.pipe(
      map((products: Product[]) => {
        return [...products, product];
      })
    );
  }

  public editProduct(product: Product): void {
    this.products$ = this.products$.pipe(
      map((products: Product[]) =>
        products.map((elementOfProducts: Product) =>
          elementOfProducts.id === product.id ? product : elementOfProducts
        )
      )
    );
  }

  public deleteProduct(product: Product): void {
    this.products$ = this.products$.pipe(
      map((products: Product[]) => {
        return products.filter(
          (elementOfProducts: Product) =>
            !(
              elementOfProducts.id === product.id &&
              elementOfProducts.name === product.name
            )
        );
      })
    );
  }
}
