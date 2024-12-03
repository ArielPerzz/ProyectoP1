class MainComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                main {
                    padding: 1em;
                }
            </style>
            <main>
                <slot></slot>
            </main>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('main-component', MainComponent);