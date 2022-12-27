import { Component, Input, OnInit } from '@angular/core';

enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() public items: Array<any>;
  public keys: string[];
  public data: Array<any>;
  public sortKey: string;
  public sortDirection: SortDirection = SortDirection.Ascending;

  constructor() {}

  ngOnInit(): void {
    if (this.items.length) {
      this.keys = Object.keys(this.items[0]);
      this.data = [...this.items];
      this.sort(this.keys[0]);
    }
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
    this.data.sort((a, b) => {
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
  }

  public capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
