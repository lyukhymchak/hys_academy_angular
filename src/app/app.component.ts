import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  products: Array<Product> = [
    {
      id: 1,
      name: 'Bread',
      price: 1,
    },
    {
      id: 2,
      name: 'Milk',
      price: 2,
    },
    {
      id: 3,
      name: 'Sugar',
      price: 1,
    },
    {
      id: 4,
      name: 'Salt',
      price: 2,
    },
    {
      id: 5,
      name: 'Tea',
      price: 1,
    },
    {
      id: 6,
      name: 'Salt',
      price: 2,
    },
    {
      id: 7,
      name: 'Tea',
      price: 1,
    },
    {
      id: 8,
      name: 'Salt',
      price: 2,
    },
  ];
}
