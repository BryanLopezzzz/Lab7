class Countries{
    dom;
    modal;

    state;

    constructor(){
        this.state = {'entities': new Array(), 'entity': this.emptyEntity(), 'mode':'A'};

        // dom es solo la lista, SIN el modal
        this.dom = this.renderListDOM();

        // Modal va directo al body, fuera de cualquier contenedor
        var modalDiv = document.createElement('div');
        modalDiv.innerHTML = this.renderModal();
        document.body.appendChild(modalDiv);

        this.modal = new bootstrap.Modal(document.querySelector('#countryModal'));

        this.dom.querySelector("#create").addEventListener('click', this.makenew);
        this.dom.querySelector("#search").addEventListener('click', this.search);
        document.querySelector('#countryModal #apply').addEventListener('click', this.add);
    }

    renderListDOM=()=>{
        var rootContent = document.createElement('div');
        rootContent.id = 'countries';
        rootContent.innerHTML = this.renderList();
        return rootContent;
    }

    renderList=()=>{
        return `
        <div id="list" class="container">     
            <div class="card bg-light">
                <h4 class="card-title mt-3 text-center">Countries</h4>    
                <div class="card-body mx-auto w-75">
                    <form id="form">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Name</span>
                            <input id="name" type="text" class="form-control">
                            <div class="btn-toolbar">
                                <div class="btn-group me-2">
                                    <button type="button" class="btn btn-primary" id="search">Search</button>
                                </div>
                                <div class="btn-group me-2">
                                    <button type="button" class="btn btn-primary" id="create">Create</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="table-responsive" style="max-height:380px;overflow:auto;">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Capital</th>
                                    <th>Flag</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="listbody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderModal=()=>{
        return `
        <div id="countryModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="
                    background:#f5f0e8 !important;
                    border:none !important;
                    border-radius:12px !important;
                    overflow:hidden;
                    box-shadow:0 20px 60px rgba(0,0,0,0.5) !important;
                ">
                    <div class="modal-header" style="
                        background:#2c2620 !important;
                        border-bottom:none !important;
                        padding:1.2rem 1.5rem !important;
                    ">
                        <img src="images/logo.png" 
                             style="max-width:44px;max-height:44px;border-radius:50%;border:2px solid #9b6e45;" alt="logo">
                        <span style="margin-left:1.5rem;font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:500;color:#ede8dc;letter-spacing:0.06em;">Country</span>
                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" style="filter:invert(1);opacity:0.7;"></button>
                    </div>
                    <div class="modal-body" style="padding:1.8rem 2rem !important;background:#f5f0e8;">
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="background:#d4c9b0;border:1px solid #d4c9b0;color:#2c2620;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;min-width:100px;">ID</span>
                            <input id="cid" type="text" class="form-control" placeholder="CRI"
                                style="background:#fff;border:1px solid #d4c9b0;color:#2c2620;font-size:0.9rem;">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="background:#d4c9b0;border:1px solid #d4c9b0;color:#2c2620;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;min-width:100px;">Nombre</span>
                            <input id="cname" type="text" class="form-control" placeholder="República de Costa Rica"
                                style="background:#fff;border:1px solid #d4c9b0;color:#2c2620;font-size:0.9rem;">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="background:#d4c9b0;border:1px solid #d4c9b0;color:#2c2620;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;min-width:100px;">Capital</span>
                            <input id="ccapital" type="text" class="form-control" placeholder="San José"
                                style="background:#fff;border:1px solid #d4c9b0;color:#2c2620;font-size:0.9rem;">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="background:#d4c9b0;border:1px solid #d4c9b0;color:#2c2620;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;min-width:100px;">Población</span>
                            <input id="cpopulation" type="number" class="form-control" placeholder="0"
                                style="background:#fff;border:1px solid #d4c9b0;color:#2c2620;font-size:0.9rem;">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="background:#d4c9b0;border:1px solid #d4c9b0;color:#2c2620;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;min-width:100px;">Área km²</span>
                            <input id="carea" type="number" class="form-control" placeholder="0"
                                style="background:#fff;border:1px solid #d4c9b0;color:#2c2620;font-size:0.9rem;">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="background:#d4c9b0;border:1px solid #d4c9b0;color:#2c2620;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;min-width:100px;">Bandera URL</span>
                            <input id="cflag" type="text" class="form-control" placeholder="https://..."
                                style="background:#fff;border:1px solid #d4c9b0;color:#2c2620;font-size:0.9rem;">
                        </div>
                    </div>
                    <div class="modal-footer" style="
                        background:#ede8dc !important;
                        border-top:1px solid #d4c9b0 !important;
                        padding:1rem 1.5rem !important;
                    ">
                        <button id="apply" type="button" style="
                            background:#9b6e45;border:none;color:#fff;
                            font-size:0.8rem;font-weight:600;letter-spacing:0.1em;
                            text-transform:uppercase;padding:0.5rem 1.5rem;
                            border-radius:6px;cursor:pointer;
                        ">Aplicar</button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    showModal= async ()=>{
        const e = this.state.entity;
        document.querySelector('#countryModal #cid').value         = e.id          || '';
        document.querySelector('#countryModal #cname').value       = e.name        || '';
        document.querySelector('#countryModal #ccapital').value    = e.capital     || '';
        document.querySelector('#countryModal #cpopulation').value = e.population  || 0;
        document.querySelector('#countryModal #carea').value       = e.area        || 0;
        document.querySelector('#countryModal #cflag').value       = e.flags?.[0]  || '';
        document.querySelector('#countryModal #cid').disabled      = (this.state.mode === 'E');
        this.modal.show();
    }

    load=()=>{
        const e = this.state.entity;
        e.id         = document.querySelector('#countryModal #cid').value.trim();
        e.name       = document.querySelector('#countryModal #cname').value.trim();
        e.capital    = document.querySelector('#countryModal #ccapital').value.trim();
        e.population = parseInt(document.querySelector('#countryModal #cpopulation').value) || 0;
        e.area       = parseInt(document.querySelector('#countryModal #carea').value) || 0;
        e.flags      = [document.querySelector('#countryModal #cflag').value.trim()];
        e.latLng     = [0.0, 0.0];
    }

    reset=()=>{
        this.state.entity = this.emptyEntity();
        document.querySelector('#countryModal #cid').disabled = false;
    }

    emptyEntity=()=>{
        return {id:'', name:'', capital:'', population:0, area:0, flags:[], latLng:[0,0]};
    }

    add=()=>{
        this.load();
        const entity = this.state.entity;
        if(this.state.mode === 'A'){
            const request = new Request(`${backend}/countries`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(entity)
            });
            (async ()=>{
                const response = await fetch(request);
                if(!response.ok){ errorMessage(response.status); return; }
                this.list();
                this.reset();
                this.modal.hide();
            })();
        } else {
            this.update();
        }
    }

    update=()=>{
        this.load();
        const entity = this.state.entity;
        const request = new Request(`${backend}/countries/${entity.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        });
        (async ()=>{
            const response = await fetch(request);
            if(!response.ok){ errorMessage(response.status); return; }
            this.list();
            this.reset();
            this.modal.hide();
        })();
    }

    delete=(id)=>{
        if(!confirm(`¿Eliminar el país con ID "${id}"?`)) return;
        const request = new Request(`${backend}/countries/${id}`, {
            method: 'DELETE',
            headers: {}
        });
        (async ()=>{
            const response = await fetch(request);
            if(!response.ok){ errorMessage(response.status); return; }
            this.list();
        })();
    }

    validate=()=>{}

    list=()=>{
        const request = new Request(`${backend}/countries`, {method:'GET', headers:{}});
        (async ()=>{
            const response = await fetch(request);
            if(!response.ok){ errorMessage(response.status); return; }
            var countries = await response.json();
            this.state.entities = countries;
            var listing = this.dom.querySelector("#listbody");
            listing.innerHTML = "";
            this.state.entities.forEach(e => this.row(listing, e));
        })();
    }

    row=(list, c)=>{
        var tr = document.createElement("tr");
        tr.innerHTML=`
            <td>${c.name}</td>
            <td>${c.capital || '—'}</td>
            <td><img class="flag" src="${c.flags?.[0] || ''}" alt="${c.name}"></td>
            <td>
                <div class="d-flex gap-2">
                    <button class="btn btn-warning btn-edit">Edit</button>
                    <button class="btn btn-danger btn-delete">Delete</button>
                </div>
            </td>`;
        tr.querySelector('.btn-edit').addEventListener('click', ()=>{
            this.state.entity = {...c};
            this.state.mode = 'E';
            this.showModal();
        });
        tr.querySelector('.btn-delete').addEventListener('click', ()=>{
            this.delete(c.id);
        });
        list.append(tr);
    }

    makenew=()=>{
        this.reset();
        this.state.mode = 'A';
        this.showModal();
    }

    search= async ()=>{
        var nombre = this.dom.querySelector("#form #name").value;
        let request = new Request(`${backend}/countries?name=${nombre}`, {method:'GET', headers:{}});
        let response = await fetch(request);
        if(!response.ok){ errorMessage(response.status); return; }
        this.state.entities = await response.json();
        var listing = this.dom.querySelector("#listbody");
        listing.innerHTML = "";
        this.state.entities.forEach(e => this.row(listing, e));
    }
}