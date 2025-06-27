import { getSalones, initializeLocalStorage } from './salonesData.js';

const salonesContainer = document.getElementById('salones-container');
const noSalonesMessage = document.getElementById('no-salones-message');

function obtenerServiciosDesdeStorage() {
  return JSON.parse(localStorage.getItem('servicios')) || [];
}

function obtenerDescripcionServiciosPorId(serviciosGuardados) {
  const serviciosDisponibles = obtenerServiciosDesdeStorage();

  return serviciosGuardados.map(item => {
    const id = parseInt(item);
    if (!isNaN(id)) {
      const encontrado = serviciosDisponibles.find(s => s.id === id);
      return encontrado ? encontrado.descripcion : `(ID ${item})`;
    }
    const existe = serviciosDisponibles.some(s => s.descripcion === item);
    return existe ? item : `(ID ${item})`;
  });
}

function obtenerImagenSalon(idSalon) {
  const imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];

  // Buscar imágenes asociadas al salón
  const imagenesSalon = imagenes.filter(img => img.idSalon == idSalon);

  if (imagenesSalon.length > 0) {
    return imagenesSalon[0].ruta; // Primera imagen del salón
  }

  return 'img/no-image.png'; // Imagen por defecto
}

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

    const serviciosDescripcion = obtenerDescripcionServiciosPorId(salon.servicios).join(', ');
    const imagenRuta = obtenerImagenSalon(salon.id);

    console.log("Imagen usada:", imagenRuta);

    cardArticle.innerHTML = `
      <img src="${imagenRuta}" class="card-img-top" alt="Imagen del Salón ${salon.nombre}">
      <div class="card-body">
        <h5 class="card-title">${salon.nombre}</h5>
        <p class="card-text">${salon.descripcion}</p>
        <p><strong>Ubicación:</strong> ${salon.ubicacion}</p>
        <p><strong>Capacidad:</strong> ${salon.capacidad} personas</p>
        <p><strong>Precio/Día:</strong> $${salon.precioPorDia.toFixed(2)}</p>
        <p><strong>Servicios:</strong> ${serviciosDescripcion}</p>
        <p><strong>Contacto:</strong> ${salon.contacto}</p>
        <p><strong>Estado:</strong> ${salon.estado}</p>
      </div>
      <div class="card-footer">
      
        <a href="${imagenRuta}" target="_blank" rel="noopener noreferrer" class="btn btn-custom">Ver imagen</a>
      </div>
    `;

    colDiv.appendChild(cardArticle);
    salonesContainer.appendChild(colDiv);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeLocalStorage();
  renderCatalogoSalones();
});
