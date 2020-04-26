import { by, element } from 'protractor';

import { AbstractDatatablePage } from './datatable.po';

export class AjaxSourcedPage extends AbstractDatatablePage {

  getUrl(): string {
    return '/ajax-sourced';
  }

  getDatatableId(): string {
    return '#example_wrapper';
  }

  async applyDatepicker(...values: string[]): Promise<void> {
    const datepicker = element(by.css('[data-e2e="started-after-datepicker"]'))
    return datepicker.sendKeys(...values);
  }

}
