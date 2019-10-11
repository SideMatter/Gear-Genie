import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [{
    type: 'www',
    serviceWorker: null
  }],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  commonjs: {
    namedExports: {
      'node_modules/idb/build/idb.js': ['openDb']
    }
  }
};
