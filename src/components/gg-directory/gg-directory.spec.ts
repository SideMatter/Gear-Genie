import { TestWindow } from '@stencil/core/testing';
import { GgDirectory } from './gg-directory';

describe('gg-directory', () => {
  it('should build', () => {
    expect(new GgDirectory()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgDirectoryElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgDirectory],
        html: '<gg-directory></gg-directory>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
