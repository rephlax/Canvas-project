import { LitElement, html, css } from 'lit';

class AppMyModal extends LitElement {
    static properties = {
        x: {type:Number},
        y: {type:Number}
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
            z-index: 1000;
            transform: translate(-50%, -50%);
        }
    `;
}

customElements.define('my-modal', AppMyModal);