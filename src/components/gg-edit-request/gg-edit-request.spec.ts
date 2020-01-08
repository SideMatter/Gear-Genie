import { TestWindow } from '@stencil/core/testing';
import { GgEditRequest } from './gg-edit-request';

describe('gg-edit-request', () => {
  it('should build', () => {
    expect(new GgEditRequest()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgEditRequestElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgEditRequest],
        html: '<gg-edit-request></gg-edit-request>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
