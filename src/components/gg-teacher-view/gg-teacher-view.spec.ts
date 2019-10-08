import { TestWindow } from '@stencil/core/testing';
import { GgTeacherView } from './gg-teacher-view';

describe('gg-teacher-view', () => {
  it('should build', () => {
    expect(new GgTeacherView()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLGgTeacherViewElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [GgTeacherView],
        html: '<gg-teacher-view></gg-teacher-view>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
