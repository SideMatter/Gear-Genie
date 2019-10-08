import { TestWindow } from '@stencil/core/testing';
import { GgNewRequest } from './gg-new-request';

describe('gg-new-request', () => {
  it('should build', () => {
    expect(new GgNewRequest()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgNewRequestElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgNewRequest],
        html: '<gg-new-request></gg-new-request>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
