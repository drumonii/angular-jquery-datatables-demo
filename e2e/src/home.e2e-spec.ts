import { HomePage } from './home.po';

describe('Home', () => {

  const page = new HomePage();

  beforeEach(async () => {
    await page.navigateTo();
  });

  it('should have the title set', async () => {
    expect(await page.getTitle()).toBe('Angular with jQuery Datatables Demo');
  });

  describe('navbar', () => {

    it('should show the brand header', async () => {
      const brand = page.getBrandHeader();
      expect(await brand.getText()).toBe('Angular with jQuery Datatables Demo');
      expect(await brand.getAttribute('href')).toContain('/');
    });

  });

  describe('footer', () => {

    it('should show the GitHub link', async () => {
      const gitHubLink = page.getGitHubLink();
      expect(await gitHubLink.getText()).toBe('GitHub');
      expect(await gitHubLink.getAttribute('href')).toBe('https://github.com/drumonii/angular-jquery-datatables-demo');
    });

  });

});
