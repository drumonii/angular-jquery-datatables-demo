import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsSourcedDatatableModule } from './js-sourced-datatable.module';
import { JsSourcedDatatableComponent } from './js-sourced-datatable.component';

describe('JsSourcedDatatableComponent', () => {
  let component: JsSourcedDatatableComponent;
  let fixture: ComponentFixture<JsSourcedDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [JsSourcedDatatableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsSourcedDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the datatable based on the Javascript Sourced Data example', () => {
    const datatable = document.querySelector('#example_wrapper');
    expect(datatable).toBeTruthy();
  });
});
