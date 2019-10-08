import { TestWindow } from '@stencil/core/testing';
import { GgProfile } from './gg-profile';

describe('gg-profile', () => {
  it('should build', () => {
    expect(new GgProfile()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgProfileElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgProfile],
        html: '<gg-profile></gg-profile>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
