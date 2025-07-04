const PAGINAS_PROTEGIDAS = [
  'admin-salones.html',
  'usuarios.html',
  'mensajes.html',
  'admin-servicios.html',
  'admin-presupuestos.html',
  'admin-imagenes.html',
  'admin-servicios.html'
];
const currentPage = window.location.pathname.split('/').pop();
const estaEnLogin = currentPage === 'login.html';
const token = sessionStorage.getItem('token');

if (PAGINAS_PROTEGIDAS.includes(currentPage)) {
  if (!token && !estaEnLogin) {
    window.location.href = 'index.html';
  }
} else if (estaEnLogin && token) {
  window.location.href = 'admin-salones.html';
}
