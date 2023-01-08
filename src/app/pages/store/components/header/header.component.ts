import { Component, OnInit } from '@angular/core';
import Product from '../../../../shared/interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  public isCartEmpty(): boolean {
    return !this.cartService.isCartEmpty();
  }

  public getTotalQuantityOfItems(): number {
    return this.cartService.getTotalQuantityOfItems();
  }
}
