import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { ThemePickerModule } from '../theme-picker/theme-picker.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ThemePickerModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [NavigationService]
})
export class NavbarModule { }
