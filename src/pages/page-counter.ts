import { html, css, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { green_600 } from '../colors.js';
import { PageElement } from '../helpers/page-element.js';
import rebootCSS from '../reboot.js';

@customElement('page-counter')
export class PageCounter extends PageElement {
  static styles = [
    unsafeCSS(rebootCSS),
    css`
      section {
        display: flex;
        padding: 1rem;
        flex-direction: column;
        height: 100%;
      }
      .main {
        display: flex;
        flex-grow: 1;
        width: auto;
        flex-direction: column;
        padding: 0 1.5rem;
      }
      .main-image {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-image: url('/images/main-image.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top center;
        overflow: hidden;
        border-radius: 100rem;
        box-shadow: 0px 0px 16px 0px #4446;
      }
      mwc-fab {
        --mdc-theme-secondary: ${green_600};
        --mdc-theme-on-secondary: #fff;
        margin-bottom: 1rem;
      }
      .count {
        text-align: center;
        font-size: 1.3rem;
        font-weight: 100;
      }
      .count > span {
        font-weight: 900;
      }
    `,
  ];

  @query('p.count>span')
  protected display_count!: HTMLSpanElement;

  @state()
  public count = 0;

  updated() {
    this.count = Number(localStorage.getItem('salavat_count') || 0);
  }

  render() {
    return html`
      <section>
        <div class="main">
          <p class="count"><span>${this.count}</span> صلوات فرستاده شده</p>
          <div class="main-image">
            <mwc-fab
              id="plus_btn"
              icon="add"
              @click="${this.addition}"
            ></mwc-fab>
          </div>
        </div>
      </section>
    `;
  }

  public addition(_e: Event, num = 1) {
    this.count += num;
    localStorage.setItem('salavat_count', String(this.count));
  }

  meta() {
    return {
      title: 'کمپین میلیونی',
      description: 'توضیحات کمپین میلیونی',
    };
  }
}
