import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UnauthorizedModalComponent } from '../components/unauthorized-modal/unauthorized-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private dialog: MatDialog) {}

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
    }

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const dialogRef = this.dialog.open(UnauthorizedModalComponent);
          dialogRef.afterClosed().subscribe(() => {
            localStorage.removeItem('authToken');
            this.router.navigate(['/login']);
          });
        }
        return throwError(() => {});
      })
    );
  }
}
