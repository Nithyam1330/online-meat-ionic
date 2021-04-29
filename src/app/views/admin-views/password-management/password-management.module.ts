import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordManagementRoutingModule } from './password-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    PasswordManagementRoutingModule
  ]
})
export class PasswordManagementModule { }
