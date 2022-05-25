import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopCategoryListComponent } from './workshop-category-list/workshop-category-list.component';
import { WorkshopDetailComponent } from './workshop-detail/workshop-detail.component';
import { WorkshopSidenavComponent } from './workshop-sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: WorkshopSidenavComponent,
    children: [
      {
        path: 'categories',
        children: [
          { path: '', component: WorkshopCategoryListComponent },
        ],
      },
      {
        path: ':categoryId',
        children: [
          {path: '', data: { alwaysRefresh: true }, component: WorkshopDetailComponent },
        ],
      },
      {path: '**', redirectTo: '/404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopSidenavRoutingModule { }
