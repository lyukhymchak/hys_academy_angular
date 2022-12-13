import { Component, OnInit } from '@angular/core';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: Map<Product, number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  isCartEmpty(): boolean {
    return this.items.size ? true : false;
  }

  getCountOfItems(): number {
    let count = 0;

    for (let value of this.items.values()) {
      count += value;
    }

    return count;
  }
}