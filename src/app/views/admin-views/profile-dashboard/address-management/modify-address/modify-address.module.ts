import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyAddressRoutingModule } from './modify-address-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModifyAddressComponent } from './modify-address.component';


@NgModule({
  declarations: [ModifyAddressComponent],
  imports: [
    CommonModule,
    ModifyAddressRoutingModule,
    SharedModule
  ]
})
export class ModifyAddressModule { }
