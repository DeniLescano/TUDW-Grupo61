import { obtenerImagenesDesdeCarpeta } from './imagenesDisponibles.js';

const form         = document.getElementById('form-imagen');
const inputId      = document.getElementById('imagen-id');
const selectSalon  = document.getElementById('idSalon');
const selectRuta   = document.getElementById('ruta');
const tabla        = document.getElementById('tabla-imagenes');
const preview      = document.getElementById('preview-imagen');

function obtenerImagenes() {
  return JSON.parse(localStorage.getItem('imagenes')) || [];
}

function guardarImagenes(lista) {
  localStorage.setItem('imagenes', JSON.stringify(lista));
}

function cargarSalonesEnSelect() {
  const salones = JSON.parse(localStorage.getItem('salonesDeEventos')) || [];
  selectSalon.innerHTML = '<option value="">Seleccione salón</option>';
  salones.forEach(salon => {
    const opt = document.createElement('option');
    opt.value = salon.id;
    opt.textContent = salon.nombre;
    selectSalon.appendChild(opt);
  });
}

function cargarRutasEnSelect() {
  const rutas = obtenerImagenesDesdeCarpeta();
  selectRuta.innerHTML = '<option value="">Seleccione imagen</option>';
  rutas.forEach(ruta => {
    const opt = document.createElement('option');
    opt.value = ruta;
    opt.textContent = ruta;
    selectRuta.appendChild(opt);
  });
}

function renderTabla() {
  const lista   = obtenerImagenes();
  const salones = JSON.parse(localStorage.getItem('salonesDeEventos')) || [];
  tabla.innerHTML = '';

  if (lista.length === 0) {
    tabla.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No hay imágenes cargadas</td></tr>`;
    return;
  }

  lista.forEach(img => {
    const salon   = salones.find(s => s.id == img.idSalon);
    const nombre  = salon ? salon.nombre : `(ID ${img.idSalon})`;
    const rutaRel = `img/${img.ruta}`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${img.id}</td>
      <td>${nombre}</td>
      <td><img src="${rutaRel}" alt="${img.ruta}" style="width:80px; height:auto;"></td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarImagen(${img.id})">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarImagen(${img.id})">🗑️</button>
      </td>`;
    tabla.appendChild(tr);
  });
}

function editarImagen(id) {
  const img = obtenerImagenes().find(i => i.id === id);
  if (!img) return;

  inputId.value = img.id;
  selectSalon.value = img.idSalon;
  selectRuta.value = img.ruta;
  preview.src = `img/${img.ruta}`;
  preview.style.display = 'block';
}

function eliminarImagen(id) {
  if (!confirm('¿Eliminar imagen del sistema?')) return;
  const nuevos = obtenerImagenes().filter(i => i.id !== id);
  guardarImagenes(nuevos);
  renderTabla();
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const idSalon = selectSalon.value;
  const ruta = selectRuta.value;

  if (!idSalon || !ruta) {
    alert('Debe seleccionar un salón y una imagen.');
    return;
  }

  const lista = obtenerImagenes();
  const id = inputId.value ? parseInt(inputId.value) : Date.now();

  const yaExiste = lista.find(i =>
    i.id !== id &&
    (i.ruta === ruta || (i.idSalon === idSalon && i.ruta === ruta))
  );

  if (yaExiste) {
    alert('Esta imagen ya fue asignada a un salón o ya existe en la lista.');
    return;
  }

  const nueva = { id, idSalon, ruta };

  if (inputId.value) {
    const idx = lista.findIndex(i => i.id === id);
    lista[idx] = nueva;
  } else {
    lista.push(nueva);
  }

  guardarImagenes(lista);
  form.reset();
  inputId.value = '';
  preview.style.display = 'none';
  renderTabla();
});

selectRuta.addEventListener('change', () => {
  const ruta = selectRuta.value;
  if (ruta) {
    preview.src = `img/${ruta}`;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
  }
});

window.editarImagen = editarImagen;
window.eliminarImagen = eliminarImagen;

document.addEventListener('DOMContentLoaded', () => {
  cargarSalonesEnSelect();
  cargarRutasEnSelect();
  renderTabla();
});
