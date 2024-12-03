class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                h1 {
                    color: #333;
                    text-align: center;
                }
            </style>
            <header>
                <h1>Tarea de Slots y templates </h1>
            </header>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('header-component', HeaderComponent);