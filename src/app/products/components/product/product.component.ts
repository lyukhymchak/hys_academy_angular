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
  buttonLabel: string;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.count = this.cartService.getCountOfItem(this.product);
    this.buttonLabel = 'Add to cart';
  }

  addToCart(product: Product, count: number): void {
    this.cartService.addToCart(product, count);
    this.buttonLabel = 'In cart';
  }

  setCountInc(): void {
    this.count++;
    if (this.buttonLabel === 'In cart') {
      this.buttonLabel = 'Refresh cart';
    }
  }

  setCountDec(): void {
    if (this.count > 1) {
      this.count--;
      if (this.buttonLabel === 'In cart') {
        this.buttonLabel = 'Refresh cart';
      }
    }
  }
}
