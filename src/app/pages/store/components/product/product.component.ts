import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import Product from '../../../../shared/interfaces/product.interface';
import { CartButtonLabels } from '../../enums/cart-button-labels.enum';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  private subscription: Subscription;

  public quantity: number = 1;
  public buttonLabel: string = CartButtonLabels.AddToCart;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.quantity = this.getQuantity();
    this.checkButtonLabel(this.cartService.cart);

    this.subscription = this.cartService.cartState$.subscribe((cart) => {
      this.quantity = this.getQuantity();
      this.checkButtonLabel(cart);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addToCart(product: Product, quantity: number): void {
    this.cartService.addItemToCart(product, quantity);
    this.buttonLabel = CartButtonLabels.InCart;
  }

  public setCountInc(): void {
    this.quantity++;
    if (this.buttonLabel === CartButtonLabels.InCart) {
      this.buttonLabel = CartButtonLabels.RefreshCart;
    }
  }

  public setCountDec(): void {
    if (this.quantity > 1) {
      this.quantity--;
      if (this.buttonLabel === CartButtonLabels.InCart) {
        this.buttonLabel = CartButtonLabels.RefreshCart;
      }
    }
  }

  private checkButtonLabel(cart: Map<Product, number>) {
    this.cartService.isProductInCart(this.product.id!)
      ? (this.buttonLabel = CartButtonLabels.InCart)
      : (this.buttonLabel = CartButtonLabels.AddToCart);
  }

  private getQuantity(): number {
    const quantity: number = this.cartService.getQuantityOfProduct(
      this.product
    );

    return quantity ? quantity : 1;
  }
}
