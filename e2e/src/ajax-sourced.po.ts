import { AbstractDatatablePage } from './datatable.po';

export class AjaxSourcedPage extends AbstractDatatablePage {

  getUrl(): string {
    return '/ajax-sourced';
  }

  getDatatableId(): string {
    return '#example_wrapper';
  }

}
