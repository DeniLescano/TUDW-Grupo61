document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value.trim();
  const errorDiv = document.getElementById('login-error');

  errorDiv.style.display = 'none';

  try {
    const response = await fetch('https://dummyjson.com/auth/login',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usuario, password: clave })
    });

    if (!response.ok) throw new Error('Credenciales inválidas');

    const data = await response.json();

    sessionStorage.setItem('token', data.accessToken);
    sessionStorage.setItem('username', data.username);

    window.location.href = 'admin-salones.html';
  } catch (err) {
    console.error(err);
    errorDiv.textContent = 'Usuario o contraseña incorrectos';
    errorDiv.style.display = 'block';
  }
});