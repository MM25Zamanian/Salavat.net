import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mc-snackbar')
export class McSnackBar extends LitElement {
  static styles = css``;
  constructor() {
    super();
  }

  @property({ type: String })
  protected label!: string;

  @property({ type: Boolean })
  protected open = true;

  @property({ type: Number })
  protected timeout = 5000;

  @property({ type: Boolean })
  protected retryBtn = false;

  @property({ type: Boolean })
  protected closeBtn = true;

  render() {
    return html`
      <mwc-snackbar
        leading
        ?open="${this.open}"
        timeoutMs="${this.timeout}"
        labelText="${this.label}"
      >
        ${this.retry()} ${this.close()}
      </mwc-snackbar>
    `;
  }
  protected retry() {
    if (this.retryBtn) {
      return html`<mwc-button slot="action">دوباره</mwc-button>`;
    }
    return null;
  }
  protected close() {
    if (this.closeBtn) {
      return html`<mwc-icon-button
        icon="close"
        slot="dismiss"
      ></mwc-icon-button>`;
    }
    return null;
  }
}
