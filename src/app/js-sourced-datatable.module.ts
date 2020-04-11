import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsSourcedDatatableRoutingModule } from './js-sourced-datatable-routing.module';
import { JsSourcedDatatableComponent } from './js-sourced-datatable.component';

@NgModule({
  declarations: [JsSourcedDatatableComponent],
  imports: [
    CommonModule,
    JsSourcedDatatableRoutingModule
  ],
  exports: [JsSourcedDatatableComponent]
})
export class JsSourcedDatatableModule { }
