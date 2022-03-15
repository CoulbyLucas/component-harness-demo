import { ComponentHarness } from '@angular/cdk/testing'

export class CustomHarness extends ComponentHarness {
  static hostSelector = 'mat-toolbar'

  async querySelector(selector: string) {
    return this.locatorFor(selector)()
  }

  async getText(selector: string) {
    return (await this.querySelector(selector)).text()
  }
}
