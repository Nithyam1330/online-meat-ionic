import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private _toastController: ToastController) { }

  async presentToast(message, color) {
    const toast = await this._toastController.create({
      message: message,
      duration: 4000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
