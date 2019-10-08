import { TestWindow } from '@stencil/core/testing';
import { GgCheckinout } from './gg-checkinout';

describe('gg-checkinout', () => {
  it('should build', () => {
    expect(new GgCheckinout()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgCheckinoutElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgCheckinout],
        html: '<gg-checkinout></gg-checkinout>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
