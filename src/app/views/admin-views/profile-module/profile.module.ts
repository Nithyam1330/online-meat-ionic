import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './routing/profile-routing.module';
import { ProfileService } from './services/profile.service';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  providers:[ProfileService]
})
export class ProfileModule { }
