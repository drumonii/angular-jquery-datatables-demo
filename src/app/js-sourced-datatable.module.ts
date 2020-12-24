import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from '@ag-grid-community/angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import { JsSourcedDatatableRoutingModule } from './js-sourced-datatable-routing.module';
import { JsSourcedDatatableComponent } from './js-sourced-datatable.component';

@NgModule({
  declarations: [
    JsSourcedDatatableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([JsSourcedDatatableComponent]),
    JsSourcedDatatableRoutingModule
  ]
})
export class JsSourcedDatatableModule {

  constructor() {
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
  }

}
