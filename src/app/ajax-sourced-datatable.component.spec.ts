import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { AjaxSourcedDatatableModule } from './ajax-sourced-datatable.module';
import { AjaxSourcedDatatableComponent } from './ajax-sourced-datatable.component';
import { AjaxSourcedDatatableService } from './ajax-sourced-datatable.service';
import { AjaxSourcedMockDataInterceptor } from './ajax-sourced-mock-data.interceptor';

describe('AjaxSourcedDatatableComponent', () => {
  let component: AjaxSourcedDatatableComponent;
  let fixture: ComponentFixture<AjaxSourcedDatatableComponent>;
  const interceptor = new AjaxSourcedMockDataInterceptor();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AjaxSourcedDatatableModule]
    })
    .compileComponents();
  }));

  beforeEach(inject([AjaxSourcedDatatableService], (service: AjaxSourcedDatatableService) => {
    fixture = TestBed.createComponent(AjaxSourcedDatatableComponent);
    component = fixture.componentInstance;

    spyOn(service, 'getData').and.returnValue(of(interceptor.data));

    fixture.detectChanges();
  }));

  it('should create the datatable based on the Ajax Sourced Data example', () => {
    const datatable = document.querySelector('#example_wrapper');
    expect(datatable).toBeTruthy();
  });
});