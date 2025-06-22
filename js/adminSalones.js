import { getSalones, addSalon, updateSalon, deleteSalon, getSalonById } from './salonesData.js';

const salonForm = document.getElementById('salon-form');
const salonesTableBody = document.querySelector('#salones-table tbody');
const salonIdInput = document.getElementById('salon-id');
const btnSubmitForm = document.getElementById('btn-submit-form');
const btnCancelEdit = document.getElementById('btn-cancel-edit');
const descripcionInput = document.getElementById('descripcion');
const imagenInput = document.getElementById('imagen');
const estadoSelect = document.getElementById('estado');
const alertaEdicion = document.getElementById('alerta-edicion');

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

function cargarFiltrosDinamicos() {
  const contenedor = document.querySelector('#filter-servicios');
  const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  contenedor.innerHTML = '';

  servicios.forEach(serv => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-2';

    const div = document.createElement('div');
    div.className = 'form-check';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'form-check-input';
    input.name = 'servicios-filter';
    input.id = `filter-servicio-${serv.id}`;
    input.value = serv.descripcion;

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.setAttribute('for', `filter-servicio-${serv.id}`);
    label.textContent = serv.descripcion;

    div.appendChild(input);
    div.appendChild(label);
    col.appendChild(div);
    contenedor.appendChild(col);
  });

  document.querySelectorAll('input[name="servicios-filter"]').forEach(cb => {
    cb.addEventListener('change', renderSalonesTable);
  });
}

