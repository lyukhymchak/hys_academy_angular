import { Injectable } from '@angular/core';
import User from 'src/app/administration/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users: User[];

  constructor() {
    this.users = [
      { id: 1, name: 'Liana', created: new Date('2022-08-08') },
      { id: 2, name: 'Erika', created: new Date('2022-11-11') },
      { id: 3, name: 'Liana', created: new Date('2022-08-08') },
      { id: 4, name: 'Erika', created: new Date('2022-11-11') },
    ];
  }
}
