import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopCategoryListComponent } from './workshop-category-list.component';



@NgModule({
  declarations: [WorkshopCategoryListComponent],
  exports: [WorkshopCategoryListComponent],
  imports: [
    CommonModule
  ]
})
export class WorkshopCategoryListModule { }
