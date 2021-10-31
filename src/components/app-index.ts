/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import rebootCSS from '../reboot.js';
import { attachRouter } from '../router/index.js';

import '@material/mwc-snackbar';
import '@material/mwc-button';
import '@material/mwc-icon-button';

import './app-navigation.js';
import './app-loader.js';
import './snack-bar.js';

@customElement('app-index')
export class AppIndex extends LitElement {
  @query('main')
  private main!: HTMLElement;

  static styles = [
    unsafeCSS(rebootCSS),
    css`
      :host {
        --mdc-typography-font-family: 'samim', sans-serif;
      }
    `,
  ];

  render() {
    return html`
      <main role="main"></main>
      <app-navigation></app-navigation>
    `;
  }

  firstUpdated() {
    attachRouter(this.main);
  }
}
