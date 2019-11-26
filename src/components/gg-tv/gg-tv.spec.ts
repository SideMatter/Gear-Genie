import { TestWindow } from '@stencil/core/testing';
import { GgTv } from './gg-tv';

describe('gg-tv', () => {
  it('should build', () => {
    expect(new GgTv()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgTvElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgTv],
        html: '<gg-tv></gg-tv>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
