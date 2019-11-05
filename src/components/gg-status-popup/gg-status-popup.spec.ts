import { TestWindow } from '@stencil/core/testing';
import { GgStatusPopup } from './gg-status-popup';

describe('gg-status-popup', () => {
  it('should build', () => {
    expect(new GgStatusPopup()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgStatusPopupElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgStatusPopup],
        html: '<gg-status-popup></gg-status-popup>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
