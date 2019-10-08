import { TestWindow } from '@stencil/core/testing';
import { GgNewGear } from './gg-new-gear';

describe('gg-new-gear', () => {
  it('should build', () => {
    expect(new GgNewGear()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgNewGearElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgNewGear],
        html: '<gg-new-gear></gg-new-gear>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
