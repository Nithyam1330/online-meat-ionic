import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private storageService: StorageService
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

  logout() {
    this.storageService.clearLocalStorage();
    this.router.navigate(['tabs','tab3']);
  }
}
