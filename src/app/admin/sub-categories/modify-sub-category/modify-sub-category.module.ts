import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifySubCategoryRoutingModule } from './modify-sub-category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModifySubCategoryComponent } from './modify-sub-category.component';


@NgModule({
  declarations: [ModifySubCategoryComponent],
  imports: [
    CommonModule,
    ModifySubCategoryRoutingModule,
    SharedModule
  ]
})
export class ModifySubCategoryModule { }
