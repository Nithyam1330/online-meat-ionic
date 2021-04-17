import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressManagementRoutingModule } from './address-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressManagementComponent } from './address-management.component';


@NgModule({
  declarations: [AddressManagementComponent],
  imports: [
    CommonModule,
    AddressManagementRoutingModule,
    SharedModule
  ]
})
export class AddressManagementModule { }
