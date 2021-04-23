import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService } from 'src/app/shared/services/common/toaster/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  version = environment.version;
  constructor(
    private modalController: ModalController,
    private loader: LoaderService,
    private toaster:ToasterService,
    private router:Router
  ) {}
  async navigateToLogin() {
    this.router.navigate(["login"]);

  }
  async navigateToForgot() {
    this.router.navigate(["forgot-password"]);

  }
  async navigateToRegister() {
    this.router.navigate(["register"]);

  }

  async navigateToProfileDashboard(){
    this.router.navigate(["profile-dashboard"]);
  }

}
