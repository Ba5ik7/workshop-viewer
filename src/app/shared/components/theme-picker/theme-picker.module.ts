import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker.component';
import { ThemePickerService } from './theme-picker.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ThemePickerComponent],
  exports: [ThemePickerComponent],
  providers: [ThemePickerService]
})
export class ThemePickerModule { }
