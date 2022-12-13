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
  buttonClassNames: string;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.buttonClassNames = ['btn-light'].join(' ');
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
