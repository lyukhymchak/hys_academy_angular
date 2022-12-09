import { Component, OnInit } from '@angular/core';
import Product from '../interfaces/product.interface';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
})
export class ProductsSectionComponent implements OnInit {
  products: Array<Product>;
  buttonClassNames: string[] = ['button', 'btn-load'];

  constructor() {}

  ngOnInit(): void {
    this.products = this.getProducts();
  }

  getProducts(count: number = 8): Array<Product> {
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
      const productPrice: number = 2 + this.getRandomInteger(5);

      data.push({ id: i + 1, name: productName, price: productPrice });
    }

    return data;
  }

  getRandomInteger(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
