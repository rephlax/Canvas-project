import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class AppMyModal extends LitElement {
  static properties = {
    x: { type: Number },
    y: { type: Number }
  };

  confirm() {
    this.dispatchEvent(new CustomEvent('confirm'));
    this.remove();
  }

  cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
    this.remove();
  }

  render() {
    return html`
      <div class="modal" style="left: ${this.x}px; top: ${this.y}px;">
        <p>Do you want to create a card here?</p>
        <button @click="${this.confirm}">Confirm</button>
        <button @click="${this.cancel}">Cancel</button>
      </div>
    `;
  }

  static styles = css`
    .modal {
      position: absolute;
      background: white;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transform: translate(-50%, -50%);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    p {
      margin: 0 0 1rem 0;
    }

    button {
      margin: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      border-radius: 4px;
      font-size: 1rem;
    }

    button:hover {
      background-color: #0056b3;
    }
  `;
}

customElements.define('my-modal', AppMyModal);