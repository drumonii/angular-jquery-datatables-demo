import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZeroConfDatatableRoutingModule } from './zero-conf-datatable-routing.module';
import { ZeroConfDatatableComponent } from './zero-conf-datatable.component';

@NgModule({
  declarations: [
    ZeroConfDatatableComponent
  ],
  imports: [
    CommonModule,
    ZeroConfDatatableRoutingModule
  ],
  exports: [
    ZeroConfDatatableComponent
  ]
})
export class ZeroConfDatatableModule { }
