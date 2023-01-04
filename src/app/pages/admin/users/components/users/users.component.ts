import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { UsersService } from 'src/app/shared/services/users.service';
import User from '../../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.users$
      .pipe(take(1))
      .subscribe((users) => (this.users = users));
  }
}
