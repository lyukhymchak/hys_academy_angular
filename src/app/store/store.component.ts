import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { LocalStorageService } from './services/localstorage.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.setItems(this.localStorageService.getData());
  }
}
