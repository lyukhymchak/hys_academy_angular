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
    return JSON.parse(localStorage.getItem(key)!, (key, value) =>
      key === '' ? new Map(value) : value
    );
  }

  public clearLocalStorage<T>(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }
}
