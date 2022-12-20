import { Component } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import User from '../../interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: User[];

  constructor(private usersService: UsersService) {
    this.users = this.usersService.users;
  }
}
