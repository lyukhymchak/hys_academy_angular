import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

import { UsersService } from 'src/app/shared/services/users.service';
import User from '../../../../../shared/interfaces/user.interface';
import FilterCondition from '../../../shared-admin/interfaces/filter-condition.model';
import { FilterService } from '../../../shared-admin/services/filter.service';
import { SearchService } from '../../../shared-admin/services/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[];
  public filteredUsers: User[] = [];
  public filterOptions = ['More than', 'Less than', 'Equal'];
  public filterType = 'date';

  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private usersService: UsersService,
    private searchService: SearchService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.usersService.users$.pipe(take(1)).subscribe((users) => {
      this.users = users;
      this.filteredUsers = [...users];
      this.loading$.next(false);
    });
  }

  public search(query: string): void {
    this.filteredUsers = this.searchService.searchThroughAllFields(
      query,
      this.users
    );
  }

  public filterByCreatedDate(
    filterCondition: FilterCondition<string, Date>
  ): void {
    this.filteredUsers = this.filterService.filterUsersByCreatedDate(
      filterCondition,
      this.users
    );
  }
}
