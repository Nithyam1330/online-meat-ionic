import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import Utils from '../utils';
import { SPINNER_TYPE } from './spinner-enums';


export interface ILoaderService{
  messageValue: string
    spinnerType:string
    keyboardCloseValue:string
    spinnerTime :number
    translucentValue:boolean,
    cssClassValue:string
    isAnimated:boolean,
    isBackDropDismiss:boolean,
    enableBackdropShadow :boolean
}

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loadingRef;
  constructor(public loadingController: LoadingController) {}

  async showLoader(
    messageValue = 'Loading, Please Wait...',
    spinnerType = SPINNER_TYPE.BUBBLES,
    keyboardCloseValue = true,
    spinnerTime = null,
    translucentValue = false,
    cssClassValue = '',
    isAnimated = false,
    isBackDropDismiss = false,
    enableBackdropShadow = true
  ) {
    if (Utils.isValidInput(this.loadingRef)) {
      return;
    }
    this.loadingRef = await this.loadingController.create({
      message: messageValue,
      spinner: spinnerType,
      duration: spinnerTime,
      keyboardClose: keyboardCloseValue,
      translucent: translucentValue,
      cssClass: cssClassValue,
      animated: isAnimated,
      backdropDismiss: isBackDropDismiss,
      showBackdrop: enableBackdropShadow,
    });
    await this.loadingRef.present();
  }

  async dissmissLoading() {
    if (Utils.isValidInput(this.loadingRef)) {
      await this.loadingRef.dismiss();
      this.loadingRef = null;
    }
    return;
  }
}
