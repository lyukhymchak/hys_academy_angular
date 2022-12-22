import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import Product from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<boolean> {
  constructor(private productsService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> | Promise<any> | any {
    const id: number = parseInt(route.paramMap.get('id')!);
    return this.productsService.getProductById(id);
  }
}
