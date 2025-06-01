export const LOCAL_STORAGE_SALONES_KEY = 'salonesDeEventos';

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