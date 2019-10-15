import { TestWindow } from '@stencil/core/testing';
import { GgAddGearToRequest } from './gg-add-gear-to-request';

describe('gg-add-gear-to-request', () => {
  it('should build', () => {
    expect(new GgAddGearToRequest()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgAddGearToRequestElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgAddGearToRequest],
        html: '<gg-add-gear-to-request></gg-add-gear-to-request>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
