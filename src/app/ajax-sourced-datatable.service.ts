import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AjaxData } from './ajax-data';

@Injectable()
export class AjaxSourcedDatatableService {

  constructor(private httpClient: HttpClient) {}

  getData(startDate: string): Observable<AjaxData[]> {
    const params = new HttpParams()
      .append('startDate', startDate)

    const options = {
      params
    };

    return this.httpClient.get<AjaxData[]>('/ajax-data', options);
  }

}
