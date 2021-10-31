/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { PageElement } from '../helpers/page-element.js';

@customElement('page-about')
export class PageAbout extends PageElement {
  static styles = css`
    section {
      padding: 1rem;
    }
  `;

  render() {
    return html`
      <section>

      </section>
    `;
  }

  meta() {
    return {
      title: 'کمپین میلیونی',
      description: 'توضیحات کمپین میلیونی',
    };
  }
}
