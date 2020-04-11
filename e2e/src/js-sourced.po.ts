import { AbstractDatatablePage } from './datatable.po';
import { by, element } from 'protractor';

export class JsSourcedPage extends AbstractDatatablePage {

  getUrl(): string {
    return '/js-sourced';
  }

  getDatatableId(): string {
    return '#example_wrapper';
  }

  async getDemoHeader(): Promise<string> {
    return element(by.css('[data-e2e="demo-header"]')).getText();
  }

  /**
   * Javascript sourced data has no table html structure and therefore does not have data-e2e attributes.
   */
  async getTableHeaders(): Promise<string[]> {
    return element.all(by.css('#example thead tr th')).map<string>((th) => th.getAttribute('aria-label'));
  }

  tableHeaderToProperty(tableHeader): string {
    return tableHeader.slice(0, tableHeader.indexOf(':')).replace(' ', '_').replace('.', '').toLowerCase();
  }

}
