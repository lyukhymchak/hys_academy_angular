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
import { LocalStorageService } from './localstorage.service';
import { LocalStorageKeys } from '../enums/localstorage-keys.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.localStorageService.getData<string>(
      LocalStorageKeys.TOKEN
    );

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
            this.localStorageService.clearLocalStorage(LocalStorageKeys.TOKEN);
            this.router.navigate(['/login']);
          });
        }
        return throwError(() => {});
      })
    );
  }
}
