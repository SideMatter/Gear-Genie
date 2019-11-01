import { TestWindow } from '@stencil/core/testing';
import { GgGearView } from './gg-gear-view';

describe('gg-gear-view', () => {
  it('should build', () => {
    expect(new GgGearView()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgGearViewElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgGearView],
        html: '<gg-gear-view></gg-gear-view>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