function renderSalonesTable() {
  const salones = getSalones();
  const filterNombre = document.getElementById('filter-nombre').value.toLowerCase().trim();
  const filterCapacidad = parseInt(document.getElementById('filter-capacidad').value);
  const filterPrecioMin = parseFloat(document.getElementById('filter-precio-min').value) || 0;
  const filterPrecioMax = parseFloat(document.getElementById('filter-precio-max').value) || Infinity;
  const filterEstado = document.getElementById('filter-estado').value.trim();

  const serviciosSeleccionados = Array.from(document.querySelectorAll('input[name="servicios-filter"]:checked')).map(cb => cb.value);

  salonesTableBody.innerHTML = '';

  const salonesFiltrados = salones.filter(salon => {
    const coincideNombre = !filterNombre || salon.nombre.toLowerCase().includes(filterNombre);
    const coincideCapacidad = isNaN(filterCapacidad) || (salon.capacidad >= filterCapacidad - 50 && salon.capacidad <= filterCapacidad + 50);
    const coincidePrecio = salon.precioPorDia >= filterPrecioMin && salon.precioPorDia <= filterPrecioMax;
    const coincideEstado = !filterEstado || salon.estado === filterEstado;
    const serviciosCoinciden = serviciosSeleccionados.every(serv => salon.servicios.includes(serv));
    return coincideNombre && coincideCapacidad && coincidePrecio && coincideEstado &&
      (serviciosSeleccionados.length === 0 || serviciosCoinciden);
  });

  if (salonesFiltrados.length === 0) {
    salonesTableBody.innerHTML = '<tr><td colspan="8" class="text-muted text-center py-3">No hay salones que coincidan con los filtros.</td></tr>';
    return;
  }

  salonesFiltrados.forEach(salon => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${salon.id}</td>
      <td>${salon.nombre}</td>
      <td>${salon.ubicacion}</td>
      <td>${salon.capacidad}</td>
      <td>$${parseFloat(salon.precioPorDia).toFixed(2)}</td>
      <td>${salon.servicios.join(', ')}</td>
      <td>${salon.contacto}</td>
      <td></td>`;

    const acciones = row.querySelector('td:last-child');
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn btn-sm btn-warning me-1';
    btnEdit.textContent = 'Editar';
    btnEdit.addEventListener('click', () => editSalon(salon.id));

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-sm btn-danger';
    btnDelete.textContent = 'Eliminar';
    btnDelete.addEventListener('click', () => confirmDeleteSalon(salon.id, salon.nombre));

    acciones.appendChild(btnEdit);
    acciones.appendChild(btnDelete);

    salonesTableBody.appendChild(row);
  });
}

salonForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(salonForm);
  const servicios = formData.getAll('servicios') || [];

  const newSalon = {
    id: salonIdInput.value || Date.now().toString(),
    nombre: formData.get('nombre') || '',
    ubicacion: formData.get('ubicacion') || '',
    capacidad: parseInt(formData.get('capacidad')) || 0,
    precioPorDia: parseFloat(formData.get('precioPorDia')) || 0,
    servicios,
    contacto: formData.get('contacto') || '',
    descripcion: formData.get('descripcion') || '',
    imagen: formData.get('imagen') || '',
    estado: formData.get('estado') || 'Disponible'
  };
  console.log('Valores del formulario:', newSalon);
  if (!newSalon.nombre || !newSalon.ubicacion || !newSalon.contacto || newSalon.capacidad <= 0) {
    alert('Faltan campos obligatorios o son incorrectos.');
    return;
  }

  if (salonIdInput.value) {
    updateSalon(newSalon);
    alert('Salón actualizado con éxito!');
  } else {
    addSalon(newSalon);
    alert('Salón agregado con éxito!');
  }

  salonForm.reset();
  salonIdInput.value = '';
  btnSubmitForm.textContent = 'Guardar Salón';
  btnCancelEdit.style.display = 'none';
  alertaEdicion.classList.add('d-none');
  renderSalonesTable();
});

function editSalon(id) {
  const salon = getSalonById(id);
  if (!salon) return;

  if (document.querySelectorAll('input[name="servicios"]').length === 0) {
    cargarServiciosDinamicos(); 
    setTimeout(() => editSalon(id), 100); 
    return;
  }

  salonIdInput.value = salon.id;
  document.getElementById('nombre').value = salon.nombre;
  document.getElementById('ubicacion').value = salon.ubicacion;
  document.getElementById('capacidad').value = salon.capacidad;
  document.getElementById('precioPorDia').value = salon.precioPorDia;
  document.getElementById('contacto').value = salon.contacto;
  descripcionInput.value = salon.descripcion;
  imagenInput.value = salon.imagen;
  estadoSelect.value = salon.estado;

  document.querySelectorAll('input[name="servicios"]').forEach(cb => {
    cb.checked = salon.servicios.includes(cb.value);
  });

  alertaEdicion.classList.remove('d-none');
  btnSubmitForm.textContent = 'Actualizar Salón';
  btnCancelEdit.style.display = 'inline-block';
  window.scrollTo(0, 0);
}


btnCancelEdit.addEventListener('click', () => {
  salonForm.reset();
  salonIdInput.value = '';
  btnSubmitForm.textContent = 'Guardar Salón';
  btnCancelEdit.style.display = 'none';
  alertaEdicion.classList.add('d-none');
});

function confirmDeleteSalon(id, nombre) {
  if (confirm(`¿Estás seguro de que quieres eliminar el salón "${nombre}"?`)) {
    deleteSalon(id);
    alert(`Salón "${nombre}" eliminado.`);
    renderSalonesTable();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarServiciosDinamicos();
  cargarFiltrosDinamicos();
  renderSalonesTable();

  document.getElementById('filter-nombre').addEventListener('input', renderSalonesTable);
  document.getElementById('filter-capacidad').addEventListener('input', renderSalonesTable);
  document.getElementById('filter-precio-min').addEventListener('input', renderSalonesTable);
  document.getElementById('filter-precio-max').addEventListener('input', renderSalonesTable);
  document.getElementById('filter-estado').addEventListener('change', renderSalonesTable);

  document.getElementById('btn-clear-filters').addEventListener('click', () => {
    document.getElementById('filter-nombre').value = '';
    document.getElementById('filter-capacidad').value = '';
    document.getElementById('filter-precio-min').value = '';
    document.getElementById('filter-precio-max').value = '';
    document.getElementById('filter-estado').value = '';
    document.querySelectorAll('input[name="servicios-filter"]').forEach(cb => cb.checked = false);
    renderSalonesTable();
  });
});
