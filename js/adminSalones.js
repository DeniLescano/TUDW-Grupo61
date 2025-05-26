import { getSalones, addSalon, updateSalon, deleteSalon, getSalonById } from './salonesData.js';

const salonForm = document.getElementById('salon-form');
const salonesTableBody = document.querySelector('#salones-table tbody');
const salonIdInput = document.getElementById('salon-id');
const btnSubmitForm = document.getElementById('btn-submit-form');
const btnCancelEdit = document.getElementById('btn-cancel-edit');


const descripcionInput = document.getElementById('descripcion');
const imagenInput = document.getElementById('imagen');
const estadoSelect = document.getElementById('estado');


// render tabla de salones
function renderSalonesTable() {
    const salonesTableBody = document.querySelector('#salones-table tbody');
    const salones = getSalones();

    // valores filtros
    const filterNombre = document.getElementById('filter-nombre').value.toLowerCase().trim();
    const filterCapacidad = parseInt(document.getElementById('filter-capacidad').value);
    const filterPrecioMin = parseFloat(document.getElementById('filter-precio-min').value) || 0;
    const filterPrecioMax = parseFloat(document.getElementById('filter-precio-max').value) || Infinity;
    const filterEstado = document.getElementById('filter-estado').value.trim();

    // servicios seleccionados 
    const serviciosSeleccionados = Array.from(document.querySelectorAll('input[name="servicios-filter"]:checked')).map(cb => cb.value);
    salonesTableBody.innerHTML = '';

    if (salones.length === 0) {
        const row = salonesTableBody.insertRow();
        row.innerHTML = `
            <td colspan="9" class="text-center text-muted py-3">No hay salones registrados.</td>
        `;
        return;
    }

    const salonesFiltrados = salones.filter(salon => {
        const coincideNombre = !filterNombre || salon.nombre.toLowerCase().includes(filterNombre);
        const coincideCapacidad = isNaN(filterCapacidad) || 
            salon.capacidad >= (filterCapacidad - 50) && 
            salon.capacidad <= (filterCapacidad + 50);
        const coincidePrecio = salon.precioPorDia >= filterPrecioMin && salon.precioPorDia <= filterPrecioMax;
        const coincideEstado = !filterEstado || salon.estado === filterEstado;

        const serviciosCoinciden = serviciosSeleccionados.every(servicio =>
            salon.servicios.includes(servicio)
        );

        return (
            coincideNombre &&
            coincideCapacidad &&
            coincidePrecio &&
            coincideEstado &&
            (serviciosSeleccionados.length === 0 || serviciosCoinciden)
        );
    });

    if (salonesFiltrados.length === 0) {
        const row = salonesTableBody.insertRow();
        row.innerHTML = `
            <td colspan="9" class="text-center text-muted py-3">No hay salones que coincidan con los filtros.</td>
        `;
        return;
    }

    salonesFiltrados.forEach(salon => {
        const row = salonesTableBody.insertRow();

        row.innerHTML = `
            <td>${salon.id}</td>
            <td>${salon.nombre}</td>
            <td>${salon.ubicacion}</td>
            <td>${salon.capacidad}</td>
            <td>$${parseFloat(salon.precioPorDia).toFixed(2)}</td>
            <td>${salon.servicios.join(', ')}</td>
            <td><span class="badge ${salon.estado === 'Disponible' ? 'bg-success' : 'bg-danger'}">${salon.estado}</span></td>
            <td>${salon.contacto}</td>
            <td>
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <button class="btn btn-warning btn-sm w-100 edit-btn">Editar</button>
                    <button class="btn btn-danger btn-sm w-100 delete-btn">Eliminar</button>
                </div>
            </td>
        `;

        row.querySelector('.edit-btn').addEventListener('click', () => editSalon(salon.id));
        row.querySelector('.delete-btn').addEventListener('click', () => confirmDeleteSalon(salon.id, salon.nombre));
    });
    document.querySelectorAll('input[name="servicios-filter"]').forEach(cb => {
        if (!cb.classList.contains('form-check-input')) {
            cb.classList.add('form-check-input');
        }
    });
}

// envío del form(Crear/Modificar)
salonForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(salonForm);
    const servicios = [];
    formData.getAll('servicios').forEach(service => servicios.push(service));

    const newSalon = {
        id: salonIdInput.value || Date.now().toString(),
        nombre: formData.get('nombre'),
        ubicacion: formData.get('ubicacion'),
        capacidad: parseInt(formData.get('capacidad')),
        precioPorDia: parseFloat(formData.get('precioPorDia')),
        servicios: servicios,
        contacto: formData.get('contacto'),
        descripcion: formData.get('descripcion'), 
        imagen: formData.get('imagen'),           
        estado: formData.get('estado')             
    };

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
    renderSalonesTable();
});

// editar salón
function editSalon(id) {
    const salon = getSalonById(id);
    if (salon) {
        salonIdInput.value = salon.id;
        document.getElementById('nombre').value = salon.nombre;
        document.getElementById('ubicacion').value = salon.ubicacion;
        document.getElementById('capacidad').value = salon.capacidad;
        document.getElementById('precioPorDia').value = salon.precioPorDia;
        document.getElementById('contacto').value = salon.contacto;
        descripcionInput.value = salon.descripcion; 
        imagenInput.value = salon.imagen;           
        estadoSelect.value = salon.estado;           

        document.querySelectorAll('input[name="servicios"]').forEach(checkbox => {
            checkbox.checked = salon.servicios.includes(checkbox.value);
        });

        btnSubmitForm.textContent = 'Actualizar Salón';
        btnCancelEdit.style.display = 'inline-block';
        window.scrollTo(0, 0); // Scroll  principio form
    }
}

// cancelar edición
btnCancelEdit.addEventListener('click', () => {
    salonForm.reset();
    salonIdInput.value = '';
    btnSubmitForm.textContent = 'Guardar Salón';
    btnCancelEdit.style.display = 'none';
});

// confirmar y eliminar un salón
function confirmDeleteSalon(id, nombre) {
    if (confirm(`¿Estás seguro de que quieres eliminar el salón "${nombre}"?`)) {
        deleteSalon(id);
        alert(`Salón "${nombre}" eliminado.`);
        renderSalonesTable();
    }
}

document.addEventListener('DOMContentLoaded', renderSalonesTable);

// eventos de entrada
document.getElementById('filter-nombre').addEventListener('input', renderSalonesTable);
document.getElementById('filter-capacidad').addEventListener('input', renderSalonesTable);
document.getElementById('filter-precio-min').addEventListener('input', renderSalonesTable);
document.getElementById('filter-precio-max').addEventListener('input', renderSalonesTable);
document.getElementById('filter-estado').addEventListener('change', renderSalonesTable);
document.querySelectorAll('input[name="servicios-filter"]').forEach(input => {
    input.addEventListener('change', renderSalonesTable);
});

// limpiar filtros
document.getElementById('btn-clear-filters').addEventListener('click', () => {
    document.getElementById('filter-nombre').value = '';
    document.getElementById('filter-capacidad').value = '';
    document.getElementById('filter-precio-min').value = '';
    document.getElementById('filter-precio-max').value = '';
    document.getElementById('filter-estado').value = '';
    document.querySelectorAll('input[name="servicios-filter"]').forEach(cb => cb.checked = false);
    renderSalonesTable();
});