import { LitElement, html, css } from 'lit';
import '@material/mwc-dialog';
import '@material/mwc-button';

class InteractiveCanvas extends LitElement {
  static styles = css`
    #canvas {
      width: 100vw;
      height: 100vh;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.cards = [];
  }

  firstUpdated() {
    const canvas = this.shadowRoot.getElementById('canvas');
    canvas.addEventListener('click', this._handleCanvasClick.bind(this));
    this._fetchCards();
  }

  _handleCanvasClick(event) {
    this._showCreateCardDialog(event.clientX, event.clientY);
  }

  _showCreateCardDialog(x, y) {
    const dialog = document.createElement('mwc-dialog');
    dialog.heading = 'Create a New Card';
    dialog.innerHTML = `
      <div>
        <label>Title:</label>
        <input type="text" id="title" />
      </div>
      <div>
        <label>Content:</label>
        <textarea id="content"></textarea>
      </div>
      <mwc-button dialogAction="close">Cancel</mwc-button>
      <mwc-button @click=${() => this._createCard(x, y)} dialogAction="confirm">Create</mwc-button>
    `;
    document.body.appendChild(dialog);
    dialog.open = true;
  }

  async _createCard(x, y) {
    const title = this.shadowRoot.getElementById('title').value;
    const content = this.shadowRoot.getElementById('content').value;

    const response = await fetch('/api/add-card', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, x, y }),
    });

    if (response.ok) {
      const card = await response.json();
      this.cards.push(card);
      this.requestUpdate();
    }
  }

  async _fetchCards() {
    const response = await fetch('/api/get-card');
    if (response.ok) {
      this.cards = await response.json();
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <canvas id="canvas"></canvas>
      ${this.cards.map(card => html`
        <div style="position: absolute; top: ${card.y}px; left: ${card.x}px;">
          <h3>${card.title}</h3>
          <p>${card.content}</p>
        </div>
      `)}
    `;
  }
}

customElements.define('interactive-canvas', InteractiveCanvas);