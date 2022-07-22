import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'

import { WorkshopCategoryListComponent } from './workshop-category-list.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { WorkshopCategoryListRoutingModule } from './workshop-category-list-routing.module.ts ';



@NgModule({
  declarations: [WorkshopCategoryListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    WorkshopCategoryListRoutingModule
  ]
})
export class WorkshopCategoryListModule { }
