const token = sessionStorage.getItem('token');
const estaEnLogin = window.location.pathname.includes('login.html');

if (!token && !estaEnLogin) {
  window.location.href = 'login.html';
}