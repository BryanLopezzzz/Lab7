class Countries {
    dom;
    modal;
    state;

    constructor() {
        this.state = {
            entities: [],
            entity:   this.emptyEntity(),
            mode:     'A'
        };

        this.dom = this.renderListDOM();

        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = this.renderModal();
        document.body.appendChild(modalDiv);

        this.modal = new bootstrap.Modal(document.querySelector('#countryModal'));

        this.dom.querySelector('#btnCreate')?.addEventListener('click', this.makenew);
        this.dom.querySelector('#btnSearch').addEventListener('click', this.search);
        document.querySelector('#countryModal #apply').addEventListener('click', this.add);
    }


    getRole = () => globalstate.user?.role || null;
    canCreate = () => this.getRole() === 'writer';
    canEdit   = () => this.getRole() === 'writer' || this.getRole() === 'reader';
    canDelete = () => this.getRole() === 'admin';


    renderListDOM = () => {
        const div = document.createElement('div');
        div.id = 'countries';
        div.innerHTML = this.renderList();
        return div;
    }

    renderList = () => {
        const createBtn = this.canCreate()
            ? `<div class="btn-group me-2">
                   <button type="button" class="btn btn-primary" id="btnCreate">Crear</button>
               </div>`
            : '';

        return `
        <div id="list" class="container">
            <div class="card bg-light">
                <h4 class="card-title mt-3 text-center">Countries</h4>
                ${this.renderRoleBanner()}
                <div class="card-body mx-auto w-75">
                    <form id="form">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Nombre</span>
                            <input id="name" type="text" class="form-control" placeholder="Buscar por nombre...">
                            <div class="btn-toolbar">
                                <div class="btn-group me-2">
                                    <button type="button" class="btn btn-primary" id="btnSearch">Buscar</button>
                                </div>
                                ${createBtn}
                            </div>
                        </div>
                    </form>
                    <div class="table-responsive" style="max-height:380px;overflow:auto;">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Capital</th>
                                    <th>Bandera</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="listbody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderRoleBanner = () => {
        const role = this.getRole();
        if (!role) {
            return `<div class="alert alert-info mx-3 py-2" style="font-size:0.85rem;">
                 Modo lectura — <a href="#" onclick="app.loginModal.show()">Inicie sesión</a> para más opciones.
            </div>`;
        }
        const msgs = {
            admin:  ' <strong>Admin</strong>: puede eliminar países.',
            writer: ' <strong>Writer</strong>: puede crear y editar países.',
            reader: ' <strong>Reader</strong>: puede editar países.'
        };
        return `<div class="alert alert-secondary mx-3 py-2" style="font-size:0.85rem;">
            ${msgs[role] || ''}
        </div>`;
    }


    renderModal = () => `
        <div id="countryModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <img src="images/logo.png"
                             style="max-width:44px;max-height:44px;border-radius:50%;border:2px solid #9b6e45;" alt="logo">
                        <span style="margin-left:1.5rem;font-family:'Cormorant Garamond',serif;font-size:1.3rem;
                                     font-weight:500;color:#ede8dc;letter-spacing:0.06em;" id="modalTitle">País</span>
                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal"
                                style="filter:invert(1);opacity:0.7;"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-2">
                            <span class="input-group-text">ID</span>
                            <input id="cid" type="text" class="form-control" placeholder="CRI">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text">Nombre</span>
                            <input id="cname" type="text" class="form-control" placeholder="República de Costa Rica">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text">Capital</span>
                            <input id="ccapital" type="text" class="form-control" placeholder="San José">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text">Población</span>
                            <input id="cpopulation" type="number" class="form-control" placeholder="0">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text">Área km²</span>
                            <input id="carea" type="number" class="form-control" placeholder="0">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text">Bandera URL</span>
                            <input id="cflag" type="text" class="form-control" placeholder="https://...">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="apply" type="button" class="btn btn-primary">Aplicar</button>
                    </div>
                </div>
            </div>
        </div>`;


    showModal = () => {
        const e = this.state.entity;
        document.querySelector('#countryModal #cid').value         = e.id         || '';
        document.querySelector('#countryModal #cname').value       = e.name       || '';
        document.querySelector('#countryModal #ccapital').value    = e.capital    || '';
        document.querySelector('#countryModal #cpopulation').value = e.population || 0;
        document.querySelector('#countryModal #carea').value       = e.area       || 0;
        document.querySelector('#countryModal #cflag').value       = e.flags?.[0] || '';
        document.querySelector('#countryModal #cid').disabled      = (this.state.mode === 'E');
        document.querySelector('#countryModal #modalTitle').textContent =
            this.state.mode === 'E' ? 'Editar País' : 'Nuevo País';
        this.modal.show();
    }

    load = () => {
        const e = this.state.entity;
        e.id         = document.querySelector('#countryModal #cid').value.trim();
        e.name       = document.querySelector('#countryModal #cname').value.trim();
        e.capital    = document.querySelector('#countryModal #ccapital').value.trim();
        e.population = parseInt(document.querySelector('#countryModal #cpopulation').value) || 0;
        e.area       = parseInt(document.querySelector('#countryModal #carea').value)       || 0;
        e.flags      = [document.querySelector('#countryModal #cflag').value.trim()];
        e.latLng     = [0.0, 0.0];
    }

    reset = () => {
        this.state.entity = this.emptyEntity();
        document.querySelector('#countryModal #cid').disabled = false;
    }

    emptyEntity = () => ({
        id: '', name: '', capital: '', population: 0, area: 0, flags: [], latLng: [0, 0]
    })


    add = () => {
        this.load();
        if (this.state.mode === 'A') {
            this._create();
        } else {
            this._update();
        }
    }

    _create = async () => {
        const entity = this.state.entity;
        try {
            const response = await fetch(`${backend}/countries`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify(entity)
            });
            if (!response.ok) { errorMessage(response.status); return; }
            this.list();
            this.reset();
            this.modal.hide();
        } catch (e) {
            alert('Error de red.');
        }
    }

    _update = async () => {
        const entity = this.state.entity;
        try {
            const response = await fetch(`${backend}/countries/${entity.id}`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify(entity)
            });
            if (!response.ok) { errorMessage(response.status); return; }
            this.list();
            this.reset();
            this.modal.hide();
        } catch (e) {
            alert('Error de red.');
        }
    }

    delete = async (id) => {
        if (!confirm(`¿Eliminar el país con ID "${id}"?`)) return;
        try {
            const response = await fetch(`${backend}/countries/${id}`, {
                method: 'DELETE',
                headers: authHeaders()
            });
            if (!response.ok) { errorMessage(response.status); return; }
            this.list();
        } catch (e) {
            alert('Error de red.');
        }
    }


    list = async () => {
        try {
            const response = await fetch(`${backend}/countries`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) { errorMessage(response.status); return; }
            const countries = await response.json();
            this.state.entities = countries;
            this._renderRows(countries);
        } catch (e) {
            alert('Error de red. ¿Está el backend activo en ' + backend + '?');
        }
    }

    search = async () => {
        const nombre = this.dom.querySelector('#name').value.trim();
        try {
            const response = await fetch(`${backend}/countries?name=${encodeURIComponent(nombre)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) { errorMessage(response.status); return; }
            const countries = await response.json();
            this.state.entities = countries;
            this._renderRows(countries);
        } catch (e) {
            alert('Error de red.');
        }
    }

    _renderRows = (countries) => {
        const tbody = this.dom.querySelector('#listbody');
        tbody.innerHTML = '';
        countries.forEach(c => this.row(tbody, c));
    }


    row = (list, c) => {
        const tr = document.createElement('tr');

        const editBtn = this.canEdit()
            ? `<button class="btn btn-warning btn-sm btn-edit">Editar</button>`
            : '';
        const deleteBtn = this.canDelete()
            ? `<button class="btn btn-danger btn-sm btn-delete">Eliminar</button>`
            : '';
        const noBtns = (!this.canEdit() && !this.canDelete())
            ? `<span style="font-size:0.78rem;color:#aaa;">Solo lectura</span>`
            : '';

        tr.innerHTML = `
            <td>${c.name}</td>
            <td>${c.capital || '—'}</td>
            <td><img class="flag" src="${c.flags?.[0] || ''}" alt="${c.name}" onerror="this.style.display='none'"></td>
            <td>
                <div class="d-flex gap-2">
                    ${editBtn}
                    ${deleteBtn}
                    ${noBtns}
                </div>
            </td>`;

        tr.querySelector('.btn-edit')?.addEventListener('click', () => {
            this.state.entity = { ...c };
            this.state.mode = 'E';
            this.showModal();
        });

        tr.querySelector('.btn-delete')?.addEventListener('click', () => {
            this.delete(c.id);
        });

        list.appendChild(tr);
    }

    makenew = () => {
        this.reset();
        this.state.mode = 'A';
        this.showModal();
    }
}