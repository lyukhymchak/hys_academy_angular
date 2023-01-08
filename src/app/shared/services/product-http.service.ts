import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import Product from 'src/app/shared/interfaces/product.interface';
import ProductServer from '../interfaces/product-server.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductHTTPService {
  private baseURL = 'https://hys-fe-course-api.vercel.app/';
  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5Njg3N2NiNy0zZmVlLTRhN2UtODAwMC1mZWQ1YjkzZDAxNWIiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkbEV2VEVEMFVHdk9GQWpJVmpLQnBBZWtqTVFrY0tFcXlNSUhKVEVyNVo1LmJjblRoaHlwQW0iLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTA3VDIxOjE5OjQ0LjU3M1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTAxLTA3VDIxOjE5OjQ0LjU3M1oiLCJpYXQiOjE2NzMxMzQ1MDUsImV4cCI6MTY3MzIyMDkwNX0.zEH-vaKkp3KRejYqX0CNnQ_NfP9E026QNTBbiidSDWw'
  );

  constructor(private http: HttpClient) {}

  public getList(): Observable<ProductServer[]> {
    return this.http.get<ProductServer[]>(this.baseURL + 'products/');
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

    return this.http.post<ProductServer>(this.baseURL + 'products/', data, {
      headers: this.headers,
    });
  }

  public remove(id: string): Observable<ProductServer> {
    return this.http.delete<ProductServer>(`${this.baseURL}products/${id}`, {
      headers: this.headers,
    });
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
      data,
      {
        headers: this.headers,
      }
    );
  }
}
