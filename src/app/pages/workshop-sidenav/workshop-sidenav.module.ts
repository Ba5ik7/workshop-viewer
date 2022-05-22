import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopSidenavRoutingModule } from './workshop-sidenav-routing.module';
import { WorkshopSidenavComponent } from './workshop-sidenav.component';

import { FooterModule } from 'src/app/shared/components/footer/footer.module';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { WorkshopMenuModule } from './workshop-menu/workshop-menu.module';


@NgModule({
  declarations: [
    WorkshopSidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WorkshopSidenavRoutingModule,
    WorkshopMenuModule,
    FooterModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class WorkshopSidenavModule { }
