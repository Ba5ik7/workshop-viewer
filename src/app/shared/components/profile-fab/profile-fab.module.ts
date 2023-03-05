import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFabComponent } from './profile-fab.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';



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
