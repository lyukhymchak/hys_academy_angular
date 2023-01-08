import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

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
}
