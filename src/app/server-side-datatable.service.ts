import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ServerSideDataResponse } from './server-side-data';

@Injectable()
export class ServerSideDatatableService {

  constructor(private httpClient: HttpClient) {}

  getData(page: number, size: number, sorts: string[], search: string): Observable<ServerSideDataResponse> {
    let params = new HttpParams()
      .append('page', page.toString(10))
      .append('size', size.toString(10))
      .append('search', search);

    for (const sort of sorts) {
      params = params.append('sort', sort);
    }

    const options = {
      params
    };

    return this.httpClient.get<ServerSideDataResponse>('/server-side-data', options);
  }

}
