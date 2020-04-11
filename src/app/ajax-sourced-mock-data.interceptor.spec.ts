import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

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

  it('should return mock data with network delay', fakeAsync(() => {
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
