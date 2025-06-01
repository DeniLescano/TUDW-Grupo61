const imagenes = [
  'img/salon1.jpg',
  'img/salon2.jpg',
  'img/salon3.jpg',
  'img/salon4.webp',  
  'img/salon7.jpeg',
  'img/salon8.jpeg',
  'img/salon9.jpg',
  'img/espacioaventura.jpg',
  'img/minipartydisco.jpg',
    'img/mundomagico.webp',

];

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('imagenes-disponibles');
  const inputImagen = document.getElementById('imagen');
  if (!contenedor || !inputImagen) return;

  imagenes.forEach((src) => {
    const label = document.createElement('label');
    label.className = 'border rounded p-1';
    label.style.cursor = 'pointer';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'imagen-radio';
    radio.value = src;
    radio.style.display = 'none';

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Imagen salón';
    img.width = 80;
    img.height = 60;
    img.className = 'img-thumbnail';

    radio.addEventListener('change', () => {
      inputImagen.value = src;
      contenedor.querySelectorAll('label').forEach(l => l.classList.remove('border-primary'));
      label.classList.add('border-primary');
    });

    label.appendChild(radio);
    label.appendChild(img);
    contenedor.appendChild(label);
  });
});