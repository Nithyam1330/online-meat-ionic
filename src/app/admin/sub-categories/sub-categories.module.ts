import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoriesRoutingModule } from './sub-categories-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubCategoriesComponent } from './sub-categories.component';


@NgModule({
  declarations: [SubCategoriesComponent],
  imports: [
    CommonModule,
    SubCategoriesRoutingModule,
    SharedModule
  ]
})
export class SubCategoriesModule { }
