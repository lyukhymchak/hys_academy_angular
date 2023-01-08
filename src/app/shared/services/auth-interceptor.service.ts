import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');

    let modifiedReq = req;
    if (authToken) {
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
    } else {
      this.router.navigate(['/login']);
    }
    return next.handle(modifiedReq).pipe(tap(console.log));
  }
}
