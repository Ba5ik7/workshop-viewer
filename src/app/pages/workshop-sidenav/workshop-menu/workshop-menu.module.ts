import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopMenuComponent } from './workshop-menu.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [WorkshopMenuComponent],
  exports: [WorkshopMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ]
})
export class WorkshopMenuModule { }
