import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZeroConfDatatableComponent } from './zero-conf-datatable.component';

const routes: Routes = [
  {
    path: '',
    component: ZeroConfDatatableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZeroConfDatatableRoutingModule { }
