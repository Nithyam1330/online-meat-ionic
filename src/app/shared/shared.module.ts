// Angular Moudles
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BackNavigationHeaderComponent } from './components/back-navigation-header/back-navigation-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Custom Modules
@NgModule({
  declarations: [BackNavigationHeaderComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [BackNavigationHeaderComponent,FormsModule, ReactiveFormsModule, HttpClientModule, IonicModule],
})

// Import this Module in all submodules for reusablility
export class SharedModule {}
