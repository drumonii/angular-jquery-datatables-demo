import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from '@ag-grid-community/angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import { AjaxSourcedDatatableRoutingModule } from './ajax-sourced-datatable-routing.module';
import { AjaxSourcedDatatableComponent } from './ajax-sourced-datatable.component';
import { AjaxSourcedDatatableService } from './ajax-sourced-datatable.service';

@NgModule({
  declarations: [
    AjaxSourcedDatatableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([AjaxSourcedDatatableComponent]),
    AjaxSourcedDatatableRoutingModule
  ],
  providers: [
    AjaxSourcedDatatableService
  ]
})
export class AjaxSourcedDatatableModule {

  constructor() {
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
  }

}
