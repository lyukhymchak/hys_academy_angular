import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { LocalStorageService } from './services/localstorage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.setItems(this.localStorageService.getData());
  }
}
