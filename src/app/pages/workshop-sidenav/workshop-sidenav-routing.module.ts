import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopSidenavComponent } from './workshop-sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: WorkshopSidenavComponent,
    children: [
      {
        path: 'categories',
        children: [
          {path: '', component: WorkshopSidenavComponent},
        ],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopSidenavRoutingModule { }
