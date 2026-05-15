class App {
    dom;
    loginModal;
    registerModal;
    countries;

    constructor() {
        this.dom = this.render();

        this.loginModal    = new bootstrap.Modal(document.querySelector('#loginModal'));
        this.registerModal = new bootstrap.Modal(document.querySelector('#registerModal'));

        document.querySelector('#loginModal #applyLogin').addEventListener('click', () => this.login());
        document.querySelector('#registerModal #applyRegister').addEventListener('click', () => this.register());

        this.countries = new Countries();
        this.renderBodyFiller();
        this.renderMenuItems();
    }


    render = () => {
        const rootContent = document.createElement('div');
        rootContent.id = 'app';
        rootContent.innerHTML = `
            ${this.renderMenu()}
            ${this.renderBody()}
            ${this.renderFooter()}
        `;

        const modals = document.createElement('div');
        modals.innerHTML = this.renderLoginModal() + this.renderRegisterModal();
        document.body.appendChild(modals);

        return rootContent;
    }

    renderMenu = () => `
        <nav id="menu" class="navbar navbar-expand-lg navbar-dark bg-dark p-0">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="images/logo.png" class="logo rounded-circle" alt="logo">
                Countries
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuCollapse">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div id="menuCollapse" class="collapse navbar-collapse">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="menuItems"></ul>
            </div>
          </div>
        </nav>`;

    renderBody = () => `<div id="body"></div>`;

    renderFooter = () => `
        <footer id="footer" class="bg-dark text-white mt-4 w-100 fixed-bottom">
            <div class="container-fluid py-2">
                <div class="row">
                    <div class="col-md-2"><h5>Total Soft Inc.</h5></div>
                    <div class="col-md-7">
                        <h4>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-facebook"></i>
                            <i class="fab fa-instagram"></i>
                        </h4>
                    </div>
                    <div class="col-md-3 text-right small align-self-end">©2024 Tsf, Inc.</div>
                </div>
            </div>
        </footer>`;

    renderLoginModal = () => `
        <div id="loginModal" class="modal fade" tabindex="-1">
           <div class="modal-dialog modal-dialog-centered">
               <div class="modal-content">
                   <div class="modal-header">
                       <img src="images/user.png" style="max-width:44px;max-height:44px;border-radius:50%;border:2px solid #9b6e45;" alt="logo">
                       <span style="margin-left:1.5rem;font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:500;color:#ede8dc;letter-spacing:0.06em;">Iniciar Sesión</span>
                       <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" style="filter:invert(1);opacity:0.7;"></button>
                   </div>
                   <div class="modal-body">
                       <div class="input-group mb-3">
                           <span class="input-group-text">ID</span>
                           <input type="text" class="form-control" id="loginId" placeholder="usuario">
                       </div>
                       <div class="input-group mb-3">
                           <span class="input-group-text">Clave</span>
                           <input type="password" class="form-control" id="loginPassword" placeholder="••••••••">
                       </div>
                       <div id="loginError" style="display:none;color:#c0392b;font-size:0.82rem;text-align:center;">
                           Credenciales incorrectas. Intente de nuevo.
                       </div>
                   </div>
                   <div class="modal-footer" style="justify-content:space-between;align-items:center;">
                       <span style="font-size:0.82rem;color:#8a7d6e;">
                           ¿No tiene cuenta?
                           <a id="goToRegister" href="#" style="color:#9b6e45;font-weight:600;">Regístrese aquí</a>
                       </span>
                       <button id="applyLogin" type="button" class="btn btn-primary">Login</button>
                   </div>
               </div>
           </div>
        </div>`;

    renderRegisterModal = () => `
        <div id="registerModal" class="modal fade" tabindex="-1">
           <div class="modal-dialog modal-dialog-centered">
               <div class="modal-content">
                   <div class="modal-header">
                       <img src="images/user.png" style="max-width:44px;max-height:44px;border-radius:50%;border:2px solid #9b6e45;" alt="logo">
                       <span style="margin-left:1.5rem;font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:500;color:#ede8dc;letter-spacing:0.06em;">Registro de Usuario</span>
                       <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" style="filter:invert(1);opacity:0.7;"></button>
                   </div>
                   <div class="modal-body">
                       <div class="input-group mb-3">
                           <span class="input-group-text">ID</span>
                           <input type="text" class="form-control" id="regId" placeholder="nombre de usuario">
                       </div>
                       <div class="input-group mb-3">
                           <span class="input-group-text">Clave</span>
                           <input type="password" class="form-control" id="regPassword" placeholder="••••••••">
                       </div>
                       <div class="input-group mb-3">
                           <span class="input-group-text">Rol</span>
                           <select class="form-select" id="regRole">
                               <option value="reader">Reader — puede editar países</option>
                               <option value="writer">Writer — puede crear y editar países</option>
                               <option value="admin">Admin — puede eliminar países</option>
                           </select>
                       </div>
                       <div id="registerError"
                            style="display:none;font-size:0.82rem;text-align:center;padding:0.5rem;border-radius:6px;"></div>
                   </div>
                   <div class="modal-footer">
                       <button id="applyRegister" type="button" class="btn btn-primary">Registrarse</button>
                   </div>
               </div>
           </div>
        </div>`;

    renderBodyFiller = () => {
        this.dom.querySelector('#body').innerHTML = `
            <div id="bodyFiller">
                <p>Información de los países del mundo.</p>
            </div>`;
    }


    renderMenuItems = () => {
        const u = globalstate.user;
        let html = '';

        if (u === null) {
            html += `
                <li class="nav-item">
                    <a class="nav-link" id="navCountries" href="#">
                        <i class="fas fa-globe"></i> Países
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="navLogin" href="#">
                        <i class="fa fa-address-card"></i> Login
                    </a>
                </li>`;
        } else {
            html += `
                <li class="nav-item">
                    <a class="nav-link" id="navCountries" href="#">
                        <i class="fas fa-globe"></i> Países
                    </a>
                </li>`;

            const roleBadge = {
                admin:  ' Admin',
                writer: ' Writer',
                reader: ' Reader'
            }[u.role] || u.role;

            html += `
                <li class="nav-item">
                    <a class="nav-link disabled" style="opacity:0.7;font-size:0.78rem;">
                        ${roleBadge} · ${u.id}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="navLogout" href="#">
                        <i class="fas fa-power-off"></i> Logout
                    </a>
                </li>`;
        }

        const menu = this.dom.querySelector('#menuItems');
        menu.innerHTML = html;

        menu.querySelector('#navCountries')?.addEventListener('click', () => this.showCountries());
        menu.querySelector('#navLogin')?.addEventListener('click', () => {
            document.querySelector('#loginError').style.display = 'none';
            this.loginModal.show();
            document.querySelector('#goToRegister').onclick = (e) => {
                e.preventDefault();
                this.loginModal.hide();
                setTimeout(() => this.registerModal.show(), 300);
            };
        });
        menu.querySelector('#navLogout')?.addEventListener('click', () => this.logout());

        if (u !== null) this.showCountries();
    }

    showCountries = () => {
        this.dom.querySelector('#body').replaceChildren(this.countries.dom);
        this.countries.list();
    }


    login = async () => {
        const id       = document.querySelector('#loginId').value.trim();
        const password = document.querySelector('#loginPassword').value.trim();
        const errorDiv = document.querySelector('#loginError');

        try {
            const response = await fetch(`${backend}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, password })
            });

            if (!response.ok) {
                errorDiv.style.display = 'block';
                return;
            }

            const data = await response.json();
            globalstate.user = { id: data.id, role: data.role, token: data.token };

            errorDiv.style.display = 'none';
            this.loginModal.hide();
            this.countries = new Countries();
            this.renderMenuItems();

        } catch (err) {
            errorDiv.style.display = 'block';
        }
    }


    register = async () => {
        const id       = document.querySelector('#regId').value.trim();
        const password = document.querySelector('#regPassword').value.trim();
        const role     = document.querySelector('#regRole').value;
        const errorDiv = document.querySelector('#registerError');

        errorDiv.style.display = 'none';

        if (!id || !password) {
            errorDiv.textContent = 'ID y contraseña son requeridos.';
            errorDiv.style.cssText += 'display:block;background:#fde8e8;color:#c0392b;';
            return;
        }

        try {
            const response = await fetch(`${backend}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, password, role })
            });

            if (response.status === 409) {
                errorDiv.textContent = 'Ese ID de usuario ya está en uso.';
                errorDiv.style.cssText += 'display:block;background:#fde8e8;color:#c0392b;';
                return;
            }

            if (!response.ok) {
                const err = await response.json();
                errorDiv.textContent = err.error || 'Error al registrarse.';
                errorDiv.style.cssText += 'display:block;background:#fde8e8;color:#c0392b;';
                return;
            }

            errorDiv.textContent = `¡Usuario "${id}" registrado con rol "${role}". Ahora inicie sesión.`;
            errorDiv.style.cssText += 'display:block;background:#e8f5e9;color:#2e7d32;';
            document.querySelector('#regId').value = '';
            document.querySelector('#regPassword').value = '';

            setTimeout(() => {
                this.registerModal.hide();
                this.loginModal.show();
            }, 2000);

        } catch (err) {
            errorDiv.textContent = 'Error de red. Verifique que el backend esté activo.';
            errorDiv.style.cssText += 'display:block;background:#fde8e8;color:#c0392b;';
        }
    }


    logout = () => {
        globalstate.user = null;
        this.countries = new Countries();
        this.renderBodyFiller();
        this.renderMenuItems();
    }
}