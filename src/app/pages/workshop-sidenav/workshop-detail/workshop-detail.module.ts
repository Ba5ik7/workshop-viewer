import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopDetailComponent } from './workshop-detail.component';
import { WorkshopViewerModule } from 'src/app/shared/components/workshop-viewer/workshop-viewer.module';
import { WorkshopDetailRoutingModule } from './workshop-detail-routing.module';
import { TableOfContentsModule } from 'src/app/shared/components/table-of-contents/table-of-contents.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WorkshopDetailComponent],
  exports: [WorkshopDetailComponent],
  imports: [
    CommonModule,
    WorkshopDetailRoutingModule,
    WorkshopViewerModule,
    TableOfContentsModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class WorkshopDetailModule { }
