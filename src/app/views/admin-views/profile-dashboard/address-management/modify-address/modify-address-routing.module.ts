import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyAddressComponent } from './modify-address.component';

const routes: Routes = [
  {
    path: '',
    component: ModifyAddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyAddressRoutingModule { }
