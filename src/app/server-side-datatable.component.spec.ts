import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { ServerSideDatatableModule } from './server-side-datatable.module';
import { ServerSideDatatableComponent } from './server-side-datatable.component';
import { ServerSideDatatableService } from './server-side-datatable.service';
import { ServerSideMockDataInterceptor } from './server-side-mock-data.interceptor';

describe('ServerSideDatatableComponent', () => {
  let component: ServerSideDatatableComponent;
  let fixture: ComponentFixture<ServerSideDatatableComponent>;
  const interceptor = new ServerSideMockDataInterceptor();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ServerSideDatatableModule]
    })
    .compileComponents();
  });

  beforeEach(inject([ServerSideDatatableService], (service: ServerSideDatatableService) => {
    fixture = TestBed.createComponent(ServerSideDatatableComponent);
    component = fixture.componentInstance;

    spyOn(service, 'getData').and.returnValue(of({
      content: interceptor.data,
      totalElements: interceptor.data.length,
      page: 0,
      pageSize: 10,
      totalPages: Math.ceil(interceptor.data.length / 10)
    }));

    spyOn(window, 'alert');

    fixture.detectChanges();
  }));

  afterEach(() => {
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should create the datatable based on the Server-side Processing example', () => {
    const datatable = document.querySelector('#example_wrapper');
    expect(datatable).toBeTruthy();
  });
});
