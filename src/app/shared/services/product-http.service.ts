import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import Product from 'src/app/shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductHTTPService {
  private baseURL = 'https://hys-fe-course-api.vercel.app/';
  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJjMWZiNmEyMy1lOTkzLTQ4NWUtYjllNS01MTdhZjkzODgwOTUiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkdXl6NUhlNTlzVkpGb1YxakNsTGxWTzR5RnhNc3NlZ20uUS5kT3o1RThYOHdTZjNUQ2ZrVy4iLCJjcmVhdGVkQXQiOiIyMDIyLTEyLTMwVDEyOjQxOjU2LjAyMloiLCJ1cGRhdGVkQXQiOiIyMDIzLTAxLTA0VDA0OjEyOjA4LjI5MloiLCJpYXQiOjE2NzMwNDY0NDAsImV4cCI6MTY3MzEzMjg0MH0.5vPye-_S4A9iTuVkx7jmsUZqSTQHTkb70b48YzLIwp4'
  );

  constructor(private http: HttpClient) {}

  public getList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL + 'products/');
  }

  public getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseURL}products/${id}`);
  }

  public create(product: Product): Observable<Product> {
    const data = {
      name: product.name,
      price: Number(product.price),
      description: 'Кави! Ще Кави! Ще більше Кави!!!',
      extraInfo: {
        ololo: 777,
        image: 'https://content2.rozetka.com.ua/goods/images/big/20509504.jpg',
      },
    };

    return this.http.post<Product>(this.baseURL + 'products/', data, {
      headers: this.headers,
    });
  }

  public remove(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}products/${id}`, {
      headers: this.headers,
    });
  }

  public update(product: Product): Observable<Product> {
    const data = {
      price: Number(product.price),
      extraInfo: {
        ololo: 777,
        image: 'https://content2.rozetka.com.ua/goods/images/big/20509504.jpg',
      },
    };

    return this.http.put<Product>(
      `${this.baseURL}products/${product.id}`,
      data,
      {
        headers: this.headers,
      }
    );
  }
}
