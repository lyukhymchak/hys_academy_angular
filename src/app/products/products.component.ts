import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private localstorageService: LocalstorageService,
    private cartService: CartService
  ) {
    this.cartService.items = this.localstorageService.get();
  }

  ngOnInit(): void {}
}
