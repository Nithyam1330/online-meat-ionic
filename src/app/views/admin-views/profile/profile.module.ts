import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  providers:[]
})
export class ProfileModule { }
