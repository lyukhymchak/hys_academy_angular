import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import User from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users$: Observable<User[]>;

  constructor() {
    this.users$ = of([
      { id: 0, name: 'Alex Hashkov', created: new Date('2022-01-01') },
      { id: 1, name: 'Cheliadin Oleksandr', created: new Date('2022-02-08') },
      { id: 2, name: 'Cherednychenko Artem', created: new Date('2022-12-11') },
      { id: 3, name: 'Kliuka Andrii', created: new Date('2022-03-08') },
      { id: 4, name: 'Deineka Heorhii', created: new Date('2022-10-11') },
      { id: 5, name: 'Oksentiuk Ihor', created: new Date('2022-04-08') },
      { id: 6, name: 'Draganov Ivan', created: new Date('2022-01-11') },
      { id: 7, name: 'Yukhymchak Liana', created: new Date('2026-11-11') },
      { id: 8, name: 'Lutsenko Bohdan', created: new Date('2002-08-08') },
      { id: 9, name: 'Prygun Olena', created: new Date('2021-11-11') },
    ]).pipe(delay(300));
  }

  public addUser(user: User): void {
    this.users$ = this.users$.pipe(
      map((users: User[]) => {
        return [...users, user];
      })
    );
  }

  public editUser(user: User): void {
    this.users$ = this.users$.pipe(
      map((users: User[]) =>
        users.map((elementOfUsers: User) =>
          elementOfUsers.id === user.id ? user : elementOfUsers
        )
      )
    );
  }
}
