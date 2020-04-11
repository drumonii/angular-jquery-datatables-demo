import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerSideDatatableComponent } from './server-side-datatable.component';

const routes: Routes = [
  {
    path: '',
    component: ServerSideDatatableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerSideDatatableRoutingModule { }
