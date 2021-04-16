import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileDashboardRoutingModule } from './profile-dashboard-routing.module';
import { ProfileDashboardComponent } from './profile-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProfileDashboardComponent],
  imports: [
    CommonModule,
    ProfileDashboardRoutingModule,
    SharedModule
  ]
})
export class ProfileDashboardModule { }
