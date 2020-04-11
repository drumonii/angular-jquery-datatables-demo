import { by, element, ElementFinder, Key } from 'protractor';

import { AbstractAppPage } from './app.po';

export abstract class AbstractDatatablePage extends AbstractAppPage {

  abstract getDatatableId(): string;

  getDatatable(): ElementFinder {
    return element(by.css(this.getDatatableId()));
  }

  async getDemoHeader(): Promise<string> {
    return element(by.css('[data-e2e="demo-header"]')).getText();
  }

  async getTableHeaders(): Promise<string[]> {
    return element.all(by.css('#example thead tr th')).map<string>((th) => th.getAttribute('data-e2e'));
  }

  tableHeaderToProperty(tableHeader): string {
    return tableHeader.slice(0, tableHeader.indexOf('table-header') - 1).replace('-', '_');
  }

  async getFirstRow() {
    const tableHeaders = await this.getTableHeaders();

    const properties = [];

    for (let i = 0; i < tableHeaders.length; i++) {
      const tableHeader = tableHeaders[i];
      properties.push({
        position: i,
        property: this.tableHeaderToProperty(tableHeader)
      });
    }

    const firstTableRowData = await element.all(by.css('#example tbody tr:first-child td')).map<string>((td) => td.getText());

    const firstTableRow = {};

    for (let i = 0; i < firstTableRowData.length; i++) {
      const property = properties[i].property;
      firstTableRow[property] = firstTableRowData[i];
    }

    return firstTableRow;
  }

  getFilterInput(): ElementFinder {
    return element(by.css('#example_filter .form-control'));
  }

  async applyFilter(filter): Promise<void> {
    return this.getFilterInput().sendKeys(filter);
  }

  async resetFilter(): Promise<void> {
    const inputText = await this.getFilterInput().getAttribute('value');
    let spacesToGoBack = inputText.length;
    do {
      await this.getFilterInput().sendKeys(Key.BACK_SPACE);
      spacesToGoBack--;
    } while (spacesToGoBack > 0);
  }

  async applySortTo(columnName: string): Promise<void> {
    return element(by.css(`[data-e2e="${columnName}-table-header"]`)).click();
  }

  async applySortAtIndex(columnIndex: number): Promise<void> {
    return element.all(by.css('#example thead tr th')).get(columnIndex).click();
  }

  async nextPage(): Promise<void> {
    return element(by.css('#example_next')).click();
  }

  async previousPage(): Promise<void> {
    return element(by.css('#example_previous')).click();
  }

  async changeEntriesTo(entry: number): Promise<void> {
    return element(by.css('#example_length select')).element(by.cssContainingText('option', entry.toString(10))).click();
  }

  getEntriesInfo(): ElementFinder {
    return element(by.css('#example_info'));
  }

}
