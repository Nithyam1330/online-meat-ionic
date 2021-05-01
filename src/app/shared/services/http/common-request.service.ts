import { Injectable } from '@angular/core';
import { CommonHttpService } from './common-http.service';
import { FrameURLService } from './frame-url.service';
import { Observable, of, throwError } from 'rxjs';
import Utils from '../common/utils';
import {  NetworkService } from '../network/network.service';
import { TOAST_COLOR_ENUMS } from '../common/toaster/toaster.service';
import {  ToastController } from '@ionic/angular';
import { ClientDbInterfaseService } from '../database/client-db-interfase.service';


@Injectable({
  providedIn: 'root'
})
export class CommonRequestService {

  constructor(private _frameUrlService: FrameURLService,
    private _commonHttpService: CommonHttpService,
    private networkService: NetworkService,
    private toastController: ToastController,
    private clientDbInterfaseService: ClientDbInterfaseService
    ) { }

  request(requestObject, postBody = null, httpParams= null, customHeaders = null): Observable<any> {
   
  
   
    let onlineStatus = this.networkService.getCurrentNetworkStatus();
    if (onlineStatus === 0) {
      const toast = this.toastController.create({
        message: 'Please check your internet connection and try again',
        color: TOAST_COLOR_ENUMS.DANGER,
        duration: 3000
      })
      toast.then(toast => toast.present());
    }
    if(Utils.isValidInput(requestObject.otherOptions)) {
      if(requestObject.otherOptions.offline){
      return  this.clientDbInterfaseService.getDataBasedOnRequestObject(requestObject, postBody)
      }else {
        return this.mainRequest(Utils.avoidShallowClone(requestObject), postBody, httpParams, customHeaders);
      }
     } else {
      return this.mainRequest(Utils.avoidShallowClone(requestObject), postBody, httpParams, customHeaders);
     }
    
  }
  mainRequest(requestObject, postBody = null, httpParams= null, customHeaders = null): Observable<any> {
    requestObject.path = this._frameUrlService.getHttpFramedURL(requestObject);
    return this._commonHttpService.sendReciveService(requestObject, postBody, httpParams, customHeaders);
  }
}
