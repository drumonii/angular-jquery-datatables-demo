import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AjaxData } from './ajax-data';

@Injectable()
export class AjaxSourcedDatatableService {

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<AjaxData[]> {
    return this.httpClient.get<AjaxData[]>('/ajax-data');
  }

}
