import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressManagementComponent } from './address-management.component';
import { ModifyAddressComponent } from './modify-address/modify-address.component';


const routes: Routes = [
  {
    path: '',
    component: AddressManagementComponent,
  },
  {
    path: 'add-address',
    component: ModifyAddressComponent,
  },
  {
    path: ':id',
    component: ModifyAddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressManagementRoutingModule {}
