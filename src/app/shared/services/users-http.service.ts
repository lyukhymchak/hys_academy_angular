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

  constructor(private http: HttpClient) {}

  public getList(): Observable<UserServer[]> {
    return this.http.get<UserServer[]>(this.baseURL + 'users/');
  }

  public getById(id: string): Observable<UserServer> {
    return this.http.get<UserServer>(`${this.baseURL}users/${id}`);
  }

  public create(user: User): Observable<UserServer> {
    const data = {
      username: user.name,
      password: user.password,
    };

    return this.http.post<UserServer>(this.baseURL + 'users/', data);
  }

  public remove(id: string): Observable<UserServer> {
    return this.http.delete<UserServer>(`${this.baseURL}users/${id}`);
  }

  public update(user: User): Observable<UserServer> {
    const data = {
      password: 'user.password',
    };

    return this.http.put<UserServer>(`${this.baseURL}users/${user.id}`, data);
  }
}
