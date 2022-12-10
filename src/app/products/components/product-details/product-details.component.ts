import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Product from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: Product;

  productId: string;

  buttonClassNames: string[] = ['button', 'btn-load'];

  constructor(
    private activatedroute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    if (this.activatedroute.snapshot.paramMap.get('id')) {
      this.productId = this.activatedroute.snapshot.paramMap.get(
        'id'
      ) as string;
    }

    if (
      this.productsService.products.find((x) => x.id == Number(this.productId))
    ) {
      this.product = this.productsService.products.find(
        (x) => x.id == Number(this.productId)
      ) as Product;
    }
  }
}
