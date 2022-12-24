import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() public search = new EventEmitter<any>();
  public query: string;

  sendData() {
    this.search.emit(this.query);
  }

  public searchExpression(item: any) {
    if (!this.query) {
      return true;
    }
    for (const key of Object.keys(item)) {
      const value = item[key];
      const type = typeof value;
      switch (type) {
        case 'string':
          if (value.toLowerCase().includes(this.query.toLowerCase())) {
            return true;
          }
          break;
        case 'number':
          if (
            value.toString().toLowerCase().includes(this.query.toLowerCase())
          ) {
            return true;
          }
          break;
        case 'object':
          if (value instanceof Date) {
            const dateString = value.toDateString();
            if (dateString.includes(this.query)) {
              return true;
            }
          }
          break;
      }
    }

    return false;
  }
}
