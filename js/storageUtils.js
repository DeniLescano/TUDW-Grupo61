export function obtenerDesdeStorage(clave) {
  return JSON.parse(localStorage.getItem(clave)) || [];
}

export function guardarEnStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}
