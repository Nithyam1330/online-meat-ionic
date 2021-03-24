import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private modalController: ModalController) {}
  async openLoginModal() {
    const modalRef = await this.modalController.create({
      component: LoginComponent
    })
    await modalRef.present();
  }
}
