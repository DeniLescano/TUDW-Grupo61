import { getSalones } from './salonesData.js';

const salonesContainer = document.getElementById('salones-container');
const noSalonesMessage = document.getElementById('no-salones-message');

function renderCatalogoSalones() {
    salonesContainer.innerHTML = ''; 
    const salones = getSalones();

    if (salones.length === 0) {
        noSalonesMessage.style.display = 'block'; 
        return;
    } else {
        noSalonesMessage.style.display = 'none'; 
    }

    salones.forEach(salon => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');

        const cardArticle = document.createElement('article');
        cardArticle.classList.add('card', 'h-100');

        
        cardArticle.innerHTML = `
    <img src="${salon.imagen}" class="card-img-top" alt="Imagen del Salón ${salon.nombre}">
    <div class="card-body">
        <h5 class="card-title">${salon.nombre}</h5>
        <p class="card-text">${salon.descripcion}</p>
        <p><strong>Ubicación:</strong> ${salon.ubicacion}</p>
        <p><strong>Capacidad:</strong> ${salon.capacidad} personas</p>
        <p><strong>Precio/Día:</strong> $${salon.precioPorDia.toFixed(2)}</p>
        <p><strong>Servicios:</strong> ${salon.servicios.join(', ')}</p>
        <p><strong>Contacto:</strong> ${salon.contacto}</p>
        <p><strong>Estado:</strong> ${salon.estado}</p>
    </div>
    <div class="card-footer">
        <a href="${salon.imagen}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-custom">Ver imágenes</a>
    </div>
        `;
        
        colDiv.appendChild(cardArticle);
        salonesContainer.appendChild(colDiv);
    });
}

document.addEventListener('DOMContentLoaded', renderCatalogoSalones);