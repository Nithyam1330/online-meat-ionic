import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'add-category',
    loadChildren: () => import('../modify-categories/modify-categories.module').then(m => m.ModifyCategoriesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
