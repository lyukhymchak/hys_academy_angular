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
  product: any;

  productId: string | null;

  buttonClassNames: string[] = ['button', 'btn-load'];

  constructor(
    private activatedroute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productId = this.activatedroute.snapshot.paramMap.get('id');
    this.product = ProductsService.products.find(
      (x) => x.id == Number(this.productId)
    );
  }
}
