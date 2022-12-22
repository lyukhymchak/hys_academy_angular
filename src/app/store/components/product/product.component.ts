import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  public quantity: number;
  public buttonLabel: string;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.quantity = this.cartService.getQuantity(this.product);
    this.buttonLabel = 'Add to cart';
    this.checkButtonLabel(this.cartService.getCart(), this.product);

    this.cartService.cartState$.subscribe((cart) => {
      this.checkButtonLabel(cart, this.product);
    });
  }

  public onProductClick(product: Product): void {
    this.router.navigate(['/store/product', product.id]);
  }

  public addToCart(product: Product, quantity: number): void {
    this.cartService.addItemToCart(product, quantity);
    this.buttonLabel = 'In cart';
  }

  public setCountInc(): void {
    this.quantity++;
    if (this.buttonLabel === 'In cart') {
      this.buttonLabel = 'Refresh cart';
    }
  }

  public setCountDec(): void {
    if (this.quantity > 1) {
      this.quantity--;
      if (this.buttonLabel === 'In cart') {
        this.buttonLabel = 'Refresh cart';
      }
    }
  }

  private checkButtonLabel(cart: Map<Product, number>, product: Product) {
    if (cart.has(this.product)) {
      this.buttonLabel = 'In cart';
    } else {
      this.buttonLabel = 'Add to cart';
    }
  }
}
