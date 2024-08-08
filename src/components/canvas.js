import { LitElement, html, css } from "lit";

class AppCanvas extends LitElement{

    constructor() {
        super();
        this.cards = [];
        this.isPanning = false
        this.MouseX = 0;
        this.MouseY = 0;
        this.OffsetX = 0;
        this.OffsetY = 0;
    }

    static get properties() {
        return {
            isPanning: Boolean,
            cards: Array,
            MouseX: Number,
            MouseY: Number,
            OffsetX: Number,
            OffsetY: Number
        };
    }

    static styles = css`
    
    `;

    render(){
       return html `
            <div class="canvas-content" @click="${this.handleCanvasClick}">
            ${this.cards.map(card => html`<my-card .card="${card}"></my-card`)}
            </div>
       `;
    }

    firstUpdated(){
        window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    handleMouseMove(event){
        event.preventDefault();
        this.MouseX = event.clientX;
        this.MouseY = event.clientY;
        console.log(this.MouseX, this.MouseY);
    }


}
customElements.define("app-canvas", AppCanvas);