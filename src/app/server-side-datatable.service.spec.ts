import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, RequestMatch } from '@angular/common/http/testing';

import { ServerSideDatatableService } from './server-side-datatable.service';
import { ServerSideData, ServerSideDataResponse } from './server-side-data';

describe('ServerSideDatatableService', () => {
  let service: ServerSideDatatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServerSideDatatableService]
    });
    service = TestBed.inject(ServerSideDatatableService);
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('getData', () => {

    const page = 0;
    const size = 10;
    const sorts = ['office,asc', 'position,asc'];
    const search = 'test';

    const requestMatch: RequestMatch = {
      method: 'GET',
      url: `/server-side-data?page=${page}&size=${size}&search=${search}&sort=${sorts[0]}&sort=${sorts[1]}`
    };

    it('should get the server-side processing data', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const mockData: ServerSideData[] = [
        {
          DT_RowId: '30',
          name: 'Shou Itou',
          position: 'Regional Marketing',
          salary: '$163,000',
          start_date: '2011/08/14',
          office: 'Tokyo',
          extn: '8899'
        }
      ];
      const mockResponse: ServerSideDataResponse = {
        content: mockData,
        totalPages: 1,
        totalElements: 1,
        pageSize: 10,
        page: 0
      };

      service.getData(page, size, sorts, search).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const testRequest = httpMock.expectOne(requestMatch);
      testRequest.flush(mockResponse);
    }));

  });
});
