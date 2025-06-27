// adminSalones.js
import {
  getSalones, addSalon, updateSalon, deleteSalon, getSalonById,
  initializeLocalStorage
} from './salonesData.js';

const salonForm = document.getElementById('salon-form');
const salonesTableBody = document.querySelector('#salones-table tbody');
const salonIdInput = document.getElementById('salon-id');
const btnSubmitForm = document.getElementById('btn-submit-form');
const btnCancelEdit = document.getElementById('btn-cancel-edit');
const descripcionInput = document.getElementById('descripcion');
const estadoSelect = document.getElementById('estado');
const alertaEdicion = document.getElementById('alerta-edicion');

function cargarImagenesCheckbox() {
  const contenedor = document.getElementById('imagenes-disponibles');
  const imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];
  contenedor.innerHTML = '';

  imagenes.forEach(img => {
    const div = document.createElement('div');
    div.className = 'form-check';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'form-check-input';
    input.name = 'imagenes';
    input.id = `img-${img.id}`;
    input.value = img.ruta;

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.setAttribute('for', `img-${img.id}`);
    label.innerHTML = `<img src="img/${img.ruta}" style="width:60px;">`;

    div.appendChild(input);
    div.appendChild(label);
    contenedor.appendChild(div);
  });
}

function cargarServiciosDinamicos() {
  const contenedor = document.getElementById('servicios-dinamicos');
  const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  contenedor.innerHTML = '';
  servicios.forEach(serv => {
    const col = document.createElement('div');
    col.className = 'col-6 col-lg-4';
    const div = document.createElement('div');
    div.className = 'form-check';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'form-check-input';
    input.name = 'servicios';
    input.id = `servicio-${serv.id}`;
    input.value = serv.descripcion;
    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.setAttribute('for', `servicio-${serv.id}`);
    label.textContent = serv.descripcion;
    div.appendChild(input);
    div.appendChild(label);
    col.appendChild(div);
    contenedor.appendChild(col);
  });
}

function renderSalonesTable() {
  const salones = getSalones();
  salonesTableBody.innerHTML = '';
  if (salones.length === 0) {
    salonesTableBody.innerHTML = '<tr><td colspan="9">No hay salones cargados.</td></tr>';
    return;
  }

  salones.forEach(salon => {
    const row = document.createElement('tr');
    const imgRuta = salon.imagen ? `img/${salon.imagen}` : '';
    const imgHTML = salon.imagen ? `<img src="${imgRuta}" style="width:60px;">` : '—';

    row.innerHTML = `
      <td>${salon.id}</td>
      <td>${salon.nombre}</td>
      <td>${salon.ubicacion}</td>
      <td>${salon.capacidad}</td>
      <td>$${parseFloat(salon.precioPorDia).toFixed(2)}</td>
      <td>${(salon.servicios || []).join(', ')}</td>
      <td>${salon.contacto}</td>
      <td>${imgHTML}</td>
      <td></td>
    `;

    const acciones = row.querySelector('td:last-child');
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn btn-warning btn-sm me-1';
    btnEdit.textContent = 'Editar';
    btnEdit.onclick = () => cargarSalonEnFormulario(salon.id);

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-danger btn-sm';
    btnDelete.textContent = 'Eliminar';
    btnDelete.onclick = () => {
      if (confirm(`Eliminar salón ${salon.nombre}?`)) {
        deleteSalon(salon.id);
        renderSalonesTable();
      }
    };

    acciones.appendChild(btnEdit);
    acciones.appendChild(btnDelete);
    salonesTableBody.appendChild(row);
  });
}

salonForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(salonForm);
  const id = salonIdInput.value || Date.now().toString();
  const servicios = formData.getAll('servicios');
  const imagenes = formData.getAll('imagenes');

  const nuevoSalon = {
    id,
    nombre: formData.get('nombre'),
    ubicacion: formData.get('ubicacion'),
    capacidad: parseInt(formData.get('capacidad')),
    precioPorDia: parseFloat(formData.get('precioPorDia')),
    contacto: formData.get('contacto'),
    descripcion: formData.get('descripcion'),
    imagen: imagenes[0] || '', // primera imagen como principal
    estado: formData.get('estado'),
    servicios,
  };

  if (salonIdInput.value) {
    updateSalon(nuevoSalon);
    alert('Salón actualizado');
  } else {
    addSalon(nuevoSalon);
    alert('Salón agregado');
  }

  salonForm.reset();
  salonIdInput.value = '';
  btnSubmitForm.textContent = 'Guardar Salón';
  btnCancelEdit.style.display = 'none';
  alertaEdicion.classList.add('d-none');
  renderSalonesTable();
});

btnCancelEdit.addEventListener('click', () => {
  salonForm.reset();
  salonIdInput.value = '';
  btnSubmitForm.textContent = 'Guardar Salón';
  btnCancelEdit.style.display = 'none';
  alertaEdicion.classList.add('d-none');
});

function cargarSalonEnFormulario(id) {
  const salon = getSalonById(id);
  if (!salon) return;

  salonIdInput.value = salon.id;
  document.getElementById('nombre').value = salon.nombre;
  document.getElementById('ubicacion').value = salon.ubicacion;
  document.getElementById('capacidad').value = salon.capacidad;
  document.getElementById('precioPorDia').value = salon.precioPorDia;
  document.getElementById('contacto').value = salon.contacto;
  document.getElementById('descripcion').value = salon.descripcion;
  estadoSelect.value = salon.estado;

  const checkboxes = document.querySelectorAll('input[name="servicios"]');
  checkboxes.forEach(cb => {
    cb.checked = salon.servicios.includes(cb.value);
  });

  const imagenes = salon.imagen ? [salon.imagen] : [];
  const imgChecks = document.querySelectorAll('input[name="imagenes"]');
  imgChecks.forEach(cb => {
    cb.checked = imagenes.includes(cb.value);
  });

  alertaEdicion.classList.remove('d-none');
  btnSubmitForm.textContent = 'Actualizar Salón';
  btnCancelEdit.style.display = 'inline-block';
  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', async () => {
  await initializeLocalStorage();
  cargarServiciosDinamicos();
  cargarImagenesCheckbox();
  renderSalonesTable();
});