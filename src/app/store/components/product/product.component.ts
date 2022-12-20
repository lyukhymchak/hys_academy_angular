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
  public count: number;
  public buttonLabel: string;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.count = this.cartService.getCountOfItem(this.product);
    this.buttonLabel = 'Add to cart';
  }

  public addToCart(product: Product, count: number): void {
    this.cartService.addToCart(product, count);
    this.buttonLabel = 'In cart';
  }

  public setCountInc(): void {
    this.count++;
    if (this.buttonLabel === 'In cart') {
      this.buttonLabel = 'Refresh cart';
    }
  }

  public setCountDec(): void {
    if (this.count > 1) {
      this.count--;
      if (this.buttonLabel === 'In cart') {
        this.buttonLabel = 'Refresh cart';
      }
    }
  }
}
