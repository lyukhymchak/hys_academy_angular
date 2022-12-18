import { Component, Input } from '@angular/core';
import { retryWhen } from 'rxjs';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-tooltip',
  templateUrl: './cart-tooltip.component.html',
  styleUrls: ['./cart-tooltip.component.scss'],
})
export class CartTooltipComponent {
  items: Map<Product, number>;
  visibility: boolean;

  constructor(private cartService: CartService) {}

  public deleteItem(item: Product): void {
    this.cartService.removeFromCart(item);
  }

  public getTotalPriceOfItems() {
    return this.cartService.getTotalPriceOfItems();
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.visibility = this.items.size ? true : false;
  }
}
