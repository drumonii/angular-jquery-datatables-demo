import { ZeroConfPage } from './zero-conf.po';

describe('Zero configuration Datatables Demo', () => {

  const page = new ZeroConfPage();

  beforeEach(async () => {
    await page.navigateTo();

    expect(await page.getDemoHeader()).toBe('Zero Configuration');
    expect(await page.getDatatable().isPresent()).toBe(true);
  });

  describe('filter', () => {

    it('should apply filter', async () => {
      await page.applyFilter('ange');
      expect(await page.getFirstRow()).toEqual({
        name: 'Angelica Ramos',
        position: 'Chief Executive Officer (CEO)',
        office: 'London',
        age: '47',
        start_date: '2009/10/09',
        salary: '$1,200,000'
      });

      await page.resetFilter();
      expect(await page.getFirstRow()).toEqual({
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: '33',
        start_date: '2008/11/28',
        salary: '$162,700'
      });
    });

  });

  describe('sort', () => {

    it('should apply new sort', async () => {
      await page.applySortTo('position');

      expect(await page.getFirstRow()).toEqual({
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: '33',
        start_date: '2008/11/28',
        salary: '$162,700'
      });
    });

    it('should flip existing sort', async () => {
      await page.applySortTo('name');

      expect(await page.getFirstRow()).toEqual({
        name: 'Zorita Serrano',
        position: 'Software Engineer',
        office: 'San Francisco',
        age: '56',
        start_date: '2012/06/01',
        salary: '$115,000'
      });
    });

  });

  describe('paginate', () => {

    it('should paginate', async () => {
      expect(await page.getEntriesInfo().getText()).toBe('Showing 1 to 10 of 57 entries');

      await page.nextPage();
      expect(await page.getEntriesInfo().getText()).toContain('Showing 11 to 20 of 57 entries');

      await page.previousPage();
      expect(await page.getEntriesInfo().getText()).toContain('Showing 1 to 10 of 57 entries');
    });

  });

  describe('entries', () => {

    it('should change entries', async () => {
      await page.changeEntriesTo(25);
      expect(await page.getEntriesInfo().getText()).toContain('Showing 1 to 25 of 57 entries');
    });

  });

});
