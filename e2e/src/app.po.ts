import { browser } from 'protractor';
import { promise } from 'selenium-webdriver';

export abstract class AbstractAppPage {

  abstract getUrl(): string;

  navigateTo(): Promise<unknown> {
    return browser.get(this.getUrl()) as Promise<unknown>;
  }

  getTitle(): promise.Promise<string> {
    return browser.getTitle();
  }

}
