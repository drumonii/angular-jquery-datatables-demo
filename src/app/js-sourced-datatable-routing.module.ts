import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JsSourcedDatatableComponent } from './js-sourced-datatable.component';

const routes: Routes = [
  {
    path: '',
    component: JsSourcedDatatableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsSourcedDatatableRoutingModule { }
