import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() public items: Array<any>;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  public data: Array<any>;

  public keys: string[];

  public sortKey: string;
  public sortDirection: SortDirection = SortDirection.Ascending;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public totalNumberOfItems: number;
  public pageIndex: number = 0;
  public pageSize: number = 12;
  public hidePageSize: boolean = true;
  public showFirstLastButtons: boolean = true;

  constructor() {}

  ngOnInit(): void {
    if (this.items.length) {
      this.keys = Object.keys(this.items[0]);

      this.setPaginatorToFirstPage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'].currentValue !== changes['items'].previousValue) {
      this.sortKey = '';
      this.setPaginatorToFirstPage();
    }
  }

  public setPaginatorToFirstPage(): void {
    this.paginator.pageIndex = 0;
    this.totalNumberOfItems = this.items.length;

    this.pageSize = Math.min(12, this.totalNumberOfItems);
    if (this.pageSize < 12) {
      this.hidePageSize = false;
      this.showFirstLastButtons = false;
    } else {
      this.hidePageSize = true;
      this.showFirstLastButtons = true;
    }
    this.data = [...this.items].slice(0, this.pageSize);
  }

  public sort(key: string): void {
    if (key === this.sortKey) {
      this.sortDirection =
        this.sortDirection === SortDirection.Ascending
          ? SortDirection.Descending
          : SortDirection.Ascending;
    } else {
      this.sortKey = key;
      this.sortDirection = SortDirection.Ascending;
    }
    this.items.sort((a, b) => {
      const fieldA = a[key];
      const fieldB = b[key];
      const type = typeof fieldA;
      switch (type) {
        case 'number':
          return (
            (fieldA - fieldB) *
            (this.sortDirection === SortDirection.Ascending ? 1 : -1)
          );
        case 'string':
          return (
            fieldA.localeCompare(fieldB) *
            (this.sortDirection === SortDirection.Ascending ? 1 : -1)
          );
        case 'object':
          if (fieldA instanceof Date) {
            return (
              (fieldA.getTime() - fieldB.getTime()) *
              (this.sortDirection === SortDirection.Ascending ? 1 : -1)
            );
          }
          break;
      }
      return -1;
    });

    this.setPaginatorToFirstPage();
  }

  public capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  public changePage(event: PageEvent): void {
    const startIndex = event.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.data = [...this.items].slice(startIndex, endIndex);
  }
}
