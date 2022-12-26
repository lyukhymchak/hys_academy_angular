import { Component } from '@angular/core';

import { map, Observable, Subject, takeUntil } from 'rxjs';

import { UsersService } from 'src/app/shared/services/users.service';
import { SearchService } from 'src/app/shared/services/services.service';
import User from '../../interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users$: Observable<User[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.users$ = this.usersService.users$.pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public search(value: string): void {
    this.users$ = this.usersService.users$.pipe(
      map((users) =>
        users.filter((user: User) =>
          this.searchService.searchInObject(value, user)
        )
      ),
      takeUntil(this.destroy$)
    );
  }
}
