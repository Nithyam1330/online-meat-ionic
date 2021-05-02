import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyCategoriesRoutingModule } from './modify-categories-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModifyCategoriesComponent } from './modify-categories.component';


@NgModule({
  declarations: [ModifyCategoriesComponent],
  imports: [
    CommonModule,
    ModifyCategoriesRoutingModule,
    SharedModule
  ]
})
export class ModifyCategoriesModule { }
