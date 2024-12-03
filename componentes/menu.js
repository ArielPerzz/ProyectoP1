class MenuComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                nav {
                    background: #333;
                    color: white;
                    padding: 1em;
                }
                a {
                    color: white;
                    margin: 0 1em;
                    text-decoration: none;
                    cursor: pointer;
                }
            </style>
            <nav>
                <a id="home-link">Home</a>
                <a id="profile-link">Profile</a>
                <a id="table-link">Table</a>
                <a id="gallery-link">Gallery</a>
            </nav>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#home-link').addEventListener('click', () => this.navigate('home'));
        this.shadowRoot.querySelector('#profile-link').addEventListener('click', () => this.navigate('profile'));
        this.shadowRoot.querySelector('#table-link').addEventListener('click', () => this.navigate('table'));
        this.shadowRoot.querySelector('#gallery-link').addEventListener('click', () => this.navigate('gallery'));
    }

    navigate(page) {
        const mainComponent = document.querySelector('main-component');
        mainComponent.innerHTML = ''; // Clear current content

        switch (page) {
            case 'home':
                window.location.href = 'index.html';
                break;
            case 'profile':
                mainComponent.innerHTML = '<social-profile></social-profile>';
                break;
            case 'table':
                mainComponent.innerHTML = '<custom-table></custom-table>';
                break;
            case 'gallery':
                mainComponent.innerHTML = '<gallery-component></gallery-component>';
                break;
        }
    }
}

customElements.define('menu-component', MenuComponent);