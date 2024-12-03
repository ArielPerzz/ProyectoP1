class FooterComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                footer {
                    text-align: center;
                    padding: 1em;
                    background: #333;
                    color: white;
                }
            </style>
            <footer>
                <p>Deber de Ariel Pérez, todos los derechos reservados</p>
            </footer>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('footer-component', FooterComponent);