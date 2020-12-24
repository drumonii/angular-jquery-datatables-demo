import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ColDef, GridOptions } from '@ag-grid-community/core';

import { AjaxSourcedDatatableService } from './ajax-sourced-datatable.service';
import { AjaxData } from './ajax-data';

@Component({
  selector: 'app-ajax-sourced-datatable',
  templateUrl: './ajax-sourced-datatable.component.html',
  styleUrls: ['./ajax-sourced-datatable.component.scss']
})
export class AjaxSourcedDatatableComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  form = this.formBuilder.group({
    startDate: ['2008-01-01', [Validators.required]],
    filter: []
  });

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', sort: 'asc' },
    { headerName: 'Position', field: 'position' },
    { headerName: 'Office', field: 'office' },
    { headerName: 'Extn.', field: 'extn' },
    { headerName: 'Start Date', field: 'start_date' },
    { headerName: 'Salary', field: 'salary' }
  ];

  rowData$: Observable<AjaxData[]>

  gridOptions: GridOptions;

  constructor(private service: AjaxSourcedDatatableService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.gridOptions = {
      pagination: true,
      paginationPageSize: 10,
      columnDefs: this.columnDefs,
      defaultColDef: {
        sortable: true
      },
      getRowNodeId: (data: AjaxData) => data.id,
      overlayLoadingTemplate: `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`,
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      }
    };

    const dateChanges$ = this.form.get('startDate').valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        filter(() => this.form.valid)
      );

    this.rowData$ = dateChanges$
      .pipe(
        startWith({
          startDate: this.form.get('startDate').value
        }),
        tap(() => {
          if (this.gridOptions.api) {
            this.gridOptions.api.showLoadingOverlay();
          }
        }),
        switchMap((form) => {
          return this.service.getData(form.startDate);
        })
      );

    this.form.get('filter').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((filter) => {
        this.gridOptions.api.setQuickFilter(filter);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
