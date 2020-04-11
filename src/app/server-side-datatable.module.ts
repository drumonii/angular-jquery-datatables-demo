import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerSideDatatableRoutingModule } from './server-side-datatable-routing.module';
import { ServerSideDatatableComponent } from './server-side-datatable.component';
import { ServerSideDatatableService } from './server-side-datatable.service';

@NgModule({
  declarations: [
    ServerSideDatatableComponent
  ],
  imports: [
    CommonModule,
    ServerSideDatatableRoutingModule
  ],
  providers: [
    ServerSideDatatableService
  ],
  exports: [
    ServerSideDatatableComponent
  ]
})
export class ServerSideDatatableModule { }
