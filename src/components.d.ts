/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface AppRoot {}
  interface GgAddGearToRequest {}
  interface GgCheckinout {}
  interface GgDirectory {}
  interface GgGear {}
  interface GgHome {}
  interface GgNewGear {
    'modalCtrl': HTMLIonModalControllerElement;
  }
  interface GgNewRequest {
    'addGear': (gear: any) => Promise<void>;
    'modalCtrl': HTMLIonModalControllerElement;
  }
  interface GgProfile {}
  interface GgRequests {
    'addGear': (gear: any) => Promise<void>;
  }
  interface GgTeacherView {}
}

declare global {


  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLGgAddGearToRequestElement extends Components.GgAddGearToRequest, HTMLStencilElement {}
  var HTMLGgAddGearToRequestElement: {
    prototype: HTMLGgAddGearToRequestElement;
    new (): HTMLGgAddGearToRequestElement;
  };

  interface HTMLGgCheckinoutElement extends Components.GgCheckinout, HTMLStencilElement {}
  var HTMLGgCheckinoutElement: {
    prototype: HTMLGgCheckinoutElement;
    new (): HTMLGgCheckinoutElement;
  };

  interface HTMLGgDirectoryElement extends Components.GgDirectory, HTMLStencilElement {}
  var HTMLGgDirectoryElement: {
    prototype: HTMLGgDirectoryElement;
    new (): HTMLGgDirectoryElement;
  };

  interface HTMLGgGearElement extends Components.GgGear, HTMLStencilElement {}
  var HTMLGgGearElement: {
    prototype: HTMLGgGearElement;
    new (): HTMLGgGearElement;
  };

  interface HTMLGgHomeElement extends Components.GgHome, HTMLStencilElement {}
  var HTMLGgHomeElement: {
    prototype: HTMLGgHomeElement;
    new (): HTMLGgHomeElement;
  };

  interface HTMLGgNewGearElement extends Components.GgNewGear, HTMLStencilElement {}
  var HTMLGgNewGearElement: {
    prototype: HTMLGgNewGearElement;
    new (): HTMLGgNewGearElement;
  };

  interface HTMLGgNewRequestElement extends Components.GgNewRequest, HTMLStencilElement {}
  var HTMLGgNewRequestElement: {
    prototype: HTMLGgNewRequestElement;
    new (): HTMLGgNewRequestElement;
  };

  interface HTMLGgProfileElement extends Components.GgProfile, HTMLStencilElement {}
  var HTMLGgProfileElement: {
    prototype: HTMLGgProfileElement;
    new (): HTMLGgProfileElement;
  };

  interface HTMLGgRequestsElement extends Components.GgRequests, HTMLStencilElement {}
  var HTMLGgRequestsElement: {
    prototype: HTMLGgRequestsElement;
    new (): HTMLGgRequestsElement;
  };

  interface HTMLGgTeacherViewElement extends Components.GgTeacherView, HTMLStencilElement {}
  var HTMLGgTeacherViewElement: {
    prototype: HTMLGgTeacherViewElement;
    new (): HTMLGgTeacherViewElement;
  };
  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'gg-add-gear-to-request': HTMLGgAddGearToRequestElement;
    'gg-checkinout': HTMLGgCheckinoutElement;
    'gg-directory': HTMLGgDirectoryElement;
    'gg-gear': HTMLGgGearElement;
    'gg-home': HTMLGgHomeElement;
    'gg-new-gear': HTMLGgNewGearElement;
    'gg-new-request': HTMLGgNewRequestElement;
    'gg-profile': HTMLGgProfileElement;
    'gg-requests': HTMLGgRequestsElement;
    'gg-teacher-view': HTMLGgTeacherViewElement;
  }
}

declare namespace LocalJSX {
  interface AppRoot {}
  interface GgAddGearToRequest {}
  interface GgCheckinout {}
  interface GgDirectory {}
  interface GgGear {}
  interface GgHome {}
  interface GgNewGear {
    'modalCtrl'?: HTMLIonModalControllerElement;
  }
  interface GgNewRequest {
    'modalCtrl'?: HTMLIonModalControllerElement;
  }
  interface GgProfile {}
  interface GgRequests {}
  interface GgTeacherView {}

  interface IntrinsicElements {
    'app-root': AppRoot;
    'gg-add-gear-to-request': GgAddGearToRequest;
    'gg-checkinout': GgCheckinout;
    'gg-directory': GgDirectory;
    'gg-gear': GgGear;
    'gg-home': GgHome;
    'gg-new-gear': GgNewGear;
    'gg-new-request': GgNewRequest;
    'gg-profile': GgProfile;
    'gg-requests': GgRequests;
    'gg-teacher-view': GgTeacherView;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
      'gg-add-gear-to-request': LocalJSX.GgAddGearToRequest & JSXBase.HTMLAttributes<HTMLGgAddGearToRequestElement>;
      'gg-checkinout': LocalJSX.GgCheckinout & JSXBase.HTMLAttributes<HTMLGgCheckinoutElement>;
      'gg-directory': LocalJSX.GgDirectory & JSXBase.HTMLAttributes<HTMLGgDirectoryElement>;
      'gg-gear': LocalJSX.GgGear & JSXBase.HTMLAttributes<HTMLGgGearElement>;
      'gg-home': LocalJSX.GgHome & JSXBase.HTMLAttributes<HTMLGgHomeElement>;
      'gg-new-gear': LocalJSX.GgNewGear & JSXBase.HTMLAttributes<HTMLGgNewGearElement>;
      'gg-new-request': LocalJSX.GgNewRequest & JSXBase.HTMLAttributes<HTMLGgNewRequestElement>;
      'gg-profile': LocalJSX.GgProfile & JSXBase.HTMLAttributes<HTMLGgProfileElement>;
      'gg-requests': LocalJSX.GgRequests & JSXBase.HTMLAttributes<HTMLGgRequestsElement>;
      'gg-teacher-view': LocalJSX.GgTeacherView & JSXBase.HTMLAttributes<HTMLGgTeacherViewElement>;
    }
  }
}


