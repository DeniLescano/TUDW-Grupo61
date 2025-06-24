export const LOCAL_STORAGE_SALONES_KEY = 'salonesDeEventos';

// ✅ Requerido por la consigna: constante con los salones iniciales
const initialSalonesData = [
  {
    id: "1",
    nombre: "Quinta La Serenidad",
    ubicacion: "Ruta Provincial 20 S/N, Viale, Entre Ríos",
    capacidad: 200,
    precioPorDia: 30000,
    servicios: ["Sonido", "Baños químicos"],
    contacto: "quinta.serenidad@email.com",
    descripcion: "Espacio al aire libre con jardines y piscina, ideal para grandes reuniones.",
    imagen: "espacioaventura.jpg",
    estado: "Disponible"
  },
  {
    id: "2",
    nombre: "Mini Party Disco",
    ubicacion: "Centro de Viale, Entre Ríos",
    capacidad: 80,
    precioPorDia: 15000,
    servicios: [],
    contacto: "mini.disco@email.com",
    descripcion: "Salón con pista iluminada, DJ en vivo y karaoke. Ideal para niños.",
    imagen: "minipartydisco.jpg",
    estado: "Disponible"
  },
  {
    id: "3",
    nombre: "Salón Luna",
    ubicacion: "Av. Principal 789, Viale, Entre Ríos",
    capacidad: 300,
    precioPorDia: 35000,
    servicios: [],
    contacto: "salon.luna@email.com",
    descripcion: "Ambiente elegante y versátil para eventos formales.",
    imagen: "salon2.jpg",
    estado: "Disponible"
  }
];

// ⚙️ Inicializa solo si no hay salones guardados
export function initializeLocalStorage() {
  if (!localStorage.getItem(LOCAL_STORAGE_SALONES_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_SALONES_KEY, JSON.stringify(initialSalonesData));
  }
}

// 🔄 Funciones CRUD
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
  salones = salones.map(salon =>
    salon.id === updatedSalon.id ? updatedSalon : salon
  );
  saveSalones(salones);
}

export function deleteSalon(id) {
  let salones = getSalones();
  salones = salones.filter(salon => salon.id !== id);
  saveSalones(salones);
}
