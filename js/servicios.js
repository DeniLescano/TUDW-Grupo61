const serviciosKey = 'servicios';
const form = document.getElementById('form-servicio');
const tabla = document.getElementById('tabla-servicios');
const inputId = document.getElementById('servicio-id');
const inputDesc = document.getElementById('descripcion-servicio');
const inputValor = document.getElementById('valor-servicio');
const btnCancelar = document.getElementById('cancelar-edicion');

function obtenerServicios() {
  return JSON.parse(localStorage.getItem(serviciosKey)) || [];
}

function guardarServicios(servicios) {
  localStorage.setItem(serviciosKey, JSON.stringify(servicios));
}

function renderTabla() {
  const servicios = obtenerServicios();
  tabla.innerHTML = '';
  if (servicios.length === 0) {
    tabla.innerHTML = '<tr><td colspan="4" class="text-muted">No hay servicios cargados.</td></tr>';
    return;
  }

  servicios.forEach(serv => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${serv.id}</td>
      <td>${serv.descripcion}</td>
      <td>$${parseFloat(serv.valor).toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarServicio(${serv.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${serv.id})">Eliminar</button>
      </td>
    `;
    tabla.appendChild(tr);
  });
}

function editarServicio(id) {
  const servicio = obtenerServicios().find(s => s.id === id);
  if (!servicio) return;
  inputId.value = servicio.id;
  inputDesc.value = servicio.descripcion;
  inputValor.value = servicio.valor;
  btnCancelar.classList.remove('d-none');
}

function eliminarServicio(id) {
  if (!confirm('¿Eliminar servicio?')) return;
  const nuevos = obtenerServicios().filter(s => s.id !== id);
  guardarServicios(nuevos);
  renderTabla();
}

btnCancelar.addEventListener('click', () => {
  inputId.value = '';
  form.reset();
  btnCancelar.classList.add('d-none');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const descripcion = inputDesc.value.trim();
  const valor = parseFloat(inputValor.value);

  if (!descripcion || isNaN(valor)) return;

  let servicios = obtenerServicios();
  const id = inputId.value ? parseInt(inputId.value) : Date.now();

  const nuevoServicio = { id, descripcion, valor };
  
  if (inputId.value) {
    servicios = servicios.map(s => s.id === id ? nuevoServicio : s);
  } else {
    servicios.push(nuevoServicio);
  }

  guardarServicios(servicios);
  form.reset();
  inputId.value = '';
  btnCancelar.classList.add('d-none');
  renderTabla();
});

document.addEventListener('DOMContentLoaded', renderTabla);