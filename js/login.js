const USER = "admin";
const PASS = "1234";

document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value.trim();
  if (usuario === USER && clave === PASS) {
    localStorage.setItem('logueado', '1');
    window.location.href = "admin-salones.html";
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
});