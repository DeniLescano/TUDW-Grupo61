export function renderPresupuestos() {
  const lista = JSON.parse(localStorage.getItem('presupuestos')) || [];
  const tabla = document.getElementById('tabla-presupuestos');
  tabla.innerHTML = '';

  if (lista.length === 0) {
    tabla.innerHTML = `
      <tr>
        <td colspan="8" class="text-muted text-center py-3">No hay presupuestos generados.</td>
      </tr>
    `;
    return;
  }

  lista.forEach(pres => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${pres.id}</td>
      <td>${pres.nombre}</td>
      <td>${pres.fecha}</td>
      <td>${pres.tematica || '-'}</td>
      <td>${pres.salonTexto}</td>
      <td>${pres.cantidadPersonas}</td>
      <td>${pres.servicios.join(', ')}</td>
      <td>$${pres.total}</td>
      <td><button class="btn btn-sm btn-danger ms-2" data-id="${pres.id}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });

  // Agregar listeners a los botones de eliminar
  tabla.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const confirmacion = confirm('¿Eliminar presupuesto #' + id + '?');
      if (confirmacion) {
        const nuevos = lista.filter(p => p.id !== id);
        localStorage.setItem('presupuestos', JSON.stringify(nuevos));
        renderPresupuestos();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', renderPresupuestos);
