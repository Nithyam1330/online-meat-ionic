import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoaderService } from '../shared/services/common/loader/loader.service';
import { ToasterService } from '../shared/services/common/toaster/toaster.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(
    private modalController: ModalController,
    private _loader: LoaderService,
    private _toaster:ToasterService
  ) {}
  async openLoginModal() {
    const modalRef = await this.modalController.create({
      component: LoginComponent,
    });
    await modalRef.present();
  }
  async openForgotPasswordModal() {
    const modalRef = await this.modalController.create({
      component: ForgotPasswordComponent,
    });
    await modalRef.present();
  }
  async openResetPasswordModal() {
    const modalRef = await this.modalController.create({
      component: ResetPasswordComponent,
    });
    await modalRef.present();
  }
  async openRegistrationModal() {
    const modalRef = await this.modalController.create({
      component: RegisterComponent,
    });
    await modalRef.present();
  }

  openLoader() {
    this._loader.showLoader();
  }

  openToaster() {
    this._toaster.presentToast(`1 KG Mutton.`,'medium')
  }
}
