// js/adminSalones.js
import { getSalones, addSalon, updateSalon, deleteSalon, getSalonById } from './salonesData.js';

const salonForm = document.getElementById('salon-form');
const salonesTableBody = document.querySelector('#salones-table tbody');
const salonIdInput = document.getElementById('salon-id');
const btnSubmitForm = document.getElementById('btn-submit-form');
const btnCancelEdit = document.getElementById('btn-cancel-edit');

// Nuevos campos del formulario
const descripcionInput = document.getElementById('descripcion');
const imagenInput = document.getElementById('imagen');
const estadoSelect = document.getElementById('estado');


// Función para renderizar la tabla de salones
function renderSalonesTable() {
    const salonesTableBody = document.querySelector('#salones-table tbody');
    salonesTableBody.innerHTML = '';

    const salones = getSalones();

    if (salones.length === 0) {
        const row = salonesTableBody.insertRow();
        row.innerHTML = `
            <td colspan="9" class="text-center text-muted py-3">No hay salones registrados.</td>
        `;
        return;
    }

    salones.forEach(salon => {
        const row = salonesTableBody.insertRow();

        // Generar servicios como texto separado por comas
        const serviciosText = salon.servicios ? salon.servicios.join(', ') : 'Ninguno';

        row.innerHTML = `
            <td>${salon.id}</td>
            <td>${salon.nombre}</td>
            <td>${salon.ubicacion}</td>
            <td>${salon.capacidad}</td>
            <td>$${parseFloat(salon.precioPorDia).toFixed(2)}</td>
            <td>${serviciosText}</td>
            <td>${salon.contacto}</td>
            <td>
                <span class="badge ${salon.estado === 'Disponible' ? 'bg-success' : 'bg-danger'}">
                    ${salon.estado}
                </span>
            </td>
            <td>
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <button class="btn btn-warning btn-sm w-100 edit-btn">Editar</button>
                    <button class="btn btn-danger btn-sm w-100 delete-btn">Eliminar</button>
                </div>
            </td>
        `;

        // Evento Editar
        row.querySelector('.edit-btn').addEventListener('click', () => editSalon(salon.id));

        // Evento Eliminar
        row.querySelector('.delete-btn').addEventListener('click', () => confirmDeleteSalon(salon.id, salon.nombre));
    });
}

// Manejar el envío del formulario (Crear/Modificar)
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
        descripcion: formData.get('descripcion'), // Nuevo
        imagen: formData.get('imagen'),           // Nuevo
        estado: formData.get('estado')             // Nuevo
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

// Función para editar un salón
function editSalon(id) {
    const salon = getSalonById(id);
    if (salon) {
        salonIdInput.value = salon.id;
        document.getElementById('nombre').value = salon.nombre;
        document.getElementById('ubicacion').value = salon.ubicacion;
        document.getElementById('capacidad').value = salon.capacidad;
        document.getElementById('precioPorDia').value = salon.precioPorDia;
        document.getElementById('contacto').value = salon.contacto;
        descripcionInput.value = salon.descripcion; // Nuevo
        imagenInput.value = salon.imagen;           // Nuevo
        estadoSelect.value = salon.estado;           // Nuevo

        document.querySelectorAll('input[name="servicios"]').forEach(checkbox => {
            checkbox.checked = salon.servicios.includes(checkbox.value);
        });

        btnSubmitForm.textContent = 'Actualizar Salón';
        btnCancelEdit.style.display = 'inline-block';
        window.scrollTo(0, 0); // Scroll al principio para ver el formulario
    }
}

// Función para cancelar edición
btnCancelEdit.addEventListener('click', () => {
    salonForm.reset();
    salonIdInput.value = '';
    btnSubmitForm.textContent = 'Guardar Salón';
    btnCancelEdit.style.display = 'none';
});

// Función para confirmar y eliminar un salón
function confirmDeleteSalon(id, nombre) {
    if (confirm(`¿Estás seguro de que quieres eliminar el salón "${nombre}"?`)) {
        deleteSalon(id);
        alert(`Salón "${nombre}" eliminado.`);
        renderSalonesTable();
    }
}

document.addEventListener('DOMContentLoaded', renderSalonesTable);