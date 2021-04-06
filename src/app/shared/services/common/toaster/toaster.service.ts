import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export const TOAST_COLOR_ENUMS = {
  SUCCESS: 'success',
  DANGER: 'success'
}

export const TOAST_POSITION_ENUMS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  MIDDLE: 'middle'
}
export interface IToasterService {
  message: string,
  color: string,
  position?: "top" | "bottom" | "middle",
  duration?: number
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private _toastController: ToastController) { }

  async presentToast(toastDetails: IToasterService) {
    const toast = await this._toastController.create({
      message: toastDetails.message,
      color: toastDetails.color,
      position: toastDetails.position || "bottom",
      duration: toastDetails.duration || 3000,
    });
    toast.present();
  }
}
