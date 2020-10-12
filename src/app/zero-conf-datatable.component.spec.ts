import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroConfDatatableModule } from './zero-conf-datatable.module';
import { ZeroConfDatatableComponent } from './zero-conf-datatable.component';

describe('ZeroConfDatatableComponent', () => {
  let component: ZeroConfDatatableComponent;
  let fixture: ComponentFixture<ZeroConfDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZeroConfDatatableModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroConfDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the datatable based on the Zero Configuration example', () => {
    const datatable = document.querySelector('#example_wrapper');
    expect(datatable).toBeTruthy();
  });
});
