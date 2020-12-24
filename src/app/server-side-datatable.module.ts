import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from '@ag-grid-community/angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';

import { ServerSideDatatableRoutingModule } from './server-side-datatable-routing.module';
import { ServerSideDatatableComponent } from './server-side-datatable.component';
import { ServerSideDatatableService } from './server-side-datatable.service';

@NgModule({
  declarations: [
    ServerSideDatatableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([ServerSideDatatableComponent]),
    ServerSideDatatableRoutingModule
  ],
  providers: [
    ServerSideDatatableService
  ],
  exports: [
    ServerSideDatatableComponent
  ]
})
export class ServerSideDatatableModule {

  constructor() {
    ModuleRegistry.registerModules([InfiniteRowModelModule]);
  }

}
