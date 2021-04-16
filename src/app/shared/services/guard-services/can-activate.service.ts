import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LOCAL_STORAGE_ENUMS } from '../../constants/local-storage.enums';
import { StorageService } from '../common/storage/storage.service';
import Utils from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService {
  private canLogin = true; // Used for activating and deactivating the children components
  constructor(
    private _router: Router,
    private storageService: StorageService) { }

  // Decide's weather the route need to be activated or not by returinging true or false
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const UID = this.storageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.UID);
    if (Utils.isValidInput(UID) ) {
      return true;
    } else {
      this._router.navigate(['login']);
    }
  }

  // set's can activate status
  setLoginStatus(isLogin: boolean) {
    this.canLogin = isLogin;
  }
  // get's can activate status
  getLoginStatus() {
    return this.canLogin;
  }
}
