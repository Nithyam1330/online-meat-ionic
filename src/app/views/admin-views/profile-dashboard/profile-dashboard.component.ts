import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LOCAL_STORAGE_ENUMS } from 'src/app/shared/constants/local-storage.enums';
import { StorageService } from 'src/app/shared/services/common/storage/storage.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss'],
})
export class ProfileDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  navigateToProfile() {
    this.router.navigate(['profile-dashboard', 'profile']);
  }

  navigateToAddressManagement() {
    this.router.navigate(['profile-dashboard', 'address-management']);
  }

  navigateToResetPassword() {
    this.router.navigate(['profile-dashboard', 'reset-password']);
  }

  navigateToPasswordManagement() {
    this.router.navigate(['password-management'])
  }
  public async logout() {
    const ref = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.storageService.clearLocalStorage();
            this.router.navigate(['tabs','tab3']);
          }
        }
      ]
    })
    await ref.present();
  }
}
