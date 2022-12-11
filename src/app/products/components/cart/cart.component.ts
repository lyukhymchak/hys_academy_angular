import { Component, OnInit } from '@angular/core';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: Product[];
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.items = this.cartService.items;
  }
}
