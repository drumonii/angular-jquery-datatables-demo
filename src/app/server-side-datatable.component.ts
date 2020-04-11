import { Component, OnDestroy, OnInit } from '@angular/core';

import { ServerSideDatatableService } from './server-side-datatable.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-server-side-datatable',
  templateUrl: './server-side-datatable.component.html',
  styleUrls: ['./server-side-datatable.component.scss']
})
export class ServerSideDatatableComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private service: ServerSideDatatableService) {}

  ngOnInit(): void {
    $('#example').DataTable({
      processing: true,
      serverSide: true,
      ajax: (data: any, callback, settings) => {
        const page = Math.ceil(data.start / data.length);
        const size = data.length;
        const sorts = [];
        for (const order of data.order) {
          if (data.columns[order.column].orderable) {
            sorts.push(data.columns[order.column].data + ',' + order.dir);
          }
        }
        const search = data.search.value;

        this.service.getData(page, size, sorts, search)
          .pipe(
            takeUntil(this.destroy$),
          )
          .subscribe((serverSideData) => callback({
            draw: data.draw,
            recordsTotal: serverSideData.totalElements,
            recordsFiltered: serverSideData.totalElements,
            data: serverSideData.content
          }));
      },
      columns: [
        { data: 'name' },
        { data: 'position' },
        { data: 'office' },
        { data: 'extn' },
        { data: 'start_date' },
        { data: 'salary' }
      ],
      language: {
        processing: `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
