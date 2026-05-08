class App{
    dom;
    modal;

    state;
    countries;

    constructor(){
        this.state={};
        this.dom=this.render();
        this.modal = new bootstrap.Modal(document.querySelector('#modal'));
        document.querySelector('#modal #apply').addEventListener('click',()=>this.login());
        this.renderBodyFiller();
        this.renderMenuItems();
        this.countries = new Countries();
    }

    render=()=>{
        const html= `
            ${this.renderMenu()}
            ${this.renderBody()} 
            ${this.renderFooter()}
        `;
        var rootContent= document.createElement('div');
        rootContent.id='app';
        rootContent.innerHTML=html;

        // Modal va directo al body, fuera del #app
        var modalDiv = document.createElement('div');
        modalDiv.innerHTML = this.renderModal();
        document.body.appendChild(modalDiv);

        return rootContent;
    }

    renderMenu=()=>{
        return `
        <nav id="menu" class="navbar navbar-expand-lg p-0 navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand font-italic font-weight-light text-info" href="#">
                <img src="images/logo.png" class="logo rounded-circle" alt="logo">
                Countries
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuCollapse">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div id="menuCollapse" class="collapse navbar-collapse">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0" id='menuItems'>
              </ul>
            </div>
          </div>
        </nav>
        `;
    }

    renderBody=()=>{
        return `<div id="body"></div>`;
    }

    renderFooter=()=>{
        return `
        <footer id="footer" class="bg-dark text-white mt-4 w-100 fixed-bottom">
            <div class="container-fluid py-2">
                <div class="row">
                    <div class="col-md-2"><h5>Total Soft Inc.</h5></div>
                    <div class="col-md-7"><h4>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-facebook"></i>
                        <i class="fab fa-instagram"></i></h4>
                    </div>
                    <div class="col-md-3 text-right small align-self-end">©2023 Tsf, Inc.</div>
                </div>
            </div>
        </footer> 
    `;
    }

    renderModal=()=>{
        return `
        <div id="modal" class="modal fade" tabindex="-1">
           <div class="modal-dialog modal-dialog-centered">
               <div class="modal-content" style="
                   background: #f5f0e8 !important;
                   border: none !important;
                   border-radius: 12px !important;
                   overflow: hidden;
                   box-shadow: 0 20px 60px rgba(0,0,0,0.4) !important;
               ">
                   <div class="modal-header" style="
                       background: #2c2620 !important;
                       border-bottom: none !important;
                       padding: 1.2rem 1.5rem !important;
                   ">
                       <img class="img-circle" id="img_logo" src="images/user.png" 
                            style="max-width:44px;max-height:44px;border-radius:50%;border:2px solid #9b6e45;" alt="logo">
                       <span style="margin-left:1.5rem;font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:500;color:#ede8dc;letter-spacing:0.06em;">Login</span> 
                       <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close" style="filter:invert(1);opacity:0.7;"></button>
                   </div>
                   <form id="loginForm">
                   <div class="modal-body" style="padding:1.8rem 2rem !important; background:#f5f0e8;">
                       <div class="input-group mb-3">
                           <span class="input-group-text" style="
                               background:#d4c9b0;border:1px solid #d4c9b0;
                               color:#2c2620;font-size:0.72rem;font-weight:600;
                               letter-spacing:0.1em;text-transform:uppercase;min-width:80px;
                           ">ID</span>
                           <input type="text" class="form-control" id="identificacion" name="identificacion"
                               style="background:#fff;border:1px solid #d4c9b0;color:#2c2620;font-size:0.9rem;"
                               placeholder="admin">
                       </div>  
                       <div class="input-group mb-3">
                           <span class="input-group-text" style="
                               background:#d4c9b0;border:1px solid #d4c9b0;
                               color:#2c2620;font-size:0.72rem;font-weight:600;
                               letter-spacing:0.1em;text-transform:uppercase;min-width:80px;
                           ">Clave</span>
                           <input type="password" class="form-control" id="clave" name="clave"
                               style="background:#fff;border:1px solid #d4c9b0;color:#2c2620;font-size:0.9rem;"
                               placeholder="••••••••">
                       </div>
                       <div id="loginError" style="
                           display:none;color:#c0392b;font-size:0.82rem;
                           text-align:center;margin-top:-0.5rem;margin-bottom:0.5rem;
                       ">Credenciales incorrectas. Intente de nuevo.</div>      
                   </div>
                   <div class="modal-footer" style="
                       background:#ede8dc !important;
                       border-top:1px solid #d4c9b0 !important;
                       padding:1rem 2rem !important;
                       justify-content:space-between;align-items:center;
                   ">
                       <span style="font-style:italic;font-size:0.8rem;color:#8a7d6e;">
                           No tiene cuenta? 
                           <a id="register" href="#" style="color:#9b6e45;text-decoration:none;font-weight:500;">Regístrese aquí</a>
                       </span>
                       <button id="apply" type="button" class="btn btn-primary" style="
                           background:#9b6e45 !important;border-color:#9b6e45 !important;
                           font-size:0.8rem;font-weight:600;letter-spacing:0.1em;
                           text-transform:uppercase;padding:0.5rem 1.5rem;
                       ">Login</button>
                   </div>
                   </form>                 
               </div>         
           </div>          
       </div>   
    `;
    }
    renderBodyFiller=()=>{
        var html= `
        <div id='bodyFiller' style='
            position:relative;z-index:1;
            display:flex;flex-direction:column;align-items:center;
            justify-content:center;min-height:80vh;text-align:center;padding:4rem 2rem;
        '>
            <p style='
                font-family:"Cormorant Garamond",serif;
                font-size:clamp(2rem,5vw,3.5rem);
                font-weight:300;color:#f5f0e8;
                letter-spacing:0.04em;max-width:700px;
                line-height:1.4;text-shadow:0 2px 30px rgba(0,0,0,0.6);
            '>Información de los países del mundo.</p>
        </div>
    `;
        this.dom.querySelector('#app>#body').replaceChildren();
        this.dom.querySelector('#app>#body').innerHTML=html;
    }

    renderMenuItems=()=>{
        var html='';
        if(globalstate.user===null){
            html+=`
          <li class="nav-item">
              <a class="nav-link" id="login" href="#" data-bs-toggle="modal">
                <i class="fa fa-address-card"></i> Login
              </a>
          </li>
        `;
        }else{
            html+=`
            <li class="nav-item">
                <a class="nav-link" id="countries" href="#">
                  <i class="fas fa-file-alt"></i> Countries
                </a>
            </li>
        `;
            html+=`
          <li class="nav-item">
              <a class="nav-link" id="logout" href="#">
                <i class="fas fa-power-off"></i> Logout (${globalstate.user.identificacion})
              </a>
          </li>
        `;
        }
        this.dom.querySelector('#app>#menu #menuItems').replaceChildren();
        this.dom.querySelector('#app>#menu #menuItems').innerHTML=html;
        this.dom.querySelector("#app>#menu #menuItems #countries")?.addEventListener('click',e=>this.countriesShow());
        this.dom.querySelector("#app>#menu #menuItems #login")?.addEventListener('click',e=>this.modal.show());
        this.dom.querySelector("#app>#menu #menuItems #logout")?.addEventListener('click',e=>this.logout());
        if(globalstate.user!==null){
            this.countriesShow();
        }
    }

    countriesShow=()=>{
        this.dom.querySelector('#app>#body').replaceChildren(this.countries.dom);
        this.countries.list();
    }

    login=()=>{
        const identificacion = document.querySelector("#modal #identificacion").value.trim();
        const clave          = document.querySelector("#modal #clave").value.trim();
        const errorDiv       = document.querySelector("#modal #loginError");

        if(identificacion === 'admin' && clave === 'admin123'){
            errorDiv.style.display = 'none';
            globalstate.user = {identificacion: identificacion, rol: 'CLI'};
            this.modal.hide();
            this.renderMenuItems();
        } else {
            errorDiv.style.display = 'block';
        }
    }

    logout=()=>{
        globalstate.user = null;
        this.dom.querySelector('#app>#body').replaceChildren();
        this.renderBodyFiller();
        this.renderMenuItems();
    }
}