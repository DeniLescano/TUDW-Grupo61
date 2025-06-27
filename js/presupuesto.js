import { getSalones } from './salonesData.js';

function cargarServicios() {
  const contenedor = document.getElementById('servicios-disponibles');
  const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  contenedor.innerHTML = '';

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

function cargarServiciosSegunSalon() {
  const contenedor = document.getElementById('servicios-disponibles');
  contenedor.innerHTML = '';

  const salonId = document.getElementById('salon').value;
  const salones = getSalones();
  const salonSeleccionado = salones.find(s => s.id === salonId);

  if (!salonSeleccionado) return;

  const todosLosServicios = JSON.parse(localStorage.getItem('servicios')) || [];
const serviciosFiltrados = todosLosServicios.filter(serv =>
  salonSeleccionado.servicios.includes(serv.id)
);



  serviciosFiltrados.forEach(serv => {
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


function cargarSalones() {
  const selectSalon = document.getElementById('salon');
  const salones = getSalones();

  salones.forEach(salon => {
    const option = document.createElement('option');
    option.value = salon.id;
    option.textContent = `${salon.nombre} - $${parseFloat(salon.precioPorDia).toFixed(2)}`;
    option.dataset.precio = salon.precioPorDia;
    selectSalon.appendChild(option);
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
  const salonSelect = document.getElementById('salon');
  const cantidadPersonas = document.getElementById('cantidad-personas').value;
  const serviciosSeleccionados = [...document.querySelectorAll('#servicios-disponibles input:checked')];

  if (!nombre || !fecha || !salonSelect.value || !cantidadPersonas || serviciosSeleccionados.length === 0) {
    alert('Completá todos los campos y seleccioná al menos un servicio.');
    return;
  }

  const salonId = salonSelect.value;
  const salonTexto = salonSelect.options[salonSelect.selectedIndex].text;
  const precioSalon = parseFloat(salonSelect.options[salonSelect.selectedIndex].dataset.precio);
  const serviciosTexto = serviciosSeleccionados.map(cb => cb.dataset.descripcion);
  const totalServicios = serviciosSeleccionados.reduce((acc, cb) => acc + parseFloat(cb.dataset.valor), 0);
  const total = totalServicios + precioSalon;

  const presupuesto = {
    id: Date.now(),
    nombre,
    fecha,
    tematica,
    salonId,
    salonTexto,
    cantidadPersonas: parseInt(cantidadPersonas),
    servicios: serviciosTexto,
    total: total.toFixed(2)
  };

  guardarPresupuesto(presupuesto);

  document.getElementById('res-nombre').textContent = nombre;
  document.getElementById('res-fecha').textContent = fecha;
  document.getElementById('res-tematica').textContent = tematica || '-';
  document.getElementById('res-salon').textContent = salonTexto;
  document.getElementById('res-cantidad').textContent = cantidadPersonas;
  document.getElementById('res-servicios').textContent = serviciosTexto.join(', ');
  document.getElementById('res-total').textContent = total.toFixed(2);

  document.getElementById('presupuesto-final').classList.remove('d-none');
  document.getElementById('form-presupuesto').reset();
  document.querySelectorAll('#servicios-disponibles input').forEach(cb => cb.checked = false);
  document.getElementById('salon').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
 cargarSalones();
  document.getElementById('salon').addEventListener('change', cargarServiciosSegunSalon);
  document.getElementById('form-presupuesto').addEventListener('submit', generarPresupuesto);
});
