import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    MatButtonModule,
    FooterModule
  ]
})
export class NotFoundModule { }
