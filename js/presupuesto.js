// js/presupuesto.js
function cargarServicios() {
  const contenedor = document.getElementById('servicios-disponibles');
  const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

  servicios.forEach(serv => {
    const label = document.createElement('label');
    label.className = 'border rounded p-2 d-flex align-items-center';
    label.style.cursor = 'pointer';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = serv.id;
    checkbox.dataset.valor = serv.valor;
    checkbox.dataset.descripcion = serv.descripcion;
    checkbox.className = 'me-2';

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(`${serv.descripcion} ($${parseFloat(serv.valor).toFixed(2)})`));

    contenedor.appendChild(label);
  });
}

function guardarPresupuesto(presupuesto) {
  const lista = JSON.parse(localStorage.getItem('presupuestos')) || [];
  lista.push(presupuesto);
  localStorage.setItem('presupuestos', JSON.stringify(lista));
}

function generarPresupuesto(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre-apellido').value.trim();
  const fecha = document.getElementById('fecha').value;
  const tematica = document.getElementById('tematica').value.trim();
  const serviciosSeleccionados = [...document.querySelectorAll('#servicios-disponibles input:checked')];

  if (!nombre || !fecha || serviciosSeleccionados.length === 0) {
    alert('Completá todos los campos y seleccioná al menos un servicio.');
    return;
  }

  const serviciosTexto = serviciosSeleccionados.map(cb => cb.dataset.descripcion);
  const total = serviciosSeleccionados.reduce((acc, cb) => acc + parseFloat(cb.dataset.valor), 0);

  const presupuesto = {
    id: Date.now(),
    nombre,
    fecha,
    tematica,
    servicios: serviciosTexto,
    total: total.toFixed(2)
  };

  guardarPresupuesto(presupuesto);

  document.getElementById('res-nombre').textContent = nombre;
  document.getElementById('res-fecha').textContent = fecha;
  document.getElementById('res-tematica').textContent = tematica || '-';
  document.getElementById('res-servicios').textContent = serviciosTexto.join(', ');
  document.getElementById('res-total').textContent = total.toFixed(2);

  document.getElementById('presupuesto-final').classList.remove('d-none');
  document.getElementById('form-presupuesto').reset();
  document.querySelectorAll('#servicios-disponibles input').forEach(cb => cb.checked = false);
}

document.addEventListener('DOMContentLoaded', () => {
  cargarServicios();
  document.getElementById('form-presupuesto').addEventListener('submit', generarPresupuesto);
});


