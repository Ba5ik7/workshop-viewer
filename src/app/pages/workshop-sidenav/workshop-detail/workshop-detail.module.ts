import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopDetailComponent } from './workshop-detail.component';



@NgModule({
  declarations: [WorkshopDetailComponent],
  exports: [WorkshopDetailComponent],
  imports: [
    CommonModule
  ]
})
export class WorkshopDetailModule { }
