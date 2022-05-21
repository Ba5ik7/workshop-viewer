import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopSidenavRoutingModule } from './workshop-sidenav-routing.module';
import { WorkshopSidenavComponent } from './workshop-sidenav.component';


@NgModule({
  declarations: [
    WorkshopSidenavComponent
  ],
  imports: [
    CommonModule,
    WorkshopSidenavRoutingModule
  ]
})
export class WorkshopSidenavModule { }
