import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, RequestMatch } from '@angular/common/http/testing';

import { AjaxSourcedDatatableService } from './ajax-sourced-datatable.service';
import { AjaxData } from './ajax-data';

describe('AjaxSourcedDatatableService', () => {
  let service: AjaxSourcedDatatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AjaxSourcedDatatableService]
    });
    service = TestBed.inject(AjaxSourcedDatatableService);
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('getData', () => {

    const startDate = '2010-01-01';

    const requestMatch: RequestMatch = {
      method: 'GET',
      url: `/ajax-data?startDate=${startDate}`
    };

    it('should get the ajax data', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const mockData: AjaxData[] = [
        {
          id: '31',
          name: 'Michelle House',
          position: 'Integration Specialist',
          salary: '$95,400',
          start_date: '2011/06/02',
          office: 'Sydney',
          extn: '2769'
        }
      ];

      service.getData(startDate).subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const testRequest = httpMock.expectOne(requestMatch);
      testRequest.flush(mockData);
    }));

  });
});
