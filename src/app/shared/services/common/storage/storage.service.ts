import { Injectable } from '@angular/core';
import { EncryptDectryptService } from '../encrypt-decrypt/encrypt-dectrypt.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private encryptDectryptService: EncryptDectryptService
  ) { }

  public setLocalStorageItem(key: string, value) {
    if (value) {
      if (typeof value === 'string') {
        localStorage.setItem(key, this.encryptDectryptService.getCipherText(value));
      } else {
        localStorage.setItem(key, this.encryptDectryptService.getCipherText(JSON.stringify(value)));
      }
    }
  }

  public getLocalStorageItem(key) {
    if (key && localStorage.getItem(key)) {
      try {
        return this.encryptDectryptService.getNormalText(JSON.parse(localStorage.getItem(key)));
      } catch (ex) {
        return this.encryptDectryptService.getNormalText(localStorage.getItem(key));
      }
    }
  }

  public deleteLocalStorageItem(keys) {
    if (keys instanceof Array) {
      for (const iterator of keys) {
        localStorage.removeItem(iterator);
      }
    } else {
      localStorage.removeItem(keys);
    }
  }

  public clearLocalStorage() {
    localStorage.clear()
  }
}
