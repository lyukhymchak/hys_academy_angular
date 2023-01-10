import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import Product from 'src/app/shared/interfaces/product.interface';
import ProductServer from '../interfaces/product-server.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductHTTPService {
  private baseURL = 'https://hys-fe-course-api.vercel.app/';

  constructor(private http: HttpClient) {}

  public getList(): Observable<ProductServer[]> {
    return this.http.get<ProductServer[]>(this.baseURL + 'products/');
  }

  getListLimited(limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}products?limit=${limit}`);
  }

  public getById(id: string): Observable<ProductServer> {
    return this.http.get<ProductServer>(`${this.baseURL}products/${id}`);
  }

  public create(product: Product): Observable<ProductServer> {
    const data = {
      name: product.name,
      price: Number(product.price),
      description: 'Кави! Ще Кави! Ще більше Кави!!!',
      extraInfo: {
        ololo: 777,
        image: 'https://content2.rozetka.com.ua/goods/images/big/20509504.jpg',
      },
    };

    return this.http.post<ProductServer>(this.baseURL + 'products/', data);
  }

  public remove(id: string): Observable<ProductServer> {
    return this.http.delete<ProductServer>(`${this.baseURL}products/${id}`);
  }

  public update(product: Product): Observable<ProductServer> {
    const data = {
      price: Number(product.price),
      extraInfo: {
        ololo: 777,
        image: 'https://content2.rozetka.com.ua/goods/images/big/20509504.jpg',
      },
    };

    return this.http.put<ProductServer>(
      `${this.baseURL}products/${product.id}`,
      data
    );
  }
}
