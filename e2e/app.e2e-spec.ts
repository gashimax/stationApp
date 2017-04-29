import { StationAppPage } from './app.po';

describe('station-app App', function() {
  let page: StationAppPage;

  beforeEach(() => {
    page = new StationAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
