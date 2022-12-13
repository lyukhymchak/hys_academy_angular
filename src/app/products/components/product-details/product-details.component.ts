import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Product from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  private productId: string;
  product: Product;
  count: number;
  buttonLabel: string = 'Add to cart';

  constructor(
    private activatedroute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.count = this.cartService.getCountOfItem(this.product);

    if (this.activatedroute.snapshot.paramMap.get('id')) {
      this.productId = this.activatedroute.snapshot.paramMap.get(
        'id'
      ) as string;
    }

    if (
      this.productsService.products.find((x) => x.id === Number(this.productId))
    ) {
      this.product = this.productsService.products.find(
        (x) => x.id === Number(this.productId)
      ) as Product;
    }
  }

  ngAfterViewInit(): void {
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
