import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService } from 'src/app/shared/services/common/toaster/toaster.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private modalController: ModalController,
    private router:Router
  ) {}

  async navigateToAdmin() {
    this.router.navigate(["admin"]);

  }
  
}
