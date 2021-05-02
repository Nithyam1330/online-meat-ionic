import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoriesComponent } from './sub-categories.component';

const routes: Routes = [
  {
    path: '',
    component: SubCategoriesComponent
  },
  {
    path: 'add',
    loadChildren: () => import('./modify-sub-category/modify-sub-category.module').then(m => m.ModifySubCategoryModule)
  },
  {
    path: ':subCategoryKey',
    loadChildren: () => import('./modify-sub-category/modify-sub-category.module').then(m => m.ModifySubCategoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoriesRoutingModule { }
