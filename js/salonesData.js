export const LOCAL_STORAGE_SALONES_KEY = 'salonesDeEventos';

const initialSalonesData = [
    {
        id: '1',
        nombre: 'Salón El Bosque Encantado',
        ubicacion: 'Calle Falsa 123, Viale, Entre Ríos',
        capacidad: 150,
        precioPorDia: 25000,
        servicios: ['catering', 'decoracion', 'sonido'],
        contacto: 'salon.bosque@email.com',
        descripcion: 'Un salón con temática de bosque encantado, perfecto para eventos mágicos y especiales. Incluye decoración y efectos de luz.',
        imagen: 'salon1.jpg', // Nombre de la imagen en la carpeta img/
        estado: 'Disponible' 
    },
    {
        id: '2',
        nombre: 'Espacio Celebración Ideal',
        ubicacion: 'Avenida Siempre Viva 456, Viale, Entre Ríos',
        capacidad: 100,
        precioPorDia: 18000,
        servicios: ['musica', 'iluminacion'],
        contacto: 'celebracion.ideal@email.com',
        descripcion: 'Ideal para celebraciones íntimas, con un ambiente cálido y personalizable. Perfecto para pequeños encuentros.',
        imagen: 'mundomagico.webp', 
        estado: 'Reservado'
    },
    {
        id: '3',
        nombre: 'Quinta La Serenidad',
        ubicacion: 'Ruta Provincial 20 S/N, Viale, Entre Ríos',
        capacidad: 200,
        precioPorDia: 30000,
        servicios: ['pileta', 'jardines', 'catering'],
        contacto: 'quinta.serenidad@email.com',
        descripcion: 'Un amplio espacio al aire libre con jardines exuberantes y piscina, ideal para eventos al aire libre o grandes reuniones.',
        imagen: 'espacioaventura.jpg', 
        estado: 'Disponible'
    },
    {
        id: '4',
        nombre: 'Mini Party Disco',
        ubicacion: 'Centro de Viale, Entre Ríos',
        capacidad: 80,
        precioPorDia: 15000,
        servicios: ['musica', 'iluminacion', 'karaoke'],
        contacto: 'mini.disco@email.com',
        descripcion: 'Un salón con pista iluminada estilo discoteca, bolas de espejos, DJ en vivo y karaoke. Ideal para niños amantes del ritmo y las coreografías.',
        imagen: 'minipartydisco.jpg',
        estado: 'Disponible'
    },
    {
        id: '5',
        nombre: 'Salón Luna',
        ubicacion: 'Av. Principal 789, Viale, Entre Ríos',
        capacidad: 300,
        precioPorDia: 35000,
        servicios: ['catering', 'decoracion', 'musica', 'iluminacion'],
        contacto: 'salon.luna@email.com',
        descripcion: 'Capacidad para 300 personas. Ideal para casamientos, cumpleaños de 15 o 18. Ambiente elegante y versátil.',
        imagen: 'salon2.jpg',
        estado: 'Disponible'
    },
    {
        id: '6',
        nombre: 'Salón Carpa Blanca',
        ubicacion: 'Ruta Nacional 18 KM 50, Viale, Entre Ríos',
        capacidad: 300,
        precioPorDia: 28000,
        servicios: ['catering', 'decoracion', 'proyector'],
        contacto: 'carpa.blanca@email.com',
        descripcion: 'Capacidad para 300 personas. Ideal para eventos corporativos, reuniones formales.',
        imagen: 'salon3.jpg',
        estado: 'Reservado'
    },
    {
        id: '7',
        nombre: 'Luz de Luna',
        ubicacion: 'Calle Larga 101, Viale, Entre Ríos',
        capacidad: 300,
        precioPorDia: 40000,
        servicios: ['catering', 'decoracion', 'sonido', 'iluminacion', 'barra'],
        contacto: 'luz.luna@email.com',
        descripcion: 'Clásico europeo, con candelabros, columnas y detalles dorados. Ideal para bodas, galas, cenas de empresa.',
        imagen: 'salon7.jpeg',
        estado: 'Reservado'
    },
    {
        id: '8',
        nombre: 'Terra',
        ubicacion: 'Camino Rural Viale, Entre Ríos',
        capacidad: 150,
        precioPorDia: 22000,
        servicios: ['catering', 'jardines', 'decoracion rustica'],
        contacto: 'salon.terra@email.com',
        descripcion: 'Rústico chic, con madera, piedra y mucha vegetación. Ideal para fiestas íntimas, cumpleaños, eventos al aire libre.',
        imagen: 'salon8.jpeg',
        estado: 'Reservado'
    },
    {
        id: '9',
        nombre: 'Nova',
        ubicacion: 'Polígono Industrial, Viale, Entre Ríos',
        capacidad: 400,
        precioPorDia: 45000,
        servicios: ['catering', 'iluminacion', 'sonido profesional', 'pantallas led'],
        contacto: 'salon.nova@email.com',
        descripcion: 'Industrial moderno, con techos altos, luces led y estética minimalista. Ideal para lanzamientos de productos, eventos corporativos, fiestas temáticas.',
        imagen: 'salon9.jpg',
        estado: 'Reservado'
    }
];

export function initializeLocalStorage() {
    if (!localStorage.getItem(LOCAL_STORAGE_SALONES_KEY)) { 
        localStorage.setItem(LOCAL_STORAGE_SALONES_KEY, JSON.stringify(initialSalonesData));
    }
}
export function getSalones() {
    const salones = localStorage.getItem(LOCAL_STORAGE_SALONES_KEY);
    return salones ? JSON.parse(salones) : [];
}

export function saveSalones(salones) {
    localStorage.setItem(LOCAL_STORAGE_SALONES_KEY, JSON.stringify(salones));
}

export function addSalon(salon) {
    const salones = getSalones();
    salones.push(salon);
    saveSalones(salones);
}

export function getSalonById(id) {
    const salones = getSalones();
    return salones.find(salon => salon.id === id);
}

export function updateSalon(updatedSalon) {
    let salones = getSalones();
    salones = salones.map(salon => salon.id === updatedSalon.id ? updatedSalon : salon);
    saveSalones(salones);
}

export function deleteSalon(id) {
    let salones = getSalones();
    salones = salones.filter(salon => salon.id !== id);
    saveSalones(salones);
}