import { by, element, ElementFinder } from 'protractor';

import { AbstractAppPage } from './app.po';

export class HomePage extends AbstractAppPage {

  getUrl(): string {
    return '/';
  }

  getBrandHeader(): ElementFinder {
    return element(by.css('[data-e2e="navbar-brand"]'));
  }

  getGitHubLink(): ElementFinder {
    return element(by.css('[data-e2e="github-link"]'));
  }

}
