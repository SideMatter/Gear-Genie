import { TestWindow } from '@stencil/core/testing';
import { GgNewBadge } from './gg-new-badge';

describe('gg-new-badge', () => {
  it('should build', () => {
    expect(new GgNewBadge()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgNewBadgeElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgNewBadge],
        html: '<gg-new-badge></gg-new-badge>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
