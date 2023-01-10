import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import Product from '../../../../shared/interfaces/product.interface';

import { ProductHTTPService } from 'src/app/shared/services/product-http.service';
import ProductServer from 'src/app/shared/interfaces/product-server.interface';
import { CartButtonLabels } from '../../enums/cart-button-labels.enum';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private productId: string;
  private productsSubscription: Subscription;
  private cartSubscription: Subscription;

  public loading$ = new BehaviorSubject<boolean>(true);
  public product: Product;

  public quantity: number = 1;
  public buttonLabel: string = CartButtonLabels.AddToCart;

  constructor(
    private activatedroute: ActivatedRoute,
    private productsService: ProductHTTPService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this.activatedroute.snapshot.paramMap.get('id')) {
      this.productId = this.activatedroute.snapshot.paramMap.get('id')!;
    }

    this.productsSubscription = this.productsService
      .getById(this.productId)
      .subscribe((product: ProductServer) => {
        this.product = {
          id: product.id,
          price: product.price,
          name: product.name,
          description: product.description.substring(0, 100),
        };

        this.quantity = this.getQuantity(this.product);
        this.checkButtonLabel(this.cartService.cart, this.product);

        this.cartSubscription = this.cartService.cartState$.subscribe(
          (cart) => {
            this.quantity = this.getQuantity(this.product);
            this.checkButtonLabel(cart, this.product);
          }
        );

        this.loading$.next(false);
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  public addToCart(product: Product, count: number): void {
    this.cartService.addItemToCart(product, count);
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

  private checkButtonLabel(cart: Map<Product, number>, product: Product): void {
    this.cartService.isProductInCart(product.id!)
      ? (this.buttonLabel = CartButtonLabels.InCart)
      : (this.buttonLabel = CartButtonLabels.AddToCart);
  }

  private getQuantity(product: Product): number {
    const quantity: number = this.cartService.getQuantityOfProduct(product);

    return quantity ? quantity : 1;
  }
}
