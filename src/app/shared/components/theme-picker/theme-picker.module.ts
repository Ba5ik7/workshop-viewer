import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker.component';



@NgModule({
  declarations: [ThemePickerComponent],
  exports: [ThemePickerComponent],
  imports: [
    CommonModule
  ]
})
export class ThemePickerModule { }
