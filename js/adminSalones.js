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
    salonesTableBody.innerHTML = ''; // Limpia la tabla antes de renderizar
    const salones = getSalones();

    if (salones.length === 0) {
        salonesTableBody.innerHTML = '<tr><td colspan="10">No hay salones registrados.</td></tr>'; // Aumentar colspan
        return;
    }

    salones.forEach(salon => {
        const row = salonesTableBody.insertRow();
        row.insertCell().textContent = salon.id;
        row.insertCell().textContent = salon.nombre;
        row.insertCell().textContent = salon.ubicacion;
        row.insertCell().textContent = salon.capacidad;
        row.insertCell().textContent = `$${salon.precioPorDia.toFixed(2)}`;
        row.insertCell().textContent = salon.servicios.join(', ');
        row.insertCell().textContent = salon.contacto;
        row.insertCell().textContent = salon.descripcion.substring(0, 50) + '...'; // Mostrar una parte
        row.insertCell().textContent = salon.imagen;
        row.insertCell().textContent = salon.estado;


        const actionsCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editSalon(salon.id));
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => confirmDeleteSalon(salon.id, salon.nombre));
        actionsCell.appendChild(deleteButton);
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