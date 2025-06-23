export function inicializarHeader() {
  const token = sessionStorage.getItem('token');
  const estaEnLogin = window.location.pathname.includes('login.html');

  const menuSesionLogin = document.getElementById('menu-sesion-login');
  const nombreUsuario = document.getElementById('nombre-usuario');
  const btnLogout = document.getElementById('cerrar-sesion');
  const navLoginLi = document.getElementById('nav-login-li');

  if (token && !estaEnLogin) {
    const username = sessionStorage.getItem('username') || 'Usuario';
    if (nombreUsuario) {
      nombreUsuario.textContent = `Bienvenido, ${username}`;
      nombreUsuario.classList.remove('d-none');
    }
    if (menuSesionLogin) menuSesionLogin.classList.remove('d-none');

    if (btnLogout) {
      btnLogout.addEventListener('click', function (e) {
        e.preventDefault();
        sessionStorage.clear();

        const paginaActual = window.location.pathname.split('/').pop();
        const paginasProtegidas = [
          'admin-salones.html',
          'usuarios.html',
          'mensajes.html',
          'admin-servicios.html',
          'admin-presupuestos.html'
        ];

        if (paginasProtegidas.includes(paginaActual)) {
          window.location.href = 'index.html';
        } else {
          location.reload();
        }
      });
    }

    if (navLoginLi) navLoginLi.classList.add('d-none');
  } else {
    if (menuSesionLogin) menuSesionLogin.classList.add('d-none');
    if (nombreUsuario) nombreUsuario.classList.add('d-none');
    if (navLoginLi) navLoginLi.classList.remove('d-none');
  }
}
