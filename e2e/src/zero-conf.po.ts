import { AbstractDatatablePage } from './datatable.po';

export class ZeroConfPage extends AbstractDatatablePage {

  getUrl(): string {
    return '/zero-conf';
  }

  getDatatableId(): string {
    return '#example_wrapper';
  }

}
