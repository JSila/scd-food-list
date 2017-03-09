import { SCDIngredientsPage } from './app.po';

describe('scd-ingredients App', () => {
  let page: SCDIngredientsPage;

  beforeEach(() => {
    page = new SCDIngredientsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
