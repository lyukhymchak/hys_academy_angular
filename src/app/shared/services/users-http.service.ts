import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import UserServer from '../interfaces/user-server.interface';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersHTTPService {
  private baseURL = 'https://hys-fe-course-api.vercel.app/';
  private headers = new HttpHeaders().set(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5Njg3N2NiNy0zZmVlLTRhN2UtODAwMC1mZWQ1YjkzZDAxNWIiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkbEV2VEVEMFVHdk9GQWpJVmpLQnBBZWtqTVFrY0tFcXlNSUhKVEVyNVo1LmJjblRoaHlwQW0iLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTA3VDIxOjE5OjQ0LjU3M1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTAxLTA3VDIxOjE5OjQ0LjU3M1oiLCJpYXQiOjE2NzMxMzQ1MDUsImV4cCI6MTY3MzIyMDkwNX0.zEH-vaKkp3KRejYqX0CNnQ_NfP9E026QNTBbiidSDWw'
  );

  constructor(private http: HttpClient) {}

  public getList(): Observable<UserServer[]> {
    return this.http.get<UserServer[]>(this.baseURL + 'users/', {
      headers: this.headers,
    });
  }

  public getById(id: string): Observable<UserServer> {
    return this.http.get<UserServer>(`${this.baseURL}users/${id}`, {
      headers: this.headers,
    });
  }

  public create(user: User): Observable<UserServer> {
    const data = {
      username: user.name,
      password: user.password,
    };

    return this.http.post<UserServer>(this.baseURL + 'users/', data, {
      headers: this.headers,
    });
  }

  public remove(id: string): Observable<UserServer> {
    return this.http.delete<UserServer>(`${this.baseURL}users/${id}`, {
      headers: this.headers,
    });
  }

  public update(user: User): Observable<UserServer> {
    const data = {
      password: 'user.password',
    };

    return this.http.put<UserServer>(`${this.baseURL}users/${user.id}`, data, {
      headers: this.headers,
    });
  }
}
