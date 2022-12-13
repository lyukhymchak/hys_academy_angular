import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewInit {
  items: Map<Product, number>;
  @Input() product: Product;
  counter: number[];
  isVisible: boolean = true;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    console.log(this.items.values());
    this.isVisible = false;
  }

  ngAfterViewInit(): void {
    this.items = this.cartService.getItems();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  isCartEmpty(): boolean {
    return this.items.size ? false : true;
  }

  getTotalPriceOfProducts(): number {
    let totalPrice = 0;

    for (let [key, value] of this.items) {
      totalPrice += key.price * value;
    }

    return totalPrice;
  }

  setCountInc(product: Product) {
    this.cartService.addToCart(product, this.items.get(product)! + 1);
  }

  setCountDec(product: Product) {
    this.cartService.addToCart(product, this.items.get(product)! - 1);
  }
}
