import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../enums/localstorage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setData<T>(key: LocalStorageKeys, items: T): void {
    localStorage.setItem(
      key,
      JSON.stringify(items, (key, value) =>
        value instanceof Map ? Array.from(value.entries()) : value
      )
    );
  }

  public getData<T>(key: LocalStorageKeys): T {
    const result = localStorage.getItem(key);
    if (typeof JSON.parse(result!) === 'string') {
      return JSON.parse(result!);
    }

    return JSON.parse(result!, (key, value) =>
      key === '' ? new Map(value) : value
    );
  }

  public clearLocalStorage<T>(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }
}
