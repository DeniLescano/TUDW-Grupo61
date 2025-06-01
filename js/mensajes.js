import { obtenerMensajes } from './mensaje.js';

const lista = document.getElementById('mensajes-lista');
const sinMensajes = document.getElementById('sin-mensajes');

function renderMensajes() {
    const mensajes = obtenerMensajes();
    lista.innerHTML = '';
    if (mensajes.length === 0) {
        sinMensajes.style.display = 'block';
        return;
    }
    sinMensajes.style.display = 'none';
    mensajes.forEach(msg => {
        const card = document.createElement('div');
        card.className = "mb-3 p-3 border rounded bg-light";
        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <strong><i class="fa-solid fa-user"></i> ${msg.nombre}</strong>
                <span class="text-muted small"><i class="fa-regular fa-calendar"></i> ${msg.fecha}</span>
            </div>
            <div class="mb-1"><i class="fa-solid fa-envelope"></i> <a href="mailto:${msg.email}">${msg.email}</a></div>
            <div class="mb-2"><i class="fa-solid fa-comment"></i> ${msg.mensaje}</div>
        `;
        lista.appendChild(card);
    });
}

renderMensajes();