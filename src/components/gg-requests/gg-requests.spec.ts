import { TestWindow } from '@stencil/core/testing';
import { GgRequests } from './gg-requests';

describe('gg-requests', () => {
  it('should build', () => {
    expect(new GgRequests()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgRequestsElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgRequests],
        html: '<gg-requests></gg-requests>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
