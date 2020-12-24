import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { concat, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';

import { ColDef, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from '@ag-grid-community/core';

import { ServerSideDatatableService } from './server-side-datatable.service';
import { ServerSideData } from './server-side-data';

@Component({
  selector: 'app-server-side-datatable',
  templateUrl: './server-side-datatable.component.html',
  styleUrls: ['./server-side-datatable.component.scss']
})
export class ServerSideDatatableComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  form = this.formBuilder.group({
    filter: []
  })

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', sort: 'asc' },
    { headerName: 'Position', field: 'position' },
    { headerName: 'Office', field: 'office' },
    { headerName: 'Extn.', field: 'extn' },
    { headerName: 'Start Date', field: 'start_date' },
    { headerName: 'Salary', field: 'salary' }
  ];

  gridOptions: GridOptions;

  constructor(private service: ServerSideDatatableService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: this.columnDefs,
      defaultColDef: {
        sortable: true
      },
      pagination: true,
      rowModelType: 'infinite',
      paginationPageSize: 10, // this should equal cacheBlockSize
      cacheBlockSize: 10,
      maxBlocksInCache: 2,
      getRowNodeId: (data: ServerSideData) => data.DT_RowId,
      overlayLoadingTemplate: `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`
    };
  }

  onGridReady(params: GridReadyEvent) {
    const datasource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        const initialFilter$ = this.form.get('filter').valueChanges
          .pipe(
            startWith(''),
            take(1)
          );
        const valueChanges$ = this.form.get('filter').valueChanges
          .pipe(
            debounceTime(500),
            distinctUntilChanged()
          )
        concat(initialFilter$, valueChanges$)
          .pipe(
            tap(() => {
              this.gridOptions.api.showLoadingOverlay();
            }),
            switchMap((filter) => {
              let page = params.startRow;
              if (page >= this.gridOptions.cacheBlockSize) {
                page = params.startRow / 10;
              }
              const sorts = [];
              for (const sort of params.sortModel) {
                sorts.push(`${sort.colId},${sort.sort}`)
              }
              return this.service.getData(page, this.gridOptions.cacheBlockSize, sorts, filter)
                .pipe(
                  finalize(() => {
                    this.gridOptions.api.hideOverlay();
                  }),
                )
            }),
            takeUntil(this.destroy$)
          )
          .subscribe(data => {
            params.successCallback(data.content, data.totalElements);
          });
      }
    };
    params.api.setDatasource(datasource);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
