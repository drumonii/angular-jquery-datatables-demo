import { AbstractDatatablePage } from './datatable.po';

export class ServerSidePage extends AbstractDatatablePage {

  getUrl(): string {
    return '/server-side';
  }

  getDatatableId(): string {
    return '#example_wrapper';
  }

}
