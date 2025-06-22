const contenedorTabla = document.getElementById('tabla-presupuestos');

function obtenerPresupuestos() {
  return JSON.parse(localStorage.getItem('presupuestos')) || [];
}

function eliminarPresupuesto(id) {
  if (!confirm('¿Estás seguro de eliminar este presupuesto?')) return;
  const lista = obtenerPresupuestos().filter(p => p.id !== id);
  localStorage.setItem('presupuestos', JSON.stringify(lista));
  renderPresupuestos();
}

function renderPresupuestos() {
  const lista = obtenerPresupuestos();
  contenedorTabla.innerHTML = '';

  if (lista.length === 0) {
    contenedorTabla.innerHTML = '<tr><td colspan="7" class="text-muted">No hay presupuestos generados.</td></tr>';
    return;
  }

  lista.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.fecha}</td>
      <td>${p.tematica || '-'}</td>
      <td>${p.servicios.join(', ')}</td>
      <td>$${p.total}</td>
      <td><button class="btn btn-sm btn-danger" onclick="eliminarPresupuesto(${p.id})">Eliminar</button></td>
    `;
    contenedorTabla.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', renderPresupuestos);
