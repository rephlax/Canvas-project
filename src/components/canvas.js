import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0-rc.2/lit.min.js';
import './MyCard.js';
import './MyModal.js';

class AppCanvas extends LitElement {

  constructor() {
    super();
    this.cards = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  static get properties() {
    return {
      cards: { type: Array },
      mouseX: { type: Number },
      mouseY: { type: Number },
      offsetX: { type: Number },
      offsetY: { type: Number }
    };
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      cursor: none; /* Hide the default cursor */
    }

    .canvas-content {
      position: absolute;
      width: 3000px;
      height: 3000px;
      background-color: #f0f0f0;
    }
  `;

  render() {
    return html`
      <div class="canvas-content" @click="${this.handleCanvasClick}">
        ${this.cards.map(card => html`<my-card .card="${card}"></my-card>`)}
      </div>
    `;
  }

  firstUpdated() {
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  handleMouseMove(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = this.mouseX - centerX;
    const deltaY = this.mouseY - centerY;

    this.offsetX += deltaX * 0.01;
    this.offsetY += deltaY * 0.01;

    this.updateCanvasPosition();
  }

  updateCanvasPosition() {
    const canvasContent = this.shadowRoot.querySelector(".canvas-content");
    canvasContent.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
  }

  handleCanvasClick(event) {
    const rect = this.shadowRoot.querySelector('.canvas-content').getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.showModal(x, y);
  }

  showModal(x, y) {
    const modal = document.createElement('my-modal');
    modal.x = x;
    modal.y = y;
    modal.addEventListener('confirm', () => this.addCard(x, y));
    modal.addEventListener('cancel', () => modal.remove());
    document.body.appendChild(modal);
  }

  addCard(x, y) {
    const title = prompt("Enter card title:");
    const content = prompt("Enter card content:");
    const newCard = { title, content, x, y };
    this.cards = [...this.cards, newCard];
    this.requestUpdate();
  }
}

customElements.define("app-canvas", AppCanvas);