import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDashboardComponent } from './profile-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileDashboardComponent
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'address-management',
    loadChildren: () => import('./address-management/address-management.module').then(m => m.AddressManagementModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDashboardRoutingModule { }
