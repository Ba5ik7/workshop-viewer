import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  // Navbar links to redirect to workshop-sidenav module
  {path: 'angular', pathMatch: 'full', redirectTo: '/angular/categories'},
  {path: 'nestjs', pathMatch: 'full', redirectTo: '/nestjs/categories'},
  {path: 'rxjs', pathMatch: 'full', redirectTo: '/rxjs/categories'},
  // This ne`eds to before the workshop-sidenav route becuase missing routes in that module will redirect to this 404 route
  {
    path: '404',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: 'workshop-sidenav',
    loadChildren: () => import('./pages/workshop-sidenav/workshop-sidenav.module').then(m => m.WorkshopSidenavModule)
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
