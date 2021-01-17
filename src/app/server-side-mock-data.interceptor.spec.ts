import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpHandler, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

import { of } from 'rxjs';

import { ServerSideMockDataInterceptor } from './server-side-mock-data.interceptor';
import { ServerSideDataResponse } from './server-side-data';

describe('ServerSideMockDataInterceptor', () => {
  let interceptor: ServerSideMockDataInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerSideMockDataInterceptor]
    });
    interceptor = TestBed.inject(ServerSideMockDataInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('server side data', () => {

    let baseRequest: HttpRequest<unknown>;
    let next: HttpHandler;

    beforeEach(() => {
      baseRequest = new HttpRequest<unknown>('GET', '/server-side-data', { responseType: 'json' });

      next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);
    });

    describe('filter', () => {

      it('should filter by name', fakeAsync(() => {
        const params = new HttpParams()
          .append('search', 'air');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: 1,
            totalPages: 1,
            page: 0,
            pageSize: 10,
            content: [
              { DT_RowId: '5', name: 'Airi Satou', position: 'Accountant', salary: '$162,700', start_date: '2008/11/28', office: 'Tokyo', extn: '5407' }
            ]
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should filter by position', fakeAsync(() => {
        const params = new HttpParams()
          .append('search', 'coor');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: 1,
            totalPages: 1,
            page: 0,
            pageSize: 10,
            content: [
              { DT_RowId: '47', name: 'Serge Baldwin', position: 'Data Coordinator', salary: '$138,575', start_date: '2012/04/09', office: 'Singapore', extn: '8352' }
            ]
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should filter by salary', fakeAsync(() => {
        const params = new HttpParams()
          .append('search', '90,560');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: 1,
            totalPages: 1,
            page: 0,
            pageSize: 10,
            content: [
              { DT_RowId: '11', name: 'Jena Gaines', position: 'Office Manager', salary: '$90,560', start_date: '2008/12/19', office: 'London', extn: '3814' }
            ]
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should filter by start_date', fakeAsync(() => {
        const params = new HttpParams()
          .append('search', '2009/07/07');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: 1,
            totalPages: 1,
            page: 0,
            pageSize: 10,
            content: [
              { DT_RowId: '46', name: 'Finn Camacho', position: 'Support Engineer', salary: '$87,500', start_date: '2009/07/07', office: 'San Francisco', extn: '2927' }
            ]
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should filter by office', fakeAsync(() => {
        const params = new HttpParams()
          .append('search', 'sydney');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: 2,
            totalPages: 1,
            page: 0,
            pageSize: 10,
            content: [
              { DT_RowId: '24', name: 'Doris Wilder', position: 'Sales Assistant', salary: '$85,600', start_date: '2010/09/20', office: 'Sydney', extn: '3023' },
              { DT_RowId: '31', name: 'Michelle House', position: 'Integration Specialist', salary: '$95,400', start_date: '2011/06/02', office: 'Sydney', extn: '2769' }
            ]
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should filter by extn', fakeAsync(() => {
        const params = new HttpParams()
          .append('search', '9422');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: 1,
            totalPages: 1,
            page: 0,
            pageSize: 10,
            content: [
              { DT_RowId: '39', name: 'Vivian Harrell', position: 'Financial Controller', salary: '$452,500', start_date: '2009/02/14', office: 'San Francisco', extn: '9422' }
            ]
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

    });

    describe('sort', () => {

      it('should default to asc direction', fakeAsync(() => {
        const params = new HttpParams()
          .append('sort', 'name,');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: interceptor.data.length,
            totalPages: 6,
            page: 0,
            pageSize: 10,
            content: [
              { DT_RowId: '5', name: 'Airi Satou', position: 'Accountant', salary: '$162,700', start_date: '2008/11/28', office: 'Tokyo', extn: '5407' },
              { DT_RowId: '25', name: 'Angelica Ramos', position: 'Chief Executive Officer (CEO)', salary: '$1,200,000', start_date: '2009/10/09', office: 'London', extn: '5797' },
              { DT_RowId: '3', name: 'Ashton Cox', position: 'Junior Technical Author', salary: '$86,000', start_date: '2009/01/12', office: 'San Francisco', extn: '1562' },
              { DT_RowId: '19', name: 'Bradley Greer', position: 'Software Engineer', salary: '$132,000', start_date: '2012/10/13', office: 'London', extn: '2558' },
              { DT_RowId: '28', name: 'Brenden Wagner', position: 'Software Engineer', salary: '$206,850', start_date: '2011/06/07', office: 'San Francisco', extn: '1314' },
              { DT_RowId: '6', name: 'Brielle Williamson', position: 'Integration Specialist', salary: '$372,000', start_date: '2012/12/02', office: 'New York', extn: '4804' },
              { DT_RowId: '43', name: 'Bruno Nash', position: 'Software Engineer', salary: '$163,500', start_date: '2011/05/03', office: 'London', extn: '6222' },
              { DT_RowId: '23', name: 'Caesar Vance', position: 'Pre-Sales Support', salary: '$106,450', start_date: '2011/12/12', office: 'New York', extn: '8330' },
              { DT_RowId: '51', name: 'Cara Stevens', position: 'Sales Assistant', salary: '$145,600', start_date: '2011/12/06', office: 'New York', extn: '3990' },
              { DT_RowId: '4', name: 'Cedric Kelly', position: 'Senior Javascript Developer', salary: '$433,060', start_date: '2012/03/29', office: 'Edinburgh', extn: '6224' }
            ]
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should sort by property and direction', fakeAsync(() => {
        const params = new HttpParams()
          .append('sort', 'name,desc');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: interceptor.data.length,
            totalPages: 6,
            page: 0,
            pageSize: 10,
            content: [
              { DT_RowId: '49', name: 'Zorita Serrano', position: 'Software Engineer', salary: '$115,000', start_date: '2012/06/01', office: 'San Francisco', extn: '4389' },
              { DT_RowId: '48', name: 'Zenaida Frank', position: 'Software Engineer', salary: '$125,250', start_date: '2010/01/04', office: 'New York', extn: '7439' },
              { DT_RowId: '22', name: 'Yuri Berry', position: 'Chief Marketing Officer (CMO)', salary: '$675,000', start_date: '2009/06/25', office: 'New York', extn: '6154' },
              { DT_RowId: '39', name: 'Vivian Harrell', position: 'Financial Controller', salary: '$452,500', start_date: '2009/02/14', office: 'San Francisco', extn: '9422' },
              { DT_RowId: '36', name: 'Unity Butler', position: 'Marketing Designer', salary: '$85,675', start_date: '2009/12/09', office: 'San Francisco', extn: '5384' },
              { DT_RowId: '40', name: 'Timothy Mooney', position: 'Office Manager', salary: '$136,200', start_date: '2008/12/11', office: 'London', extn: '7580' },
              { DT_RowId: '1', name: 'Tiger Nixon', position: 'System Architect', salary: '$320,800', start_date: '2011/04/25', office: 'Edinburgh', extn: '5421' },
              { DT_RowId: '45', name: 'Thor Walton', position: 'Developer', salary: '$98,540', start_date: '2013/08/11', office: 'New York', extn: '8327' },
              { DT_RowId: '15', name: 'Tatyana Fitzpatrick', position: 'Regional Director', salary: '$385,750', start_date: '2010/03/17', office: 'London', extn: '1965' },
              { DT_RowId: '32', name: 'Suki Burks', position: 'Developer', salary: '$114,500', start_date: '2009/10/22', office: 'London', extn: '6832' }
            ]
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should sort by multiple properties and directions', fakeAsync(() => {
        const params = new HttpParams()
          .append('sort', 'position,asc')
          .append('sort', 'office,asc')
          .append('sort', 'salary,asc');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: interceptor.data.length,
            totalPages: 6,
            page: 0,
            pageSize: 10,
            content: [
              { DT_RowId: '5', name: 'Airi Satou', position: 'Accountant', salary: '$162,700', start_date: '2008/11/28', office: 'Tokyo', extn: '5407' },
              { DT_RowId: '2', name: 'Garrett Winters', position: 'Accountant', salary: '$170,750', start_date: '2011/07/25', office: 'Tokyo', extn: '8422' },
              { DT_RowId: '25', name: 'Angelica Ramos', position: 'Chief Executive Officer (CEO)', salary: '$1,200,000', start_date: '2009/10/09', office: 'London', extn: '5797' },
              { DT_RowId: '17', name: 'Paul Byrd', position: 'Chief Financial Officer (CFO)', salary: '$725,000', start_date: '2010/06/09', office: 'New York', extn: '3059' },
              { DT_RowId: '22', name: 'Yuri Berry', position: 'Chief Marketing Officer (CMO)', salary: '$675,000', start_date: '2009/06/25', office: 'New York', extn: '6154' },
              { DT_RowId: '29', name: 'Fiona Green', position: 'Chief Operating Officer (COO)', salary: '$850,000', start_date: '2010/03/11', office: 'San Francisco', extn: '2947' },
              { DT_RowId: '57', name: 'Donna Snider', position: 'Customer Support', salary: '$112,000', start_date: '2011/01/25', office: 'New York', extn: '4226' },
              { DT_RowId: '47', name: 'Serge Baldwin', position: 'Data Coordinator', salary: '$138,575', start_date: '2012/04/09', office: 'Singapore', extn: '8352' },
              { DT_RowId: '26', name: 'Gavin Joyce', position: 'Developer', salary: '$92,575', start_date: '2010/12/22', office: 'Edinburgh', extn: '8822' },
              { DT_RowId: '32', name: 'Suki Burks', position: 'Developer', salary: '$114,500', start_date: '2009/10/22', office: 'London', extn: '6832' }
            ]
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

    });

    describe('page size', () => {

      it('should default page size', fakeAsync(() => {
        interceptor.intercept(baseRequest, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: interceptor.data.length,
            totalPages: 6,
            page: 0,
            pageSize: 10,
            content: interceptor.data.slice(0, 10)
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

    });

    describe('page number', () => {

      it('should default page number', fakeAsync(() => {
        interceptor.intercept(baseRequest, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: interceptor.data.length,
            totalPages: 6,
            page: 0,
            pageSize: 10,
            content: interceptor.data.slice(0, 10)
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should handle when page = total pages',  fakeAsync(() => {
        const params = new HttpParams()
          .append('page', '6');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: interceptor.data.length,
            totalPages: 6,
            page: 6,
            pageSize: 10,
            content: []
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

      it('should handle when page > total pages',  fakeAsync(() => {
        const params = new HttpParams()
          .append('page', '7');
        const request = baseRequest.clone({ params });

        interceptor.intercept(request, next).subscribe((response: HttpResponse<ServerSideDataResponse>) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            totalElements: interceptor.data.length,
            totalPages: 6,
            page: 7,
            pageSize: 10,
            content: []
          });
          expect(next.handle).not.toHaveBeenCalled();
        });

        tick(interceptor.networkDelay);
      }));

    });

  });

  it('should ignore other urls', () => {
    const request = new HttpRequest('GET', '/other-url', { responseType: 'json' });
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
