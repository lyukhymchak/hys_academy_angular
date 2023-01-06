import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, take } from 'rxjs';

import { UsersService } from 'src/app/shared/services/users.service';
import User from '../../../../../shared/interfaces/user.interface';
import { UserModalComponent } from '../../../shared-admin/components/user-modal/user-modal.component';
import { WarningModalComponent } from '../../../shared-admin/components/warning-modal/warning-modal.component';
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
    private filterService: FilterService,
    private dialog: MatDialog
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

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newUser: User = {
          id: this.users.length,
          name: result.name,
          created: new Date(Date.now()),
        };

        this.usersService.addUser(newUser);
        this.usersService.users$.pipe(take(1)).subscribe((users) => {
          this.users = users;
          this.filteredUsers = [...users];
        });
      }
    });
  }

  public openEditDialog(item: User): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: { isEdit: true, item },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.usersService.editUser(result);
        this.usersService.users$.pipe(take(1)).subscribe((users) => {
          this.users = users;
          this.filteredUsers = [...users];
        });
      }
    });
  }

  public openDeleteDialog(item: User): void {
    const dialogRef = this.dialog.open(WarningModalComponent, {
      data: { item },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'ok') {
        this.usersService.deleteUser(item);
        this.usersService.users$.pipe(take(1)).subscribe((users) => {
          this.users = users;
          this.filteredUsers = [...users];
        });
      }
    });
  }
}
