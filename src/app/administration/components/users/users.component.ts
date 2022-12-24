import { Component, ViewChild } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';

import { UsersService } from 'src/app/shared/services/users.service';
import User from '../../interfaces/user.interface';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users$: Observable<User[]>;
  private destroy$ = new Subject<void>();

  @ViewChild(SearchComponent, { static: false })
  searchComponentUsers: SearchComponent;

  searchItemsInUsersList(query: any) {
    this.users$ = this.usersService.users$.pipe(
      map((users) =>
        users.filter((user: User) =>
          this.searchComponentUsers.searchExpression(user)
        )
      ),
      takeUntil(this.destroy$)
    );
  }

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.users$.pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
