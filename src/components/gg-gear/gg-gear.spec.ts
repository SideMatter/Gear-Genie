import { TestWindow } from '@stencil/core/testing';
import { GgGear } from './gg-gear';

describe('gg-gear', () => {
  it('should build', () => {
    expect(new GgGear()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgGearElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgGear],
        html: '<gg-gear></gg-gear>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
