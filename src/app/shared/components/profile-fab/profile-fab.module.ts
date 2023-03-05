import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFabComponent } from './profile-fab.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ProfileFabComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    ProfileFabComponent
  ]
})
export class ProfileFabModule { }
