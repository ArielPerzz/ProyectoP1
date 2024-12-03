class CustomTableComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1em 0;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                .error {
                    color: red;
                    font-weight: bold;
                }
            </style>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div class="error"></div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const tbody = this.shadowRoot.querySelector('tbody');
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                const errorDiv = this.shadowRoot.querySelector('.error');
                errorDiv.textContent = `Failed to load data: ${error.message}`;
            });
    }
}

customElements.define('custom-table', CustomTableComponent);