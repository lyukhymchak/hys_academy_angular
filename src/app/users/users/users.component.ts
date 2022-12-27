import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';
import User from '../../administration/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private usersSubscription: Subscription;

  public users: User[];

  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.usersSubscription = this.usersService.users$.subscribe(
      (users) => (this.users = users)
    );
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}
