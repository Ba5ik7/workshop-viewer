import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopMenuComponent } from './workshop-menu.component';



@NgModule({
  declarations: [WorkshopMenuComponent],
  exports: [WorkshopMenuComponent],
  imports: [
    CommonModule
  ]
})
export class WorkshopMenuModule { }
