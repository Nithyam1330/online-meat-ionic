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
    loadChildren: () => import('./modify-address/modify-address.module').then(m => m.ModifyAddressModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./modify-address/modify-address.module').then(m => m.ModifyAddressModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressManagementRoutingModule {}
