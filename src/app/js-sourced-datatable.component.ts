import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { GridOptions, ColDef } from '@ag-grid-community/core';

import { JsSourcedData } from './js-sourced-data';

@Component({
  selector: 'app-js-sourced-datatable',
  templateUrl: './js-sourced-datatable.component.html',
  styleUrls: ['./js-sourced-datatable.component.scss']
})
export class JsSourcedDatatableComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  form = this.formBuilder.group({
    filter: []
  })

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', sort: 'asc' },
    { headerName: 'Position', field: 'position' },
    { headerName: 'Office', field: 'office' },
    { headerName: 'Extn.', field: 'extn' },
    { headerName: 'Start Date', field: 'startDate' },
    { headerName: 'Salary', field: 'salary' }
  ];

  rowData: JsSourcedData[] = [
    { name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', extn: '5421', startDate: '2011/04/25', salary: '$320,800' },
    { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', extn: '8422', startDate: '2011/07/25', salary: '$170,750' },
    { name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', extn: '1562', startDate: '2009/01/12', salary:  '$86,000' },
    { name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', extn: '6224', startDate: '2012/03/29', salary: '$433,060' },
    { name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', extn: '5407', startDate: '2008/11/28', salary: '$162,700' },
    { name: 'Brielle Williamson', position: 'Integration Specialist', office: 'New York', extn: '4804', startDate: '2012/12/02', salary: '$372,000' },
    { name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', extn: '9608', startDate: '2012/08/06', salary: '$137,500' },
    { name: 'Rhona Davidson', position: 'Integration Specialist', office: 'Tokyo', extn: '6200', startDate: '2010/10/14', salary: '$327,900' },
    { name: 'Colleen Hurst', position: 'Javascript Developer', office: 'San Francisco', extn: '2360', startDate: '2009/09/15', salary: '$205,500' },
    { name: 'Sonya Frost', position: 'Software Engineer', office: 'Edinburgh', extn: '1667', startDate: '2008/12/13', salary: '$103,600' },
    { name: 'Jena Gaines', position: 'Office Manager', office: 'London', extn: '3814', startDate: '2008/12/19', salary: '$90,560' },
    { name: 'Quinn Flynn', position: 'Support Lead', office: 'Edinburgh', extn: '9497', startDate: '2013/03/03', salary: '$342,000' },
    { name: 'Charde Marshall', position: 'Regional Director', office: 'San Francisco', extn: '6741', startDate: '2008/10/16', salary: '$470,600' },
    { name: 'Haley Kennedy', position: 'Senior Marketing Designer', office: 'London', extn: '3597', startDate: '2012/12/18', salary: '$313,500' },
    { name: 'Tatyana Fitzpatrick', position: 'Regional Director', office: 'London', extn: '1965', startDate: '2010/03/17', salary: '$385,750' },
    { name: 'Michael Silva', position: 'Marketing Designer', office: 'London', extn: '1581', startDate: '2012/11/27', salary: '$198,500' },
    { name: 'Paul Byrd', position: 'Chief Financial Officer (CFO)', office: 'New York', extn: '3059', startDate: '2010/06/09', salary: '$725,000' },
    { name: 'Gloria Little', position: 'Systems Administrator', office: 'New York', extn: '1721', startDate: '2009/04/10', salary: '$237,500' },
    { name: 'Bradley Greer', position: 'Software Engineer', office: 'London', extn: '2558', startDate: '2012/10/13', salary: '$132,000' },
    { name: 'Dai Rios', position: 'Personnel Lead', office: 'Edinburgh', extn: '2290', startDate: '2012/09/26', salary: '$217,500' },
    { name: 'Jenette Caldwell', position: 'Development Lead', office: 'New York', extn: '1937', startDate: '2011/09/03', salary: '$345,000' },
    { name: 'Yuri Berry', position: 'Chief Marketing Officer (CMO)', office: 'New York', extn: '6154', startDate: '2009/06/25', salary: '$675,000' },
    { name: 'Caesar Vance', position: 'Pre-Sales Support', office: 'New York', extn: '8330', startDate: '2011/12/12', salary: '$106,450' },
    { name: 'Doris Wilder', position: 'Sales Assistant', office: 'Sydney', extn: '3023', startDate: '2010/09/20', salary: '$85,600' },
    { name: 'Angelica Ramos', position: 'Chief Executive Officer (CEO)', office: 'London', extn: '5797', startDate: '2009/10/09', salary: '$1,200,000' },
    { name: 'Gavin Joyce', position: 'Developer', office: 'Edinburgh', extn: '8822', startDate: '2010/12/22', salary: '$92,575' },
    { name: 'Jennifer Chang', position: 'Regional Director', office: 'Singapore', extn: '9239', startDate: '2010/11/14', salary: '$357,650' },
    { name: 'Brenden Wagner', position: 'Software Engineer', office: 'San Francisco', extn: '1314', startDate: '2011/06/07', salary: '$206,850' },
    { name: 'Fiona Green', position: 'Chief Operating Officer (COO)', office: 'San Francisco', extn: '2947', startDate: '2010/03/11', salary: '$850,000' },
    { name: 'Shou Itou', position: 'Regional Marketing', office: 'Tokyo', extn: '8899', startDate: '2011/08/14', salary: '$163,000' },
    { name: 'Michelle House', position: 'Integration Specialist', office: 'Sydney', extn: '2769', startDate: '2011/06/02', salary: '$95,400' },
    { name: 'Suki Burks', position: 'Developer', office: 'London', extn: '6832', startDate: '2009/10/22', salary: '$114,500' },
    { name: 'Prescott Bartlett', position: 'Technical Author', office: 'London', extn: '3606', startDate: '2011/05/07', salary: '$145,000' },
    { name: 'Gavin Cortez', position: 'Team Leader', office: 'San Francisco', extn: '2860', startDate: '2008/10/26', salary: '$235,500' },
    { name: 'Martena Mccray', position: 'Post-Sales support', office: 'Edinburgh', extn: '8240', startDate: '2011/03/09', salary: '$324,050' },
    { name: 'Unity Butler', position: 'Marketing Designer', office: 'San Francisco', extn: '5384', startDate: '2009/12/09', salary: '$85,675'}
  ];

  gridOptions: GridOptions;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.gridOptions = {
      pagination: true,
      paginationPageSize: 10,
      columnDefs: this.columnDefs,
      defaultColDef: {
        filter: true,
        sortable: true
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      }
    };

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
