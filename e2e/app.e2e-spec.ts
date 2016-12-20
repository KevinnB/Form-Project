import { FormProjectPage } from './app.po';

describe('form-project App', function() {
  let page: FormProjectPage;

  beforeEach(() => {
    page = new FormProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
