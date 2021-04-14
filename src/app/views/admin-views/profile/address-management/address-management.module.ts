import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressManagementRoutingModule } from './address-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModifyAddressComponent } from './modify-address/modify-address.component';
import { AddressManagementComponent } from './address-management.component';


@NgModule({
  declarations: [ModifyAddressComponent, AddressManagementComponent],
  imports: [
    CommonModule,
    AddressManagementRoutingModule,
    SharedModule
  ]
})
export class AddressManagementModule { }
