import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  public search(query: string, items: Array<any>): Array<any> {
    return items.filter((item) => this.searchInItem(query, item));
  }

  public searchInItem(query: string, item: any): boolean {
    if (!query) {
      return true;
    }
    for (const key of Object.keys(item)) {
      const value = item[key];
      const type = typeof value;
      switch (type) {
        case 'string':
          if (value.toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
          break;
        case 'number':
          if (value.toString().toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
          break;
        case 'object':
          if (value instanceof Date) {
            const dateString = value.toDateString();
            if (dateString.includes(query)) {
              return true;
            }
          }
          break;
      }
    }

    return false;
  }
}
