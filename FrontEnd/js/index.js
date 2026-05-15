var backend = "http://localhost:8080";

var globalstate = { user: null };

var app;

function loaded() {
    app = new App();
    document.querySelector('#root').replaceChildren(app.dom);
}

document.addEventListener("DOMContentLoaded", loaded);

function authHeaders(extra = {}) {
    const headers = { 'Content-Type': 'application/json', ...extra };
    if (globalstate.user?.token) {
        headers['Authorization'] = `Bearer ${globalstate.user.token}`;
    }
    return headers;
}

function errorMessage(code) {
    const msgs = {
        401: 'No autenticado. Inicie sesión.',
        403: 'Acceso denegado. Su rol no tiene permiso para esta acción.',
        404: 'Recurso no encontrado.',
        409: 'Conflicto: el recurso ya existe.',
        500: 'Error interno del servidor.'
    };
    alert(`Error ${code}: ${msgs[code] || 'Error desconocido'}`);
}