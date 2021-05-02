import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifySubCategoryComponent } from './modify-sub-category.component';

const routes: Routes = [
  {
    path: '',
    component: ModifySubCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifySubCategoryRoutingModule { }
