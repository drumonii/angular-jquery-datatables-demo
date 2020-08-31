import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { AjaxSourcedDatatableService } from './ajax-sourced-datatable.service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-ajax-sourced-datatable',
  templateUrl: './ajax-sourced-datatable.component.html',
  styleUrls: ['./ajax-sourced-datatable.component.scss']
})
export class AjaxSourcedDatatableComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  form = this.formBuilder.group({
    startDate: ['2008-01-01', [Validators.required]]
  });

  constructor(private service: AjaxSourcedDatatableService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const table = $('#example').DataTable({
      processing: true,
      ajax: (data, callback, settings) => {
        this.service.getData(this.form.get('startDate').value)
          .pipe(
            takeUntil(this.destroy$),
          )
          .subscribe((ajaxData) => callback({
            data: ajaxData
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

    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter(() => this.form.valid),
        takeUntil(this.destroy$)
      )
      .subscribe(() => table.ajax.reload());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
