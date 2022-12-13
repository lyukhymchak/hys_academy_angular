import { Component, Input, OnInit } from '@angular/core';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() count: number;

  buttonLabel = 'Add to cart';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.count = this.cartService.getCountOfItem(this.product);
  }

  addToCart(product: Product, count: number) {
    this.cartService.addToCart(product, count);
    this.buttonLabel = 'In cart';
  }

  setCountInc() {
    this.count++;
    this.buttonLabel = 'Add to cart';
  }

  setCountDec() {
    if (this.count > 1) {
      this.count--;
      this.buttonLabel = 'Add to cart';
    }
  }
}
