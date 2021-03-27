import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SPINNER_TYPE } from './spinner-enums';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
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
    const loading = await this.loadingController.create({
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
    await loading.present();
  }

  async dissmissLoading() {
    await this.loadingController.dismiss();
  }
}
