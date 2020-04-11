import { JsSourcedPage } from './js-sourced.po';

describe('Javascript Sourced Data Datatables Demo', () => {

  const page = new JsSourcedPage();

  beforeEach(async() => {
    await page.navigateTo();

    expect(await page.getDemoHeader()).toBe('Javascript Sourced Data');
    expect(await page.getDatatable().isPresent()).toBe(true);
  });

  describe('filter', () => {

    it('should apply filter', async() => {
      await page.applyFilter('ange');
      expect(await page.getFirstRow()).toEqual({
        name: 'Angelica Ramos',
        position: 'Chief Executive Officer (CEO)',
        office: 'London',
        extn: '5797',
        start_date: '2009/10/09',
        salary: '$1,200,000'
      });

      await page.resetFilter();
      expect(await page.getFirstRow()).toEqual({
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        extn: '5407',
        start_date: '2008/11/28',
        salary: '$162,700'
      });
    });

  });

  describe('sort', () => {

    it('should apply new sort', async() => {
      await page.applySortAtIndex(1);

      expect(await page.getFirstRow()).toEqual({
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        extn: '5407',
        start_date: '2008/11/28',
        salary: '$162,700'
      });
    });

    it('should flip existing sort', async() => {
      await page.applySortAtIndex(0);

      expect(await page.getFirstRow()).toEqual({
        name: 'Yuri Berry',
        position: 'Chief Marketing Officer (CMO)',
        office: 'New York',
        extn: '6154',
        start_date: '2009/06/25',
        salary: '$675,000'
      });
    });

  });

  describe('paginate', () => {

    it('should paginate', async() => {
      expect(await page.getEntriesInfo().getText()).toBe('Showing 1 to 10 of 36 entries');

      await page.nextPage();
      expect(await page.getEntriesInfo().getText()).toContain('Showing 11 to 20 of 36 entries');

      await page.previousPage();
      expect(await page.getEntriesInfo().getText()).toContain('Showing 1 to 10 of 36 entries');
    });

  });

  describe('entries', () => {

    it('should change entries', async() => {
      await page.changeEntriesTo(25);
      expect(await page.getEntriesInfo().getText()).toContain('Showing 1 to 25 of 36 entries');
    });

  });

});
