import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { mbgc, nbgc } from '../colors.js';
import rebootCSS from '../reboot.js';
import { router, urlForName } from '../router/index.js';
import { routes } from '../router/routes.js';

@customElement('app-navigation')
export class AppNavigation extends LitElement {
  routelist = routes;

  @state()
  protected location;

  constructor() {
    super();
    this.location = window.location.pathname;
    window.addEventListener('vaadin-router-location-changed', () => {
      this.location = window.location.pathname;
    });
  }

  static styles = [
    unsafeCSS(rebootCSS),
    css`
      nav {
        position: fixed;
        bottom: 0;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        left: 0;
        right: 0;
        direction: ltr;
        padding-top: 37px;
        background-color: ${mbgc};
      }
      .nav-box {
        display: flex;
        padding: 0 8px 8px;
        background-color: ${nbgc};
        height: 66px;
      }
      .nav-container {
        display: flex;
        width: 100%;
        list-style: none;
        justify-content: space-around;
      }
      .nav__item {
        display: flex;
        position: relative;
        padding: 2px;
      }
      .nav__item.active .nav__item-icon {
        margin-top: -66px;
        box-shadow: 0px 0px 0px 10px ${mbgc};
      }
      .nav__item.active .nav__item-text {
        transform: scale(1);
      }
      .nav__item.active .nav__item-icon::before {
        box-shadow: 7px -11px 0px 0px ${mbgc};
      }
      .nav__item.active .nav__item-icon::after {
        box-shadow: -7px -11px 0px 0px ${mbgc};
      }
      .nav__item-icon::before,
      .nav__item-icon::after {
        content: '';
        position: absolute;
        top: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transition: box-shadow 150ms 100ms ease-in-out;
      }
      .nav__item-icon::before {
        left: -26px;
      }
      .nav__item-icon::after {
        right: -26px;
      }
      .nav__item-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #2f3046;
        text-decoration: none;
        justify-content: center;
      }
      .nav__item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6em;
        background-color: ${nbgc};
        border-radius: 50%;
        height: 46px;
        width: 46px;
        transition: margin-top 250ms ease-in-out, box-shadow 150ms 100ms ease;
      }
      .nav__item-text {
        position: absolute;
        bottom: 0;
        transform: scale(0);
        transition: transform 250ms 150ms ease-in-out;
        width: max-content;
      }
    `,
  ];

  isActiveUrl = (path: string, success: string | null) => {
    return router.urlForPath(path) === this.location
      ? success || ' active'
      : '';
  };

  protected render() {
    return html`
      <nav>
        <div class="nav-box">
          <ul class="nav-container">
            ${this.routelist
              .filter((route) => route.show_in_nav == true)
              .map(
                (route) => html`
                  <li
                    class="nav__item ${this.isActiveUrl(route.path, 'active')}"
                  >
                    <a href="${urlForName(route.name)}" class="nav__item-link">
                      <div class="nav__item-icon">
                        <ion-icon name="${route.icon}"></ion-icon>
                      </div>
                      <span class="nav__item-text">${route.label}</span>
                    </a>
                  </li>
                `
              )}
          </ul>
        </div>
      </nav>
    `;
  }
}
