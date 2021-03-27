import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ReactiveFormsModule } from '@angular/forms';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,SharedModule,
    FormsModule,ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page, LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent],
})
export class Tab3PageModule {}
