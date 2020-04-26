import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpHandler, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

import { of } from 'rxjs';

import { AjaxSourcedMockDataInterceptor } from './ajax-sourced-mock-data.interceptor';
import { AjaxData } from './ajax-data';

describe('AjaxSourcedMockDataInterceptor', () => {
  let interceptor: AjaxSourcedMockDataInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjaxSourcedMockDataInterceptor]
    });
    interceptor = TestBed.inject(AjaxSourcedMockDataInterceptor);
  });

  describe('ajax sourced data', () => {

    describe('filter', () => {

      it('should filter by start date', fakeAsync(() => {
        const httpParams = new HttpParams()
          .append('startDate', '2013-03-03');
        const request = new HttpRequest<unknown>('GET', '/ajax-data', { params: httpParams, responseType: 'json' });
        const next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);

        interceptor.intercept(request, next).subscribe((response: HttpResponse<AjaxData[]>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual([
            {
              id: '45',
              name: 'Thor Walton',
              position: 'Developer',
              salary: '$98,540',
              start_date: '2013/08/11',
              office: 'New York',
              extn: '8327'
            }
          ])
          expect(response.body.length).toBe(1);
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should not filter with missing start date', fakeAsync(() => {
        const request = new HttpRequest<unknown>('GET', '/ajax-data', { responseType: 'json' });
        const next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);

        interceptor.intercept(request, next).subscribe((response: HttpResponse<AjaxData[]>) => {
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body.length).toBe(interceptor.data.length);
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

    });

  });

  it('should ignore other urls', () => {
    const request = new HttpRequest<unknown>('GET', '/other-url', { responseType: 'json' });
    const next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);
    next.handle.and.returnValue(of(new HttpResponse({
      status: 200,
      body: {}
    })));

    interceptor.intercept(request, next).subscribe((response) => {
      expect(next.handle).toHaveBeenCalledWith(request);
    });
  });
});
