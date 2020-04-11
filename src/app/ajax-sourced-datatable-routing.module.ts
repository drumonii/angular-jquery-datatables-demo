import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjaxSourcedDatatableComponent } from './ajax-sourced-datatable.component';

const routes: Routes = [
  {
    path: '',
    component: AjaxSourcedDatatableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjaxSourcedDatatableRoutingModule { }
