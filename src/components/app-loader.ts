import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('app-loader')
export class AppLoader extends LitElement {
  static styles = css``;
  
  @state()
  protected _hidden = false;

  constructor() {
    super();
    window.addEventListener('load', () => {
      this._hidden = true
    });
  }

  render() {
    return html``;
  }
}
