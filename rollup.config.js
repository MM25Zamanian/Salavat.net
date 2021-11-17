/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  createSpaConfig
} from '@open-wc/building-rollup';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import {
  copy
} from '@web/rollup-plugin-copy';
import {
  black,
  blue
} from 'chalk';
import merge from 'deepmerge';

const NODE_ENV = process.env.NODE_ENV || 'development';
const DIST_PATH = 'server/dist/';
const GENERATE_SERVICE_WORKER = true;

const absoluteBaseUrl =
  NODE_ENV === 'production' ?
  'https://pwa-lit-template.mybluemix.net' :
  'http://localhost:8000';

const workboxConfig = {
  mode: 'production',
  sourcemap: false,
  runtimeCaching: [{
    urlPattern: /\/$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'html',
    },
  }, {
    urlPattern: /\.*$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'cache-name',
    },
  }],
  skipWaiting: true,
};
const config = merge(
  createSpaConfig({
    outputDir: DIST_PATH,
    html: {
      absoluteBaseUrl,
      extractAssets: false,
    },
    legacyBuild: true,
    polyfillsLoader: {
      polyfills: {
        custom: [{
          name: 'lit-polyfill-support',
          path: 'node_modules/lit/polyfill-support.js',
          test: "!('attachShadow' in Element.prototype)",
          module: false,
        }, ],
      },
    },
    developmentMode: process.env.ROLLUP_WATCH === 'true',
    workbox: GENERATE_SERVICE_WORKER && workboxConfig,
    injectServiceWorker: GENERATE_SERVICE_WORKER,
  }), {
    input: 'index.html',
    plugins: [
      typescript({
        declaration: false,
        sourceMap: false,
        inlineSources: false,
      }),
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
      ...(NODE_ENV !== 'development' ? [
        replace({
          preventAssignment: true,
          include: 'src/**/*.ts',
          exclude: 'src/config.*.ts',
          delimiters: ['', ''],
          values: {
            './config.js': `./config.${NODE_ENV}.js`,
          },
        }),
      ] : []),
      copy({
        // Copy all the static files
        patterns: ['images/**/*', 'fonts/**/*', 'manifest.webmanifest', 'robots.txt'],
      }),
    ],
  }
);

console.log(`${black.bgWhite(' Build information'.padEnd(60, ' '))}

${blue('Name')}                   ${process.env.npm_package_name}
${blue('Environment')}            ${NODE_ENV}
${blue('Service Worker')}         ${GENERATE_SERVICE_WORKER}
${blue('Version')}                v${process.env.npm_package_version}`);

export default config;