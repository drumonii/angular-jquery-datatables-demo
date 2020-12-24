import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home.module').then(m => m.HomeModule)
  },
  {
    path: 'ajax-sourced',
    loadChildren: () => import('./ajax-sourced-datatable.module').then(m => m.AjaxSourcedDatatableModule)
  },
  {
    path: 'js-sourced',
    loadChildren: () => import('./js-sourced-datatable.module').then(m => m.JsSourcedDatatableModule)
  },
  {
    path: 'infinite-row',
    loadChildren: () => import('./server-side-datatable.module').then(m => m.ServerSideDatatableModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
