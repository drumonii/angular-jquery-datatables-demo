import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-zero-conf-datatable',
  templateUrl: './zero-conf-datatable.component.html',
  styleUrls: ['./zero-conf-datatable.component.scss']
})
export class ZeroConfDatatableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#example').DataTable();
  }

}
