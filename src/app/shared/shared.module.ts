// Angular Moudles
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BackNavigationHeaderComponent } from './components/back-navigation-header/back-navigation-header.component';
// Custom Modules
@NgModule({
  declarations: [BackNavigationHeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [BackNavigationHeaderComponent]
})

// Import this Module in all submodules for reusablility
export class SharedModule { }
