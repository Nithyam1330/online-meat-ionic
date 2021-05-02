import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyCategoriesComponent } from './modify-categories.component';

const routes: Routes = [
  {
    path: '',
    component:  ModifyCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyCategoriesRoutingModule { }
