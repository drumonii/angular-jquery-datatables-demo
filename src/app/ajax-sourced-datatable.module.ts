import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjaxSourcedDatatableRoutingModule } from './ajax-sourced-datatable-routing.module';
import { AjaxSourcedDatatableComponent } from './ajax-sourced-datatable.component';
import { AjaxSourcedDatatableService } from './ajax-sourced-datatable.service';

@NgModule({
  declarations: [
    AjaxSourcedDatatableComponent
  ],
  imports: [
    CommonModule,
    AjaxSourcedDatatableRoutingModule
  ],
  providers: [
    AjaxSourcedDatatableService
  ],
  exports: [
    AjaxSourcedDatatableComponent
  ]
})
export class AjaxSourcedDatatableModule { }
