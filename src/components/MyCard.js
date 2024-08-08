import { LitElement, html, css } from 'lit';

class AppMyCard extends LitElement {
  static properties = {
    card: { type: Object }
  };

  render() {
    const { title, content, x, y } = this.card;

    return html`
      <div class="card" style="left: ${x}px; top: ${y}px;">
        <h3>${title}</h3>
        <p>${content}</p>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: absolute;
      display: block;
      width: 200px;
      border: 1px solid #ccc;
      padding: 10px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .card {
      position: absolute;
    }
  `;
}

customElements.define('my-card', AppMyCard);