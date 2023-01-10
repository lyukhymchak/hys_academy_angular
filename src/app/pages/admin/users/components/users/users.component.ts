import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, take } from 'rxjs';

import User from '../../../../../shared/interfaces/user.interface';
import UserServer from 'src/app/shared/interfaces/user-server.interface';
import FilterCondition from '../../../shared/interfaces/filter-condition.model';
import { UserModalComponent } from '../../../shared/components/user-modal/user-modal.component';
import { WarningModalComponent } from '../../../shared/components/warning-modal/warning-modal.component';
import { UsersHTTPService } from 'src/app/shared/services/users-http.service';
import { FilterService } from '../../../shared/services/filter.service';
import { SearchService } from '../../../shared/services/search.service';
import { FilterUserOption } from '../../../shared/enums/filter-user-option.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[];
  public filteredUsers: User[] = [];

  public filterType = FilterUserOption;

  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private searchService: SearchService,
    private filterService: FilterService,
    private dialog: MatDialog,
    private usersHTTPService: UsersHTTPService
  ) {}

  ngOnInit(): void {
    this.initTable();
  }

  public search(query: string): void {
    this.filteredUsers = this.searchService.searchThroughAllFields(
      query,
      this.users
    );
  }

  public filterByCreatedDate(
    filterCondition: FilterCondition<FilterUserOption, Date>
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

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        const newUser: User = {
          name: result.name,
          password: result.password,
          created: new Date(Date.now()),
        };

        this.usersHTTPService.create(newUser).subscribe(() => {
          this.initTable();
        });
      }
    });
  }

  public openEditDialog(currentUser: User): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: { isEdit: true, currentUser },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        currentUser.password = result.password;
        this.usersHTTPService.update(currentUser).subscribe(() => {
          this.initTable();
        });
      }
    });
  }

  public openDeleteDialog(currentUser: User): void {
    const dialogRef = this.dialog.open(WarningModalComponent, {
      data: currentUser,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'ok') {
        this.usersHTTPService.remove(String(currentUser.id)).subscribe(() => {
          this.initTable();
        });
      }
    });
  }

  private toUser(data: UserServer): User {
    return {
      id: data.id,
      name: data.username,
      created: new Date(data.createdAt!),
    };
  }

  private initTable(): void {
    this.loading$.next(true);

    this.usersHTTPService
      .getList()
      .pipe(take(1))
      .subscribe((data) => {
        this.users = data.map((item: UserServer) => this.toUser(item));
        this.filteredUsers = [...this.users];

        this.loading$.next(false);
      });
  }
}
