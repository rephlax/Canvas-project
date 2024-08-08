import { LitElement, html, css } from "lit";
import './MyCard.js';
import './MyModal.js';

class AppCanvas extends LitElement{

    constructor() {
        super();
        this.cards = [];
        this.MouseX = 0;
        this.MouseY = 0;
        this.OffsetX = 0;
        this.OffsetY = 0;
    }

    static get properties() {
        return {
            cards: Array,
            MouseX: Number,
            MouseY: Number,
            OffsetX: Number,
            OffsetY: Number
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

    firstUpdated(){
        window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    handleMouseMove(event){
        this.MouseX = event.clientX;
        this.MouseY = event.clientY;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerheight / 2;
        const deltaX = this.MouseX - centerX;
        const deltaY = this.MouseY - centerY;

        this.offsetX += deltaX * 0.01;
        this.offsetY += deltaY * 0.01;

        this.updateCanvasPosition();
    }

    updateCanvasPosition(){
        const canvasContent = this.shadowRoot.querySelector(".canvas-content");
        canvasContent.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`
    }

    handleCanvasClick(event){
        const rect = this.shadowRoot.querySelector('.canvas-content').getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.showModal(x, y);
    }

    showModal(x, y){
        const modal = document.createElement('my-modal');
        modal.x = x;
        modal.y = y;
        modal.addEventListener('confirm', () => this.addCard(x,y));
        modal.addEventListener('cancel', () => modal.remove());
        document.body.appendChild(modal);
    }

    addCard(x, y){
        const title = prompt("Enter card  title:");
        const content = prompt("Enter card content");
        const newCard = { title, content, x, y};
        this.cards = [...this.cards, newCard];
        this.requestUpdate;
    }



}
customElements.define("app-canvas", AppCanvas);