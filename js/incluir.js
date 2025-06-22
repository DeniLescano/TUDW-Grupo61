// js/incluir.js
import { inicializarHeader } from './inicializarHeader.js';

document.addEventListener("DOMContentLoaded", function () {
  // Cargar header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
        setTimeout(() => inicializarHeader(), 100); // Espera breve para que cargue el DOM
      }
    })
    .catch(err => console.error("Error al cargar header.html:", err));

  // Cargar footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
      }
    });
});
