import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  public searchByName(query: string, items: any[], key: string): any[] {
    if (!items) {
      return items;
    }
    return items.filter((item) =>
      item[key].toLowerCase().includes(query.toLowerCase())
    );
  }

  private searchThroughAllFieldsInItem(query: string, item: any): boolean {
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
