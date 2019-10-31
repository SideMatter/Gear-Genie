import { TestWindow } from '@stencil/core/testing';
import { Auth } from './auth';

describe('auth', () => {
  it('should build', () => {
    expect(new Auth()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAuthElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Auth],
        html: '<auth></auth>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
