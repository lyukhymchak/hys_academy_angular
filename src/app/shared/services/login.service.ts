import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageKeys } from '../enums/localstorage-keys.enum';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login(
    username: string,
    password: string
  ): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      'https://hys-fe-course-api.vercel.app/auth/login',
      {
        username,
        password,
      }
    );
  }

  logout() {
    this.localStorageService.clearLocalStorage(LocalStorageKeys.TOKEN);
    this.router.navigate(['/login']);
  }
}
