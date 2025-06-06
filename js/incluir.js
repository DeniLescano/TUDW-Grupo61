document.addEventListener("DOMContentLoaded", function () {
    incluirHTML("header", "header.html");
    incluirHTML("footer", "footer.html");
  });
  
  function incluirHTML(elementId, archivo) {
    fetch(archivo)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      });
  }
  function activarNav() {
    const path = window.location.pathname;
    if (path.includes("index")) document.getElementById("nav-inicio").classList.add("active");
    else if (path.includes("institucional")) document.getElementById("nav-institucional").classList.add("active");
    else if (path.includes("contacto")) document.getElementById("nav-contacto").classList.add("active");
    else if (path.includes("catalogo")) document.getElementById("nav-catalogo").classList.add("active");
  }

import { initializeLocalStorage } from './salonesData.js';

document.addEventListener('DOMContentLoaded', () => {
    // Incluir header y footer
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
            }
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        });

    // Inicializa LocalStorage al cargar la aplicación
    initializeLocalStorage();
});