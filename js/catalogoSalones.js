// js/catalogoSalones.js
import { getSalones } from './salonesData.js';

const salonesContainer = document.getElementById('salones-container');
const noSalonesMessage = document.getElementById('no-salones-message');

function renderCatalogoSalones() {
    salonesContainer.innerHTML = ''; // Limpia el contenedor antes de renderizar
    const salones = getSalones();

    if (salones.length === 0) {
        noSalonesMessage.style.display = 'block'; // Muestra el mensaje si no hay salones
        return;
    } else {
        noSalonesMessage.style.display = 'none'; // Oculta el mensaje si hay salones
    }

    salones.forEach(salon => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');

        const cardArticle = document.createElement('article');
        cardArticle.classList.add('card', 'h-100');

        // Contenido de la tarjeta (imagen, cuerpo y footer)
        cardArticle.innerHTML = `
            <img src="img/${salon.imagen}" class="card-img-top" alt="Imagen del Salón ${salon.nombre}">
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
                <a href="img/${salon.imagen}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-custom">Ver imágenes</a>
            </div>
        `;
        // Nota: El enlace "Ver imágenes" apunta a la misma imagen por simplicidad.
        // Si tienes galerías por salón, aquí podrías enlazar a una página de detalle.

        colDiv.appendChild(cardArticle);
        salonesContainer.appendChild(colDiv);
    });
}

// Cargar los salones al cargar la página del catálogo
document.addEventListener('DOMContentLoaded', renderCatalogoSalones);